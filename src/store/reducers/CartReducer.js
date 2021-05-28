import * as actionTypes from '../actions/actionTypes'
import { updateObject } from "../utility";
import { PURGE } from "redux-persist";



const initialState = {
  cartData: [],

}
const AddtoCart = (state, action) => {
  const cartItem = [...state.cartData];
  const data = action.cartData;
  let obj = cartItem.find((x) => x.supplierProductId === data.productId);
  if (obj) {
    let index = cartItem.indexOf(obj);
    cartItem[index].quantity = cartItem[index].quantity + 1;

  } else {
    cartItem.push(data);

  }
  return updateObject(state, {
    cartData: cartItem
  })
}

const updateCart = (state, action) => {
  const cartItem2 = [...state.cartData];
  const data2 = action.cartupdatedData;
  data2.filteredCart.quantity = data2.filteredCart.quantity + data2.value;
  if (data2.filteredCart.quantity <= 0) {
    let index2 = cartItem2.indexOf(data2.filteredCart);
    cartItem2.splice(index2, 1);

  } else {
    let index2 = cartItem2.indexOf(data2.filteredCart);
    cartItem2.splice(index2, 1, data2.filteredCart);

  }
  return updateObject(state, {
    cartData: cartItem2
  })
}

const updateCartIndex = (state, action) => {
  const cartItem3 = [...state.cartData];
  const data3 = action.cartIndex;
  state.cartData[data3.index].quantity = state.cartData[data3.index].quantity + data3.value;
  let obj2 = cartItem3.find(
    (cart) => cart.supplierProductId === state.cartData[data3.index].supplierProductId
  );
  if (state.cartData[data3.index].quantity <= 0) {
    let index2 = cartItem3.indexOf(obj2);
    cartItem3.splice(index2, 1);

  } else {
    let index2 = cartItem3.indexOf(obj2);
    cartItem3.splice(index2, 1, state.cartData[data3.index]);

  }
  return updateObject(state,
    {
      cartData: cartItem3
    })
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART: return AddtoCart(state, action);
    case actionTypes.UPDATE_CART: return updateCart(state, action);
    case actionTypes.UPDATE_CART_INDEX: return updateCartIndex(state, action);
    case PURGE:return initialState;
    default: return state;
  }
}
export default cartReducer;