package com.example.vara.auth

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.ScrollView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.widget.doAfterTextChanged
import androidx.lifecycle.lifecycleScope
import com.example.vara.MainActivity
import com.example.vara.R
import com.example.vara.network.ApiResponse
import com.example.vara.network.ApiService
import com.example.vara.network.RetrofitClient
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
    private lateinit var submitButton: MaterialButton
    private lateinit var goToLogin: TextView

    // State
    private data class FormState(
        val firstname: Boolean       = false,
        val lastname: Boolean        = false,
        val email: Boolean           = false,
        val password: Boolean        = false,
        val confirmPassword: Boolean = false,
    ) {
        val allValid get() = firstname && lastname && email && password && confirmPassword
    }

    private var form = FormState()
        set(value) {
            field = value;
            submitButton.isEnabled = value.allValid
        }

    private var emailJob: Job? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_account)

        bindViews()
        setupListeners()
    }

    private fun bindViews() {
        firstnameInput       = findViewById(R.id.firstname_editText)
        lastnameInput        = findViewById(R.id.lastname_editText)
        emailInput           = findViewById(R.id.emailAddress_editText)
        passwordInput        = findViewById(R.id.password_editText)
        confirmPasswordInput = findViewById(R.id.confirmPassword_editText)

        emailError           = findViewById(R.id.emailAddressError_text)
        passwordError        = findViewById(R.id.passwordError_text)
        confirmPasswordError = findViewById(R.id.confirmPasswordError_text)

        rulesContainer       = findViewById(R.id.passwordRules_container)
        rule1                = findViewById(R.id.firstRule_text)
        rule2                = findViewById(R.id.secondRule_text)
        rule3                = findViewById(R.id.thirdRule_text)

        submitButton         = findViewById(R.id.createAccount_button)
        goToLogin            = findViewById(R.id.goToLogin_button)
    }

    private fun submitRegistration() {
        submitButton.isEnabled = false

        val firstname = firstnameInput.text.toString().trim()
        val lastname  = lastnameInput.text.toString().trim()
        val email     = emailInput.text.toString().trim()
        val password  = passwordInput.text.toString()

        lifecycleScope.launch {
            try {
                val response = withContext(Dispatchers.IO) {
                    api.register(RegisterRequest(firstname, lastname, email, password))
                }

                if (response.isSuccessful && response.body()?.data != null) {
                    val registerData = response.body()!!.data!!
                    saveSession(registerData.token, registerData.user)

                    startActivity(Intent(this@CreateAccountActivity, MainActivity::class.java))
                    finish()

                } else {
                    val apiError = parseErrorBody<Any>(response)
                    val rawError = apiError?.error?.details?.toString() ?: "Registration failed."
                    showError(emailInput, emailError, cleanErrorMessage(rawError))
                    form = form.copy(email = false)
                }

            } catch (e: Exception) {
                showError(emailInput, emailError, "Something went wrong.")
                form = form.copy(email = false)

            } finally {
                submitButton.isEnabled = form.allValid
            }
        }
    }

    private fun saveSession(token: String, user: RegisteredUser) {
        getSharedPreferences("auth", MODE_PRIVATE).edit()
            .putString("token", token)
            .putString("email", user.email)
            .putString("firstname", user.firstname)
            .putString("lastname", user.lastname)
            .apply()
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
        val match = Regex("\"(.*)\"").find(raw)
        return match?.groupValues?.get(1) ?: raw
    }

    private fun setupListeners() {
        submitButton.setOnClickListener { submitRegistration() }

        firstnameInput.doAfterTextChanged {
            form = form.copy(firstname = it.toString().trim().isNotEmpty())
        }

        lastnameInput.doAfterTextChanged {
            form = form.copy(lastname = it.toString().trim().isNotEmpty())
        }

        emailInput.doAfterTextChanged { validateEmail() }

        passwordInput.setOnFocusChangeListener { _, hasFocus ->
            if (hasFocus) {
                rulesContainer.visibility = View.VISIBLE
                passwordError.visibility  = View.GONE
            } else {
                rulesContainer.visibility = View.GONE
                if (!form.password && passwordInput.text.isNotEmpty()) {
                    showError(passwordInput, passwordError, "Input is invalid.")
                }
            }
            validateConfirmPassword()
        }

        passwordInput.doAfterTextChanged {
            validatePassword()
            validateConfirmPassword()
        }

        confirmPasswordInput.doAfterTextChanged { validateConfirmPassword() }

        goToLogin.setOnClickListener { finish() }
    }

    // ── Email ────────────────────────────────────────────────────────────────

    private fun validateEmail() {
        val email = emailInput.text.toString().trim()
        emailJob?.cancel()

        if (email.isEmpty()) {
            form = form.copy(email = false)
            clearError(emailInput, emailError)
            return
        }

        if (!Regex("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$").matches(email)) {
            form = form.copy(email = false)
            showError(emailInput, emailError, "Invalid email address.")
            return
        }

        clearError(emailInput, emailError)
        validateEmailUniqueness(email)
    }

    private fun validateEmailUniqueness(email: String) {
        emailJob = lifecycleScope.launch {
            delay(300)
            try {
                val response = withContext(Dispatchers.IO) {
                    api.validateEmailUniqueness(EmailUniquenessRequest(email))
                }

                if (response.isSuccessful) {
                    form = form.copy(email = true)
                    clearError(emailInput, emailError)
                } else {
                    val apiError = parseErrorBody<Any>(response)
                    val rawError = apiError?.error?.details?.toString() ?: "Email already exists."
                    form = form.copy(email = false)
                    showError(emailInput, emailError, cleanErrorMessage(rawError))
                }

            } catch (e: Exception) {
                form = form.copy(email = false)
                showError(emailInput, emailError, "Something went wrong.")
            }
        }
    }

    // ── Password ─────────────────────────────────────────────────────────────

    private fun validatePassword() {
        val password   = passwordInput.text.toString()
        val length     = password.length >= 8
        val upperLower = Regex("(?=.*[a-z])(?=.*[A-Z])").containsMatchIn(password)
        val number     = Regex("\\d").containsMatchIn(password)

        updateRule(rule1, if (password.isEmpty()) null else length)
        updateRule(rule2, if (password.isEmpty()) null else upperLower)
        updateRule(rule3, if (password.isEmpty()) null else number)

        form = form.copy(password = length && upperLower && number)

        if (password.isEmpty() || form.password) clearError(passwordInput, passwordError)
    }

    // ── Confirm Password ─────────────────────────────────────────────────────

    private fun validateConfirmPassword() {
        val confirm  = confirmPasswordInput.text.toString()
        val password = passwordInput.text.toString()

        when {
            confirm.isEmpty() -> {
                form = form.copy(confirmPassword = false)
                clearError(confirmPasswordInput, confirmPasswordError)
            }
            password.isEmpty() -> {
                form = form.copy(confirmPassword = false)
                showError(confirmPasswordInput, confirmPasswordError, "Please set a password first.")
            }
            confirm != password -> {
                form = form.copy(confirmPassword = false)
                showError(confirmPasswordInput, confirmPasswordError, "Passwords do not match.")
            }
            else -> {
                form = form.copy(confirmPassword = true)
                clearError(confirmPasswordInput, confirmPasswordError)
            }
        }
    }

    // ── UI Helpers ───────────────────────────────────────────────────────────

    private fun showError(input: EditText, label: TextView, message: String) {
        label.text       = message
        label.visibility = View.VISIBLE
        input.background = ContextCompat.getDrawable(this, R.drawable.error_input_field_bg)
    }

    private fun clearError(input: EditText, label: TextView) {
        label.visibility = View.GONE
        input.background = ContextCompat.getDrawable(this, R.drawable.input_field_bg)
    }

    private fun updateRule(view: TextView, state: Boolean?) {
        val color = when (state) {
            null  -> android.R.color.darker_gray
            true  -> android.R.color.black
            false -> R.color.error_red
        }
        view.setTextColor(ContextCompat.getColor(this, color))
    }
}