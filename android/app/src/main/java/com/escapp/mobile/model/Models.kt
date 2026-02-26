package com.escapp.mobile.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class LoginRequest(val username: String, val password: String)

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
data class EventDto(
    val id: Long,
    val name: String,
    val status: String
)

@Serializable
data class EntryDto(
    val id: Long,
    @SerialName("countryName") val countryName: String,
    @SerialName("songTitle") val songTitle: String? = null,
    @SerialName("artistName") val artistName: String? = null
)

@Serializable
data class RatingItemDto(val entryId: Long, val points: Int)

@Serializable
data class RatingDto(val status: String, val items: List<RatingItemDto> = emptyList())

@Serializable
data class RatingItemBody(val entryId: Long, val points: Int)

@Serializable
data class RatingUpsertRequest(val items: List<RatingItemBody>)

@Serializable
data class PredictionItemDto(val entryId: Long, val rank: Int)

@Serializable
data class PredictionDto(val status: String, val items: List<PredictionItemDto> = emptyList())

@Serializable
data class PredictionItemBody(val entryId: Long, val rank: Int)

@Serializable
data class PredictionUpsertRequest(val items: List<PredictionItemBody>)

@Serializable
data class ScoreDto(val rank: Int, val points: Int)

@Serializable
data class MeDto(
    val scoreAgainstRatingsRanking: ScoreDto? = null,
    val scoreAgainstOfficialRanking: ScoreDto? = null
)

@Serializable
data class ResultsDto(val me: MeDto? = null)

data class AppState(
    val user: UserDto? = null,
    val event: EventDto? = null,
    val entries: List<EntryDto> = emptyList(),
    val ratingMap: MutableMap<Long, Int> = mutableMapOf(),
    val predictionOrder: MutableList<Long> = mutableListOf(),
    val ratingSubmitted: Boolean = false,
    val predictionSubmitted: Boolean = false,
    val results: ResultsDto? = null,
    val message: String? = null,
    val error: String? = null
)
