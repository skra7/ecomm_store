import * as actionTypes from '../actions/actionTypes'
import { updateObject } from "../utility";
const initialState = {
    checkoutAddress: JSON.parse(localStorage.getItem("webUser"))?.address || [],
    error: '',
    status: '',
    updatestatus:'',
    updateerror:'',
    updatedaddress:'',
    deletestatus:'',
    deleteerror:'',
    deleteAddress:'',
}
const Addaddress = (state, action) => {
    const address = [...state.checkoutAddress];
    const addressfinal = [...address, action.address];
    const webUser = JSON.parse(localStorage.getItem("webUser"))
    webUser["address"] = addressfinal;
    localStorage.setItem("webUser", JSON.stringify(webUser));
    return updateObject(state, {
        checkoutAddress: [...address, action.address],
        status: action.status
    })

  

}
const setAddressError=(state,action)=>{
    return updateObject(state,{
        error:'',
        updateerror:'',
        deleteerror:''
    })
}
const fetchAddress = (state, action) => {
    return updateObject(state, {
        checkoutAddress: JSON.parse(localStorage.getItem("webUser")).address
    })
}
const AddaddressFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    })
}
const setAddressStatus = (state, action) => {
    return updateObject(state, {
        status: '',
        updatestatus:'',
        deletestatus:'',
    })
}
const updateAddress=(state,action)=>{
    const addressfinal = action.updatedaddress;

    const webUser = JSON.parse(localStorage.getItem("webUser"))
    webUser["address"] = addressfinal;
    localStorage.setItem("webUser",JSON.stringify(webUser));
    return updateObject(state,{
        updatestatus:action.updatestatus,
        checkoutAddress:action.updatedaddress
    })
}
const  updateAddressFail=(state,action)=>{
    return  updateObject(state,{
        updateerror:action.updateerror
    })
}

const deleteAddress=(state,action)=>{
   
    const addressfinal = action.deletedAddress;

    const webUser = JSON.parse(localStorage.getItem("webUser"))
    webUser["address"] = addressfinal;
    localStorage.setItem("webUser",JSON.stringify(webUser));
    return updateObject(state,{
        deletestatus:action.deletestatus,
        checkoutAddress: action.deletedAddress,
    })
}
const deleteError=(state,action)=>{
    return updateObject(state,{
        deleteerror:action.deleteerror
    })
}
const AddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ADDRESS: return Addaddress(state, action);
        case actionTypes.ADDRESS_FAIL: return AddaddressFail(state, action);
        case actionTypes.FETCH_ADDRESS: return fetchAddress(state, action);
        case actionTypes.SET_ADDRESS_STATUS: return setAddressStatus(state, action)
        case actionTypes.SETEADDRESS_ERROR:return setAddressError(state,action);
        case actionTypes.UPDATE_ADDRESS:return updateAddress(state,action);
        case actionTypes.UPDATE_ADDRESS_FAIL:return updateAddressFail(state,action);
        case actionTypes.DELETE_ADDRESS:return deleteAddress(state,action);
        case actionTypes.DELETE_ADDRESS_FAIL:return deleteError(state,action);
        default:return state
    }
}
export default AddressReducer;