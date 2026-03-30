package com.example.vara

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.widget.doAfterTextChanged
import androidx.lifecycle.lifecycleScope
import com.google.android.material.button.MaterialButton
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class CreateAccountActivity : AppCompatActivity() {

    private val api by lazy { RetrofitClient.instance.create(ApiService::class.java) }

    // Inputs
    private lateinit var firstnameInput: EditText
    private lateinit var lastnameInput: EditText
    private lateinit var emailInput: EditText
    private lateinit var passwordInput: EditText
    private lateinit var confirmPasswordInput: EditText

    // Errors
    private lateinit var emailError: TextView
    private lateinit var passwordError: TextView
    private lateinit var confirmPasswordError: TextView

    // Password rules
    private lateinit var rulesContainer: View
    private lateinit var rule1: TextView
    private lateinit var rule2: TextView
    private lateinit var rule3: TextView

    // Button
    private lateinit var button: MaterialButton
    private lateinit var goToLogin: TextView

    // State
    private var firstnameValid = false
    private var lastnameValid = false
    private var emailValid = false
    private var passwordValid = false
    private var confirmPasswordValid = false

    private var emailJob: Job? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_account)

        bindViews()
        setupListeners()
        updateButton()
    }

    private fun bindViews() {
        firstnameInput = findViewById(R.id.firstname_editText)
        lastnameInput = findViewById(R.id.lastname_editText)
        emailInput = findViewById(R.id.emailAddress_editText)
        passwordInput = findViewById(R.id.password_editText)
        confirmPasswordInput = findViewById(R.id.confirmPassword_editText)

        emailError = findViewById(R.id.emailAddressError_text)
        passwordError = findViewById(R.id.passwordError_text)
        confirmPasswordError = findViewById(R.id.confirmPasswordError_text)

        rulesContainer = findViewById(R.id.passwordRules_container)
        rule1 = findViewById(R.id.firstRule_text)
        rule2 = findViewById(R.id.secondRule_text)
        rule3 = findViewById(R.id.thirdRule_text)

        button = findViewById(R.id.createAccount_button)
        goToLogin = findViewById(R.id.goToLogin_button)
    }

    private fun submitRegistration() {
        button.isEnabled = false

        val firstname = firstnameInput.text.toString().trim()
        val lastname = lastnameInput.text.toString().trim()
        val email = emailInput.text.toString().trim()
        val password = passwordInput.text.toString()

        lifecycleScope.launch {
            try {
                val response = withContext(Dispatchers.IO) {
                    api.register(RegisterRequest(firstname, lastname, email, password))
                }

                if (response.isSuccessful && response.body()?.data != null) {
                    val registerData = response.body()!!.data!!
                    val token = registerData.token
                    val user = registerData.user

                    val prefs = getSharedPreferences("auth", MODE_PRIVATE)
                    prefs.edit()
                        .putString("token", token)
                        .putString("email", user.email)
                        .putString("firstname", user.firstname)
                        .putString("lastname", user.lastname)
                        .apply()

                     val intent = Intent(this@CreateAccountActivity, MainActivity::class.java)
                     startActivity(intent)
                     finish()

                } else {
                    val apiError = parseErrorBody<Any>(response)
                    val rawError = apiError?.error?.details?.toString() ?: "Registration failed."
                    val cleanMessage = cleanErrorMessage(rawError)

                    emailError.text = cleanMessage
                    emailError.visibility = View.VISIBLE
                    setError(emailInput)

                    emailValid = false
                }

            } catch (e: Exception) {
                emailError.text = "Something went wrong."
                emailError.visibility = View.VISIBLE
                setError(emailInput)

                emailValid = false
            } finally {
                updateButton()
            }
        }
    }

    private inline fun <reified T> parseErrorBody(response: retrofit2.Response<*>): ApiResponse<T>? {
        return try {
            val errorJson = response.errorBody()?.string()
            if (errorJson.isNullOrEmpty()) return null

            val type = object : com.google.gson.reflect.TypeToken<ApiResponse<T>>() {}.type
            com.google.gson.Gson().fromJson(errorJson, type)
        } catch (e: Exception) {
            null
        }
    }

    private fun cleanErrorMessage(raw: String): String {
        val regex = Regex("\"(.*)\"")
        val match = regex.find(raw)
        return match?.groupValues?.get(1) ?: raw
    }

    private fun setupListeners() {

        button.setOnClickListener {
            submitRegistration()
        }

        // FIRST NAME
        firstnameInput.doAfterTextChanged {
            firstnameValid = it.toString().trim().isNotEmpty()
            updateButton()
        }

        // LAST NAME
        lastnameInput.doAfterTextChanged {
            lastnameValid = it.toString().trim().isNotEmpty()
            updateButton()
        }

        // EMAIL
        emailInput.doAfterTextChanged {
            validateEmail()
        }

        // PASSWORD
        passwordInput.setOnFocusChangeListener { _, hasFocus ->
            if (hasFocus) {
                rulesContainer.visibility = View.VISIBLE
                passwordError.visibility = View.GONE
            } else {
                rulesContainer.visibility = View.GONE

                if (!passwordValid && passwordInput.text.isNotEmpty()) {
                    passwordError.text = "Input is invalid."
                    passwordError.visibility = View.VISIBLE
                    setError(passwordInput)
                }
            }

            validateConfirmPassword()
        }

        passwordInput.doAfterTextChanged {
            validatePassword()
            validateConfirmPassword()
        }

        // CONFIRM PASSWORD
        confirmPasswordInput.doAfterTextChanged {
            validateConfirmPassword()
        }

        goToLogin.setOnClickListener {
            finish()
        }
    }

    // ================= EMAIL =================

    private fun validateEmail() {
        val email = emailInput.text.toString().trim()

        emailJob?.cancel()

        if (email.isEmpty()) {
            emailValid = false
            emailError.visibility = View.GONE
            setNormal(emailInput)
            updateButton()
            return
        }

        val regex = Regex("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$")

        if (!regex.matches(email)) {
            emailValid = false
            emailError.text = "Invalid email address."
            emailError.visibility = View.VISIBLE
            setError(emailInput)
            updateButton()
            return
        }

        emailError.visibility = View.GONE
        setNormal(emailInput)

        validateEmailUniqueness(email)
    }

    private fun validateEmailUniqueness(email: String) {
        emailJob?.cancel()

        emailJob = lifecycleScope.launch {
            delay(300)

            try {
                val response = withContext(Dispatchers.IO) {
                    api.validateEmailUniqueness(EmailUniquenessRequest(email))
                }

                if (response.isSuccessful) {
                    emailValid = true
                    emailError.visibility = View.GONE
                    setNormal(emailInput)
                } else {
                    val apiError = parseErrorBody<Any>(response)
                    val rawError = apiError?.error?.details?.toString() ?: "Email already exists."
                    val cleanMessage = cleanErrorMessage(rawError)

                    emailValid = false
                    emailError.text = cleanMessage
                    emailError.visibility = View.VISIBLE
                    setError(emailInput)
                }

            } catch (e: Exception) {
                e.printStackTrace()
                emailValid = false
                emailError.text = "Something went wrong."
                emailError.visibility = View.VISIBLE
                setError(emailInput)
            }

            updateButton()

        }
    }

    // ================= PASSWORD =================

    private fun validatePassword() {
        val password = passwordInput.text.toString()

        val length = password.length >= 8
        val upperLower = Regex("(?=.*[a-z])(?=.*[A-Z])").containsMatchIn(password)
        val number = Regex("\\d").containsMatchIn(password)

        updateRule(rule1, if (password.isEmpty()) null else length)
        updateRule(rule2, if (password.isEmpty()) null else upperLower)
        updateRule(rule3, if (password.isEmpty()) null else number)

        passwordValid = length && upperLower && number

        if (password.isEmpty()) {
            passwordError.visibility = View.GONE
            setNormal(passwordInput)
        } else if (passwordValid) {
            passwordError.visibility = View.GONE
            setNormal(passwordInput)
        }

        updateButton()
    }

    // ================= CONFIRM PASSWORD =================

    private fun validateConfirmPassword() {
        val confirm = confirmPasswordInput.text.toString()
        val password = passwordInput.text.toString()

        when {
            confirm.isEmpty() -> {
                confirmPasswordValid = false
                confirmPasswordError.visibility = View.GONE
                setNormal(confirmPasswordInput)
            }

            password.isEmpty() -> {
                confirmPasswordValid = false
                confirmPasswordError.text = "Please set a password first."
                confirmPasswordError.visibility = View.VISIBLE
                setError(confirmPasswordInput)
            }

            confirm != password -> {
                confirmPasswordValid = false
                confirmPasswordError.text = "Passwords do not match."
                confirmPasswordError.visibility = View.VISIBLE
                setError(confirmPasswordInput)
            }

            else -> {
                confirmPasswordValid = true
                confirmPasswordError.visibility = View.GONE
                setNormal(confirmPasswordInput)
            }
        }

        updateButton()
    }

    // ================= UI HELPERS =================

    private fun updateButton() {
        button.isEnabled =
            firstnameValid &&
                    lastnameValid &&
                    emailValid &&
                    passwordValid &&
                    confirmPasswordValid
    }

    private fun updateRule(view: TextView, state: Boolean?) {
        when (state) {
            null -> view.setTextColor(ContextCompat.getColor(this, android.R.color.darker_gray))
            true -> view.setTextColor(ContextCompat.getColor(this, android.R.color.black))
            false -> view.setTextColor(ContextCompat.getColor(this, R.color.error_red))
        }
    }

    private fun setError(editText: EditText) {
        editText.background = ContextCompat.getDrawable(this, R.drawable.error_input_field_bg)
    }

    private fun setNormal(editText: EditText) {
        editText.background = ContextCompat.getDrawable(this, R.drawable.input_field_bg)
    }
}