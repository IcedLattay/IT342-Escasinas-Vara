package com.example.vara

import android.content.Intent
import android.os.Bundle
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.lifecycleScope
import com.example.vara.auth.LoginActivity
import com.example.vara.network.ApiService
import com.example.vara.network.RetrofitClient
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class MainActivity : AppCompatActivity() {

    private val api by lazy { RetrofitClient.instance.create(ApiService::class.java) }

    private lateinit var googleSignInClient: GoogleSignInClient

    // Views
    private lateinit var logoutButton: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val gso = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestEmail()
            .requestIdToken("YOUR_WEB_CLIENT_ID")
            .build()

        googleSignInClient = GoogleSignIn.getClient(this, gso)

        bindViews()
        setupListeners()
    }

    // ── View binding ─────────────────────────────────────────────────────────

    private fun bindViews() {
        logoutButton    = findViewById(R.id.logout_button)
    }

    // ── Listeners ────────────────────────────────────────────────────────────

    private fun setupListeners() {
        logoutButton.setOnClickListener { logout() }
    }

    // ── Logout ────────────────────────────────────────────────────────────────

    private fun logout() {
        lifecycleScope.launch {
            try {
                withContext(Dispatchers.IO) { api.logout() }
            } catch (e: Exception) {
                e.printStackTrace()
            } finally {
                getSharedPreferences("auth", MODE_PRIVATE).edit().clear().apply()

                googleSignInClient.signOut().addOnCompleteListener {
                    startActivity(Intent(this@MainActivity, LoginActivity::class.java))
                    finish()
                }
            }
        }
    }
}