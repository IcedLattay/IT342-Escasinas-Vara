package com.example.vara.auth

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.widget.doAfterTextChanged
import androidx.lifecycle.lifecycleScope
import com.example.vara.MainActivity
import com.example.vara.R
import com.example.vara.network.ApiService
import com.example.vara.network.RetrofitClient
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.google.android.material.button.MaterialButton
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class LoginActivity : AppCompatActivity() {

    private val api by lazy { RetrofitClient.instance.create(ApiService::class.java) }

    private lateinit var googleSignInClient: GoogleSignInClient

    // Views
    private lateinit var emailInput: EditText
    private lateinit var passwordInput: EditText
    private lateinit var errorText: TextView
    private lateinit var loginButton: MaterialButton
    private lateinit var continueWithGoogle: MaterialButton
    private lateinit var goToRegister: TextView

    // State
    private data class FormState(
        val email: Boolean    = false,
        val password: Boolean = false,
    ) {
        val allValid get() = email && password
    }

    private var form = FormState()
        set(value) { field = value; loginButton.isEnabled = value.allValid }

    private val googleSignInLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            val data = result.data

            try {
                val task = GoogleSignIn.getSignedInAccountFromIntent(data)
                val account = task.getResult(ApiException::class.java)
                handleGoogleAccount(account)
            } catch (e: ApiException) {
                e.printStackTrace()
                Log.e("GOOGLE_SIGN_IN", "statusCode=${e.statusCode}", e)

                Toast.makeText(
                    this@LoginActivity,
                    "Google sign-in failed. Code: ${e.statusCode}",
                    Toast.LENGTH_LONG
                ).show()
            }
        }

    // ── Lifecycle ────────────────────────────────────────────────────────────

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)


        bindViews()
        setupListeners()

        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestEmail()
            .requestIdToken("919849335849-jjutlkrpdiuivefeqpuvgnarlggod4pj.apps.googleusercontent.com")
            .build()

        googleSignInClient = GoogleSignIn.getClient(this, gso)
    }

    // ── View binding ─────────────────────────────────────────────────────────

    private fun bindViews() {
        emailInput          = findViewById(R.id.emailAddress_editText)
        passwordInput       = findViewById(R.id.password_editText)
        errorText           = findViewById(R.id.nonFieldError_text)
        loginButton         = findViewById(R.id.login_button)
        continueWithGoogle  = findViewById(R.id.continueWithGoogle_button)
        goToRegister        = findViewById(R.id.goToRegister_button)
    }

    // ── Listeners ────────────────────────────────────────────────────────────

    private fun setupListeners() {
        emailInput.doAfterTextChanged {
            form = form.copy(email = it.toString().trim().isNotEmpty())
            clearErrorUI()
        }

        passwordInput.doAfterTextChanged {
            form = form.copy(password = it.toString().isNotEmpty())
            clearErrorUI()
        }

        loginButton.setOnClickListener { submitLogin() }

        continueWithGoogle.setOnClickListener {
            clearErrorUI()
            launchGoogleSignIn()
        }

        goToRegister.setOnClickListener {
            startActivity(Intent(this, CreateAccountActivity::class.java))
        }
    }

    // ── Login ────────────────────────────────────────────────────────────────

    private fun submitLogin() {
        loginButton.isEnabled = false

        val email    = emailInput.text.toString().trim()
        val password = passwordInput.text.toString()

        lifecycleScope.launch {
            try {
                val response = withContext(Dispatchers.IO) {
                    api.login(LoginRequest(email, password))
                }

                if (response.isSuccessful && response.body()?.data != null) {
                    val data = response.body()!!.data!!
                    saveSession(data.token, data.user)

                    startActivity(Intent(this@LoginActivity, MainActivity::class.java))
                    finish()

                } else {
                    showError("Email and password are incorrect.")
                }

            } catch (e: Exception) {
                e.printStackTrace()
                showError("Something went wrong.")

            } finally {
                loginButton.isEnabled = form.allValid
            }
        }
    }

    private fun launchGoogleSignIn() {
        val signInIntent = googleSignInClient.signInIntent
        googleSignInLauncher.launch(signInIntent)
    }

    private fun handleGoogleAccount(account: GoogleSignInAccount) {
        val idToken = account.idToken

        if (idToken.isNullOrBlank()) {

            Toast.makeText(
                this@LoginActivity,
                "Something went wrong.",
                Toast.LENGTH_LONG
            ).show()

            return
        }

        lifecycleScope.launch {
            try {
                val response = withContext(Dispatchers.IO) {
                    api.googleMobileLogin(GoogleLoginRequest(idToken))
                }

                if (response.isSuccessful && response.body()?.data != null) {
                    val data = response.body()!!.data!!
                    saveSession(data.token, data.user)

                    startActivity(Intent(this@LoginActivity, MainActivity::class.java))
                    finish()
                } else {
                    val errorMessage =
                        response.body()?.error?.message ?: "Google sign-in failed."

                    Toast.makeText(
                        this@LoginActivity,
                        errorMessage,
                        Toast.LENGTH_LONG
                    ).show()
                }

            } catch (e: Exception) {
                e.printStackTrace()
                showError("Something went wrong.")
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

    // ── UI Helpers ───────────────────────────────────────────────────────────

    private fun showError(message: String) {
        errorText.text       = message
        errorText.visibility = View.VISIBLE
        setError(emailInput)
        setError(passwordInput)
    }

    private fun clearErrorUI() {
        errorText.visibility = View.GONE
        setNormal(emailInput)
        setNormal(passwordInput)
    }

    private fun setError(editText: EditText) {
        editText.background = ContextCompat.getDrawable(this, R.drawable.error_input_field_bg)
    }

    private fun setNormal(editText: EditText) {
        editText.background = ContextCompat.getDrawable(this, R.drawable.input_field_bg)
    }
}