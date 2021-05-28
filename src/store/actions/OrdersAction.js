import * as actionTypes from './actionTypes';
import axios from 'axios';

export const FetchOrders=(orderHistory,status)=>{
    return{
        type:actionTypes.FETCH_ORDERS,
        orderHistory:orderHistory,
        status:status
    }
}
export const OrdersFail=(error)=>{
  return{
    type:actionTypes.FETCH_ORDERS_FAIL,
    error:error
  }
}
export const SetStatus=()=>{
  return{
    type:actionTypes.SET_ORDERS_STATUS,
    status:'',
    error:''
  }
}
export const UserOrders=(sellerId)=>{
    return dispatch=>{
        const webUser = JSON.parse(localStorage.getItem("webUser"));
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization" : webUser.token
          };
          var apiBaseUrl2 = `http://15.207.67.143:4000/v1/userOnlineOrders?sellerId=${sellerId}`;
         axios
          .get(apiBaseUrl2, {headers : headers})
          .then((response) => {
           
   
        dispatch(FetchOrders(response.data.data,response.status));
          })
          .catch((err) => {
            dispatch(OrdersFail(err))
          });
    }
}
