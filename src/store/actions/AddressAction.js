import * as actionTypes from './actionTypes';
import axios from 'axios';
export const Addaddress = (address, status) => {
  return {
    type: actionTypes.ADD_ADDRESS,
    address: address,
    status: status
  }
}
export const setAddressError=()=>{
  return{
    type:actionTypes.SETEADDRESS_ERROR
  }
}
export const setAddressStatus = () => {
  return {
    type: actionTypes.SET_ADDRESS_STATUS
  }
}
export const fetchAddress = () => {
  return {
    type: actionTypes.FETCH_ADDRESS,

  }
}

export const AddaddressFail = (error) => {
  return {
    type: actionTypes.ADDRESS_FAIL,
    error: error
  }
}
export const updatingAddress=(updatedaddress,updatestatus)=>{
  return{
    type:actionTypes.UPDATE_ADDRESS,
    updatestatus:updatestatus,
    updatedaddress:updatedaddress
  }
}
export const updatingAddressFail=(updateerror)=>{
  return{
    type:actionTypes.UPDATE_ADDRESS_FAIL,
    updateerror:updateerror
  }
}


export const deleteAddressSuccess=(deletedAddress,deletestatus)=>{
  return{
    type:actionTypes.DELETE_ADDRESS,
    deletestatus:deletestatus,
    deletedAddress:deletedAddress
  }
}

export const deleteAddressFail=(deleteerror)=>{
  return{
    type:actionTypes.DELETE_ADDRESS_FAIL,
    deleteerror:deleteerror
  }
}

export const deleteAddress=(addressId)=>{
  return dispatch=>{
    const webUser = JSON.parse(localStorage.getItem("webUser"));
      
    var apiBaseUrl = `http://15.207.67.143:4000/v1/deleteAddressbyId`;
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization" : webUser.token
      };
      axios
        .post(apiBaseUrl,addressId, {headers : headers})
        .then((response) => {
         
            
          dispatch(deleteAddressSuccess(response.data.data,response.status))
            
          
        })
        .catch(err => {
         dispatch(deleteAddressFail(err));
            
        })
  }
}



export const UpdateAddress=(updatedAddress)=>{
  return dispatch=>{
    const webUser = JSON.parse(localStorage.getItem("webUser"));
      
        var apiBaseUrl = `http://15.207.67.143:4000/v1/updateAddressbyId`;
        const headers = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization" : webUser.token
          };
          axios
            .post(apiBaseUrl,updatedAddress, {headers : headers})
            .then((response) => {
             
              dispatch(updatingAddress(response.data.data,response.status))
                
              
            })
            .catch(err => {
             dispatch(updatingAddressFail(err));
                
            })
  }
}
export const addAddress = (address) => {
  return dispatch => {
    const webUser = JSON.parse(localStorage.getItem("webUser"));

    var apiBaseUrl = `http://15.207.67.143:4000/v1/updateAddress`;
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": webUser.token
    };
    axios
      .post(apiBaseUrl, address, { headers: headers })
      .then((response) => {
        if (response.status === 200) {

          dispatch(Addaddress(address, response.status))

        }
      })
      .catch(err => {
        dispatch(AddaddressFail(err));

      })
  }
}
