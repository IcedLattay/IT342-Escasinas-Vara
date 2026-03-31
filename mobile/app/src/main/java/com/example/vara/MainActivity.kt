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
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class MainActivity : AppCompatActivity() {

    private val api by lazy { RetrofitClient.instance.create(ApiService::class.java) }

    // Views
    private lateinit var logoutButton: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

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
                val response = withContext(Dispatchers.IO) { api.logout() }

                if (response.isSuccessful) {
                    getSharedPreferences("auth", MODE_PRIVATE).edit().clear().apply()
                    startActivity(Intent(this@MainActivity, LoginActivity::class.java))
                    finish()
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
}