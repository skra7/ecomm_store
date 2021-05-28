import * as actionTypes from './actionTypes';
import axios from 'axios';
import { persistor } from '../../index'
export const checkoutSuccess = (data, status) => {
    return {
        type: actionTypes.CHECKOUT_SUCCESS,
        data: data,
        status: status
    }
}

export const setCheckoutStatus=()=>{
    return{
        type:actionTypes.SET_CHECKOUT_STATUS,
        status:'',
        errror:''
    }
}
export const checkoutFail = (error) => {
    return {
        type: actionTypes.CHECKOUT_FAIL,
        error: error
    }
}
export const checkout = (data) => {
    return dispatch => {
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        };
        var apiBaseUrl2 = "http://15.207.67.143:4000/v2/purchaseOrder";
        axios
            .post(apiBaseUrl2, data, { headers: headers })
            .then((response) => {


                dispatch(checkoutSuccess(response.data.data[0].Location, response.status));
            })
            .catch((err) => {
                dispatch(checkoutFail(err));
            });
    }
}
