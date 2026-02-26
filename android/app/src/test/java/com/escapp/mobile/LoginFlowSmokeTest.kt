package com.escapp.mobile

import com.escapp.mobile.model.LoginRequest
import org.junit.Assert.assertEquals
import org.junit.Test

class LoginFlowSmokeTest {
    @Test
    fun loginRequest_hasExpectedFields() {
        val request = LoginRequest(username = "user1", password = "secret")
        assertEquals("user1", request.username)
        assertEquals("secret", request.password)
    }
}
