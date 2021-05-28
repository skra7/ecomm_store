import * as actionTypes from '../actions/actionTypes'
import { updateObject } from "../utility";
const initialState={
  Orders:'',
    error:'',
    status:'',
}
const OrderHistory=(state,action)=>{
    return updateObject(state,{
       Orders: action.orderHistory,
        status:action.status
    }) 
    
     
    
}
const OrderFail=(state,action)=>{
    return updateObject(state,{
        error:action.error
    })
}

const setStatus=(state,action)=>{
    return updateObject(state,{
        status:'',
        error:''
    })
}


const OrderReducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case actionTypes.FETCH_ORDERS:return OrderHistory(state,action);
        case actionTypes.FETCH_ORDERS_FAIL:return OrderFail(state,action);
        case actionTypes.SET_ORDERS_STATUS:return setStatus(state,action);
        default:return state;
    }
}
export default OrderReducer;