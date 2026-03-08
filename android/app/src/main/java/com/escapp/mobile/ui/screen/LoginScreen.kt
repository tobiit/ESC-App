package com.escapp.mobile.ui.screen

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import com.escapp.mobile.ui.theme.*

/**
 * Participant login screen.
 * Uses design tokens via Material3 theme: primary = Blue900, error = Red700, surface = White.
 */
@Composable
fun LoginScreen(
    onLogin: (String, String) -> Unit,
    onNavigateToRegister: () -> Unit,
    isLoading: Boolean,
    error: String?
) {
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(24.dp),
        contentAlignment = Alignment.Center
    ) {
        Card(
            modifier = Modifier.widthIn(max = 400.dp).fillMaxWidth(),
            colors = CardDefaults.cardColors(
                containerColor = MaterialTheme.colorScheme.surface  // semantic-color-surface-default-resting
            ),
            elevation = CardDefaults.cardElevation(defaultElevation = 4.dp),
            shape = MaterialTheme.shapes.large  // core-border-radius-150 (12dp)
        ) {
            Column(
                modifier = Modifier.padding(24.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                /* ── Header ── */
                Text(
                    text = "ESC Finale Tippspiel",
                    style = MaterialTheme.typography.headlineSmall,
                    color = MaterialTheme.colorScheme.primary  // semantic-color-action-primary-resting → Blue900
                )
                Text(
                    text = "Teilnehmer-Anmeldung",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant  // semantic-color-on-surface-secondary → Blue700
                )

                Spacer(Modifier.height(8.dp))

                /* ── Username ── */
                OutlinedTextField(
                    value = username,
                    onValueChange = { username = it },
                    label = { Text("Benutzername") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth(),
                    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor   = MaterialTheme.colorScheme.primary,      // Blue900
                        unfocusedBorderColor = MaterialTheme.colorScheme.outline,       // Blue600
                        focusedLabelColor    = MaterialTheme.colorScheme.primary,
                        cursorColor          = MaterialTheme.colorScheme.primary
                    )
                )

                /* ── Password ── */
                OutlinedTextField(
                    value = password,
                    onValueChange = { password = it },
                    label = { Text("Passwort") },
                    singleLine = true,
                    visualTransformation = PasswordVisualTransformation(),
                    modifier = Modifier.fillMaxWidth(),
                    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
                    keyboardActions = KeyboardActions(
                        onDone = { if (username.isNotBlank() && password.isNotBlank()) onLogin(username, password) }
                    ),
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor   = MaterialTheme.colorScheme.primary,
                        unfocusedBorderColor = MaterialTheme.colorScheme.outline,
                        focusedLabelColor    = MaterialTheme.colorScheme.primary,
                        cursorColor          = MaterialTheme.colorScheme.primary
                    )
                )

                /* ── Login Button ── */
                Button(
                    onClick = { onLogin(username, password) },
                    enabled = username.isNotBlank() && password.isNotBlank() && !isLoading,
                    modifier = Modifier.fillMaxWidth().height(48.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor         = MaterialTheme.colorScheme.primary,        // Blue900
                        contentColor           = MaterialTheme.colorScheme.onPrimary,      // White
                        disabledContainerColor = Gray500,                                    // semantic disabled palette
                        disabledContentColor   = MaterialTheme.colorScheme.onPrimary
                    ),
                    shape = MaterialTheme.shapes.medium  // core-border-radius-100 (8dp)
                ) {
                    if (isLoading) {
                        CircularProgressIndicator(
                            modifier = Modifier.size(20.dp),
                            strokeWidth = 2.dp,
                            color = MaterialTheme.colorScheme.onPrimary
                        )
                    } else {
                        Text("Anmelden", style = MaterialTheme.typography.labelLarge)
                    }
                }

                /* ── Error message ── */
                if (error != null) {
                    Text(
                        text = error,
                        color = MaterialTheme.colorScheme.error,  // Red700
                        style = MaterialTheme.typography.bodySmall
                    )
                }

                /* ── Divider ── */
                Spacer(Modifier.height(8.dp))
                HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                Spacer(Modifier.height(8.dp))

                /* ── Register Section ── */
                Text(
                    text = "Noch kein Konto?",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Spacer(Modifier.height(8.dp))
                OutlinedButton(
                    onClick = onNavigateToRegister,
                    modifier = Modifier.fillMaxWidth().height(48.dp),
                    colors = ButtonDefaults.outlinedButtonColors(
                        contentColor = MaterialTheme.colorScheme.primary
                    ),
                    border = BorderStroke(1.dp, MaterialTheme.colorScheme.primary),
                    shape = MaterialTheme.shapes.medium
                ) {
                    Text(
                        "Als neuer Teilnehmer registrieren",
                        style = MaterialTheme.typography.labelLarge
                    )
                }
            }
        }
    }
}
