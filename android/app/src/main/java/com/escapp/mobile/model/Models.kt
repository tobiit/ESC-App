package com.escapp.mobile.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

/* ── Auth ── */

@Serializable
data class LoginRequest(val username: String, val password: String)

@Serializable
data class RegisterRequest(
    val displayName: String,
    val fullName: String,
    val username: String,
    val password: String,
    val acceptedTerms: Boolean
)

@Serializable
data class RegisterResponse(val message: String)

@Serializable
data class RefreshRequest(val refreshToken: String)

@Serializable
data class RefreshResponse(val accessToken: String)

@Serializable
data class UserDto(
    val id: Long,
    val role: String,
    val username: String,
    @SerialName("displayName") val displayName: String
)

@Serializable
data class LoginResponse(
    val accessToken: String,
    val refreshToken: String,
    val user: UserDto
)

@Serializable
data class LogoutRequest(val refreshToken: String)

/* ── Event / Entries ── */

@Serializable
data class EventDto(
    val id: Long,
    val name: String,
    val year: Int? = null,
    val status: String,
    @SerialName("isActive") val isActive: Boolean = false
)

@Serializable
data class EntryDto(
    val id: Long,
    @SerialName("countryCode") val countryCode: String,
    @SerialName("songTitle") val songTitle: String? = null,
    @SerialName("artistName") val artistName: String? = null,
    @SerialName("sortOrder") val sortOrder: Int? = null
)

/* ── Rating ── */

@Serializable
data class RatingItemDto(val entryId: Long, val points: Int)

@Serializable
data class RatingDto(val status: String, val items: List<RatingItemDto> = emptyList())

@Serializable
data class RatingItemBody(val entryId: Long, val points: Int)

@Serializable
data class RatingUpsertRequest(val items: List<RatingItemBody>)

/* ── Prediction ── */

@Serializable
data class PredictionItemDto(val entryId: Long, val rank: Int)

@Serializable
data class PredictionDto(val status: String, val items: List<PredictionItemDto> = emptyList())

@Serializable
data class PredictionItemBody(val entryId: Long, val rank: Int)

@Serializable
data class PredictionUpsertRequest(val items: List<PredictionItemBody>)

/* ── Results ── */

@Serializable
data class ScoreDto(
    val rank: Int = 0,
    val points: Int = 0,
    val participantId: Long? = null,
    val displayName: String? = null,
    val exactMatches: Int? = null,
    val closeMatches: Int? = null,
    val totalDeviation: Int? = null
)

@Serializable
data class MeDto(
    val scoreAgainstRatingsRanking: ScoreDto? = null,
    val scoreAgainstOfficialRanking: ScoreDto? = null
)

@Serializable
data class RankingEntry(
    val entryId: Long? = null,
    val rank: Int = 0,
    val countryCode: String = ""
)

@Serializable
data class ResultsDto(
    val me: MeDto? = null,
    val ratingRanking: List<RankingEntry> = emptyList(),
    val top3A: List<ScoreDto> = emptyList(),
    val top3B: List<ScoreDto> = emptyList(),
    val officialRanking: List<RankingEntry> = emptyList()
)

