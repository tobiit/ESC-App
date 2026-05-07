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
    onVerifyDeleteAccount: (String, String, (Boolean) -> Unit) -> Unit,
    onDeleteAccount: (String, String, (Boolean) -> Unit) -> Unit,
    onNavigateToRegister: () -> Unit,
    isLoading: Boolean,
    error: String?
) {
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var localError by remember { mutableStateOf<String?>(null) }
    var infoMessage by remember { mutableStateOf<String?>(null) }
    var showDeleteConfirm by remember { mutableStateOf(false) }

    val displayError = localError ?: error

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

                /* ── Delete account button (analog zu btn-secondary action) ── */
                OutlinedButton(
                    onClick = {
                        localError = null
                        infoMessage = null
                        if (username.isBlank() || password.isBlank()) {
                            localError = "Bitte Benutzername und Passwort eingeben."
                        } else {
                            onVerifyDeleteAccount(username, password) { verified ->
                                if (verified) {
                                    showDeleteConfirm = true
                                }
                            }
                        }
                    },
                    enabled = !isLoading,
                    modifier = Modifier.fillMaxWidth().height(48.dp),
                    colors = ButtonDefaults.outlinedButtonColors(
                        contentColor = MaterialTheme.colorScheme.secondary
                    ),
                    border = BorderStroke(1.dp, MaterialTheme.colorScheme.secondary),
                    shape = MaterialTheme.shapes.medium
                ) {
                    Text("Account löschen", style = MaterialTheme.typography.labelLarge)
                }

                /* ── Error message ── */
                if (displayError != null) {
                    Text(
                        text = displayError,
                        color = MaterialTheme.colorScheme.error,  // Red700
                        style = MaterialTheme.typography.bodySmall
                    )
                }

                if (infoMessage != null) {
                    Text(
                        text = infoMessage!!,
                        color = MaterialTheme.colorScheme.secondary,
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

                if (showDeleteConfirm) {
                    AlertDialog(
                        onDismissRequest = { if (!isLoading) showDeleteConfirm = false },
                        title = {
                            Text("Konto endgültig löschen?")
                        },
                        text = {
                            Text("Benutzer und Login endgültig löschen? (Dies kann nicht rückgängig gemacht werden)")
                        },
                        confirmButton = {
                            TextButton(
                                onClick = {
                                    localError = null
                                    infoMessage = null
                                    onDeleteAccount(username, password) { deleted ->
                                        if (deleted) {
                                            showDeleteConfirm = false
                                            username = ""
                                            password = ""
                                            infoMessage = "Konto wurde gelöscht und anonymisiert."
                                        }
                                    }
                                },
                                enabled = !isLoading
                            ) {
                                Text("Ja", color = MaterialTheme.colorScheme.error)
                            }
                        },
                        dismissButton = {
                            TextButton(
                                onClick = { showDeleteConfirm = false },
                                enabled = !isLoading
                            ) {
                                Text("Nein")
                            }
                        }
                    )
                }
            }
        }
    }
}
