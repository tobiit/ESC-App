package com.escapp.mobile.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

/* =======================================================================
   Design Tokens – exakte Farbwerte aus /design-tokens/tokens/a1/
   ======================================================================= */

// ── core-color-blue ──
val Blue100  = Color(0xFFF0F7FC)
val Blue200  = Color(0xFFDBEAF5)
val Blue300  = Color(0xFFC3D7E9)
val Blue400  = Color(0xFFADC6DC)
val Blue500  = Color(0xFF8DAFD1)
val Blue600  = Color(0xFF6590BD)
val Blue700  = Color(0xFF3F72B1)
val Blue800  = Color(0xFF1A5393)
val Blue900  = Color(0xFF003781)
val Blue1000 = Color(0xFF00266D)
val Blue1100 = Color(0xFF001955)
val Blue1200 = Color(0xFF000F39)

// ── core-color-darkblue ──
val DarkBlue100  = Color(0xFFF2F4F9)
val DarkBlue200  = Color(0xFFE4EAF3)
val DarkBlue300  = Color(0xFFCFD9EA)
val DarkBlue400  = Color(0xFFB6C5DE)
val DarkBlue500  = Color(0xFF98ACCF)
val DarkBlue600  = Color(0xFF758FBB)
val DarkBlue700  = Color(0xFF5371A4)
val DarkBlue800  = Color(0xFF335389)
val DarkBlue900  = Color(0xFF1C3A6C)
val DarkBlue1000 = Color(0xFF122B54)
val DarkBlue1100 = Color(0xFF0F1F3A)
val DarkBlue1200 = Color(0xFF091223)

// ── core-color-gray ──
val Gray100  = Color(0xFFF4F4F5)
val Gray200  = Color(0xFFE9EAEB)
val Gray300  = Color(0xFFD7D9DB)
val Gray400  = Color(0xFFC0C4C7)
val Gray500  = Color(0xFFA7ACB1)
val Gray600  = Color(0xFF888F96)
val Gray700  = Color(0xFF68727B)
val Gray800  = Color(0xFF495560)
val Gray900  = Color(0xFF2F3C49)
val Gray1000 = Color(0xFF202D3B)
val Gray1100 = Color(0xFF12202E)
val Gray1200 = Color(0xFF041321)

// ── core-color-red ──
val Red100  = Color(0xFFFBF1F1)
val Red200  = Color(0xFFFAE2E3)
val Red300  = Color(0xFFFACAC6)
val Red400  = Color(0xFFFEA5AA)
val Red500  = Color(0xFFFF808A)
val Red600  = Color(0xFFFD4369)
val Red700  = Color(0xFFDD0A42)
val Red800  = Color(0xFFAA001B)
val Red900  = Color(0xFF7C0007)
val Red1000 = Color(0xFF5C0906)
val Red1100 = Color(0xFF3F0C06)
val Red1200 = Color(0xFF1F0804)

// ── core-color-green ──
val Green100  = Color(0xFFE7F9EB)
val Green200  = Color(0xFFC0F3D1)
val Green300  = Color(0xFF9AE5B4)
val Green400  = Color(0xFF68D190)
val Green500  = Color(0xFF34C270)
val Green600  = Color(0xFF10A251)
val Green700  = Color(0xFF05813C)
val Green800  = Color(0xFF006028)
val Green900  = Color(0xFF00450F)

// ── core-color-aqua ──
val Aqua100  = Color(0xFFEEF6F6)
val Aqua200  = Color(0xFFDFEFF2)
val Aqua300  = Color(0xFFB2DCEA)
val Aqua400  = Color(0xFF83CBE5)
val Aqua500  = Color(0xFF51B6DD)
val Aqua600  = Color(0xFF0E98CC)
val Aqua700  = Color(0xFF0377A8)
val Aqua800  = Color(0xFF005885)
val Aqua900  = Color(0xFF003D63)

// ── semantic-opacity-media-disabled ──
const val OpacityDisabled = 0.3f

/* =======================================================================
   Material3 ColorScheme – mapped from semantic design tokens
   ======================================================================= */

/**
 * semantic-color-action-primary-resting     → Blue900  (primary)
 * semantic-color-action-primary-hover        → Blue1000 (onPrimaryContainer)
 * semantic-color-action-secondary-resting    → Blue700  (secondary)
 * semantic-color-surface-default-resting     → White    (surface / background)
 * semantic-color-on-surface-primary-resting  → Blue900  (onSurface)
 * semantic-color-on-surface-secondary-resting→ Blue700  (onSurfaceVariant)
 * semantic-color-border-secondary-resting    → Blue600  (outline)
 * semantic-color-border-tertiary-disabled    → Gray300  (outlineVariant)
 * core-color-red-700                        → Red700   (error)
 */
private val LightColorScheme = lightColorScheme(
    primary            = Blue900,
    onPrimary          = Color.White,
    primaryContainer   = Blue200,
    onPrimaryContainer = Blue1000,

    secondary            = Blue700,
    onSecondary          = Color.White,
    secondaryContainer   = Blue100,
    onSecondaryContainer = DarkBlue1000,

    tertiary            = DarkBlue900,
    onTertiary          = Color.White,
    tertiaryContainer   = DarkBlue200,
    onTertiaryContainer = DarkBlue1000,

    error            = Red700,
    onError          = Color.White,
    errorContainer   = Red200,
    onErrorContainer = Red1000,

    background       = Blue100,
    onBackground     = DarkBlue1000,

    surface          = Color.White,
    onSurface        = DarkBlue1000,
    surfaceVariant   = Gray100,
    onSurfaceVariant = Blue700,

    outline        = Blue600,
    outlineVariant = Gray300,

    inverseSurface   = DarkBlue1000,
    inverseOnSurface = Color.White,
    inversePrimary   = Blue400,

    surfaceTint    = Blue900,
    surfaceBright  = Color.White,
    surfaceDim     = Blue100,
    surfaceContainer      = Blue100,
    surfaceContainerHigh  = Blue200,
    surfaceContainerHighest = Blue300,
    surfaceContainerLow   = Color.White,
    surfaceContainerLowest = Color.White,
)

private val DarkColorScheme = darkColorScheme(
    primary            = Blue400,
    onPrimary          = Blue1200,
    primaryContainer   = Blue900,
    onPrimaryContainer = Blue200,

    secondary            = Blue300,
    onSecondary          = Blue1100,
    secondaryContainer   = Blue800,
    onSecondaryContainer = Blue100,

    tertiary            = DarkBlue400,
    onTertiary          = DarkBlue1100,
    tertiaryContainer   = DarkBlue800,
    onTertiaryContainer = DarkBlue200,

    error            = Red400,
    onError          = Red1100,
    errorContainer   = Red800,
    onErrorContainer = Red200,

    background       = DarkBlue1200,
    onBackground     = Blue100,

    surface          = DarkBlue1100,
    onSurface        = Blue100,
    surfaceVariant   = Gray900,
    onSurfaceVariant = Blue300,

    outline        = DarkBlue500,
    outlineVariant = Gray800,

    inverseSurface   = Blue100,
    inverseOnSurface = DarkBlue1000,
    inversePrimary   = Blue900,

    surfaceTint    = Blue400,
    surfaceBright  = DarkBlue900,
    surfaceDim     = DarkBlue1200,
    surfaceContainer      = DarkBlue1100,
    surfaceContainerHigh  = DarkBlue1000,
    surfaceContainerHighest = DarkBlue900,
    surfaceContainerLow   = DarkBlue1200,
    surfaceContainerLowest = Color(0xFF050D18),
)

@Composable
fun EscAppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme,
        content = content
    )
}
