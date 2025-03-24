import { useAuthStore } from "../store/auth";
import axios from "axios";
import jwt_decode from "jwt-decode"
import Cookies from "js-cookie";

export const login = async (email, password) => {
    try {
        const {data, status} = axios.post("user/token/", {
            email,
            password,
        })
        if(status === 200) {
            setAuthUser(data.access, data.refresh)
            // ALert - Sign In Successfully

        }
        return {data, error: null}
    } catch (error) {
        return {
            data: null,
            error: error.response.data?.detail || "Something went wrong"
        }
    }
}

export const register = async (full_name, email, phone, password, password2, user_type) => {
    try {
        const { data } = await axios.post('user/register/', {
            full_name,
            email,
            phone,
            password,
            password2,
            user_type
        })

        await login(email, password)

        // Alert Sigup successfully
        return { data, error: null}
    } catch (error) {
        return {
            data: null,
            error: error.response.data?.detail || "Something went wrong"
        }
    }
}

export const logout = () => {
    Cookie.remove("access_token")
    Cookie.remove("refresh_token")
    useAuthStore.getState().setUser(null)

    // Alert
}

export const setUser = async () => {
    const accessToken = Cookies.get("access_token")
    const refreshToken = Cookies.get("refresh_token")

    if (!accessToken || ! refreshToken) {
        return;
    }
    if (isAccessTokenExpired(accessToken)) {
        const response = await getRefreshToken(refreshToken)
        setAuthUser(response.access, response.refresh)

    } else {
        setAuthUser(accessToken, refreshToken)
    }
}

export const setAuthUser = (access_token, refresh_token) => {
    Cookies.set('access_token', access_token, {
        expires: 1,
        secure: true
    })
    Cookies.set('refesh_token', refresh_token, {
        expires: 7,
        secure: true
    })
    const user = jwt_decode(access_token) ?? null

    if (user) {
        useAuthStore.getState().setUser(user)
    }
    useAuthStore.getState().setLoading(false)

}

export const getRefreshToken = async () => {
    const refesh_token = Cookies.get("refresh_token")
    const response = await axios.post("user/token/refresh/", {
        refresh: refesh_token
    })
    
    return response.data
}

export const isAccessTokenExpired = (accessToken) => {
    try {
        const decodeToken = jwt_decode(accessToken)
        return decodeToken.exp < Date.now() / 100
    } catch (error) {
        console.log(error)
        return true
    }
}
