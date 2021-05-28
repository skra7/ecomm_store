import * as actionTypes from '../actions/actionTypes'
import { updateObject } from "../utility";
const initialState = {
    error: '',
    status: '',
    resenderror: '',
    resendstatus: '',
    verifyerror: '',
    verifystatus: '',
    verifydata: '',
    authData: []
}
const authSuccess = (state, action) => {
    return updateObject(state, {
        status: action.status
    })



}
const authdata = (state, action) => {
    return updateObject(state,
        {
            authData: action.authData
        })
}
const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    })
}

const resendFail = (state, action) => {
    return updateObject(state, {
        resenderror: action.resenderror
    })
}


const resendSuccess = (state, action) => {
    return updateObject(state, {
        resendstatus: action.resendstatus
    })
}

const verifyFail = (state, action) => {
    return updateObject(state, {
        verifyerror: action.verifyerror
    })
}
const verifySuccess = (state, action) => {
    return updateObject(state, {
        verifystatus: action.verifystatus,
        verifydata: action.verifydata
    })
}
const authStatus = (state, action) => {
    return updateObject(state, {
        status: '',
        error:'',
        verifyerror: '',
        verifystatus: ''
    })
}




const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.RESEND_OTP_FAIL: return resendFail(state, action);
        case actionTypes.RESEND_OTP_SUCCESS: return resendSuccess(state, action);
        case actionTypes.VERIFY_OTP_SUCCESS: return verifySuccess(state, action);
        case actionTypes.VERIFY_OTP_FAIL: return verifyFail(state, action);
        case actionTypes.STORE_AUTH_DATA: return authdata(state, action);
        case actionTypes.AUTH_STATUS: return authStatus(state, action);
        default: return state;
    }
}
export default AuthReducer;