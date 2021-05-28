import * as actionTypes from './actionTypes';
import axios from 'axios';
export const AuthSuccess = (status) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        status: status
    }
}
export const AuthFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}
export const AuthStatus = () => {
    return {
        type: actionTypes.AUTH_STATUS
    }
}
export const AuthData = (authData) => {
    return {

        type: actionTypes.STORE_AUTH_DATA,
        authData: authData
    }
}
export const authentication = (logindata) => {
    return dispatch => {
        var apiBaseUrl = "http://15.207.67.143:4000/v1/sendOTP";

        var headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
        axios
            .post(apiBaseUrl, logindata, { headers: headers }, { validateStatus: false })
            .then((response) => {
                dispatch(AuthSuccess(response.status))
            })
            .catch((err) => {
                dispatch(AuthFail(err.message))
            })
    }
}
export const verify = (verifydata, verifystatus) => {
    return {
        type: actionTypes.VERIFY_OTP_SUCCESS,
        verifystatus: verifystatus,
        verifydata: verifydata
    }
}
export const verifyFail = (verifyerror) => {
    return {
        type: actionTypes.VERIFY_OTP_FAIL,
        verifyerror: verifyerror
    }
}
export const verifyOtp = (verifydata) => {
    return dispatch => {
        var apiBaseUrl = "http://15.207.67.143:4000/v1/verifyOTP";

        var headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
        axios
            .post(apiBaseUrl, verifydata, { headers: headers }, { validateStatus: false })
            .then((response) => {
                dispatch(verify(response.data.data, response.status))

            })
            .catch((err) => {
                dispatch(verifyFail(err.message))
            })
    }
}

export const resend = (resendstatus) => {
    return {
        type: actionTypes.RESEND_OTP_SUCCESS,
        resendstatus: resendstatus
    }
}
export const resendFail = (resenderror) => {
    return {
        type: actionTypes.RESEND_OTP_FAIL,
        resenderror: resenderror
    }
}
export const resendOtp = (resendData) => {
    return dispatch => {
        var apiBaseUrl = "http://15.207.67.143:4000/v1/sendOTP";
        var headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };
        axios
            .post(apiBaseUrl, resendData, { headers: headers }, { validateStatus: false })
            .then((response) => {
                dispatch(resend(response.status))
            })
            .catch((err) => {
                dispatch(resendFail(err.message))
            })
    }
}
