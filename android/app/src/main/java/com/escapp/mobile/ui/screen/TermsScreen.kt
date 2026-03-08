package com.escapp.mobile.ui.screen

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

/**
 * Screen to display the terms of service in Markdown format.
 * In production, this would fetch bedingungen.md from the API server.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TermsScreen(
    onNavigateBack: () -> Unit
) {
    var termsContent by remember { mutableStateOf(TERMS_CONTENT) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Nutzungsbedingungen") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(
                            imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = "Zurück"
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primary,
                    titleContentColor = MaterialTheme.colorScheme.onPrimary,
                    navigationIconContentColor = MaterialTheme.colorScheme.onPrimary
                )
            )
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp)
        ) {
            Card(
                modifier = Modifier.fillMaxSize(),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                ),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp)
                        .verticalScroll(rememberScrollState())
                ) {
                    Text(
                        text = termsContent,
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurface
                    )
                }
            }
        }
    }
}

// Embedded terms content (in production, fetch from API)
private const val TERMS_CONTENT = """# Nutzungsbedingungen ESC Tippspiel

**Stand: März 2026**

## 1. Allgemeines

Diese Nutzungsbedingungen gelten für die Teilnahme am Eurovision Song Contest (ESC) Tippspiel. Mit der Registrierung erklären Sie sich mit diesen Bedingungen einverstanden.

## 2. Registrierung und Nutzerkonto

- Die Teilnahme am Tippspiel erfordert eine Registrierung mit Anzeigename, vollständigem Namen und selbstgewähltem Passwort.
- Jeder Teilnehmer darf sich nur einmal registrieren.
- Nach der Registrierung muss Ihr Konto durch einen Administrator freigeschaltet werden, bevor Sie sich anmelden können.
- Sie sind verpflichtet, Ihre Zugangsdaten geheim zu halten und nicht an Dritte weiterzugeben.

## 3. Teilnahme am Tippspiel

- Die Teilnahme am Tippspiel ist kostenlos und unverbindlich.
- Sie können Ihre Bewertungen und Vorhersagen für die teilnehmenden Länder des ESC abgeben.
- Abgaben müssen innerhalb der vom Administrator festgelegten Fristen erfolgen.
- Nach Ablauf der Fristen oder nach dem Absenden können Tippabgaben nicht mehr geändert werden.

## 4. Datenschutz

- Wir erheben und speichern nur die für die Durchführung des Tippspiels notwendigen Daten (Benutzername, Anzeigename, vollständiger Name, Passwort-Hash).
- Ihre Daten werden nicht an Dritte weitergegeben.
- Sie können jederzeit die Löschung Ihres Kontos beantragen.

## 5. Haftungsausschluss

- Die Betreiber übernehmen keine Haftung für technische Störungen oder Datenverlust.
- Es besteht kein Anspruch auf Teilnahme oder Verfügbarkeit der Plattform.
- Die Betreiber behalten sich vor, Nutzerkonten bei Verstößen gegen diese Nutzungsbedingungen zu sperren oder zu löschen.

## 6. Verhaltensregeln

- Die Teilnehmer verpflichten sich zu einem respektvollen Umgang.
- Manipulationsversuche oder missbräuchliche Nutzung führen zum Ausschluss vom Tippspiel.

## 7. Änderungen der Nutzungsbedingungen

Die Betreiber behalten sich das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern. Über wesentliche Änderungen werden die Teilnehmer informiert.

## 8. Kontakt

Bei Fragen zu diesen Nutzungsbedingungen wenden Sie sich bitte an den Administrator.
"""
