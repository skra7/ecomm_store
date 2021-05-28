import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
import { PURGE } from "redux-persist";
const initialState = {
  category: "All",
  categoryDataArray: [],
  categoryDataloading: false,
  productDataloading: false,
  sellerInfoloading: false,
  supplierDataloading: false,
  mobileNumber: "",
  businessDetails: [],
  sellerInfo: [],
  supplierId: "",
  error: "",
  productData: [],
  status: '',
  page:1,
  productCount:'',
  DataByCat:[],
  DataByCatCount:'',
  DataByCatloading:false
};
const setCategory = (state, action) => {
  return updateObject(state, {
    category: action.category,
  });
};
const getCategorydataStart = (state, action) => {
  return updateObject(state, {
    categoryDataloading: true,
  });
};
const getCategorydataFail = (state, action) => {
  return updateObject(state, {
    categoryDataloading: false,
    error: action.error,
  });
};
const setPurge=(state,action)=>{
  return updateObject(state,{
    category:"All"
  })
}
const getcategoryDataSucesss = (state, action) => {

  return updateObject(state, {
    categoryDataArray: action.CategoryData,
    categoryDataloading: false,
  });
};

const getSellerInfoStart = (state, action) => {
  return updateObject(state, {
    sellerInfoloading: true,
  });
};
const getSellerInfoFail = (state, action) => {
  return updateObject(state, {
    sellerInfoloading: false,
    error: action.error,
  });
};
const getSellerInfoSuccess = (state, action) => {
  return updateObject(state, {
    sellerInfoloading: false,
    sellerInfo: action.sellerInfo,
    supplierId: action.supplierId,
  });
};
const getProductDataStart = (state, action) => {
  return updateObject(state, {
    productDataloading: true,
  });
};
const getProductDataFail = (state, action) => {
  return updateObject(state, {
    productDataloading: false,
    error: action.error,
  });
};
const getProductDataSuccess = (state, action) => {

  if(state.productData.length<action.productCount)
  {
    
  return updateObject(state, {
    productDataloading: false,
    productData:[...state.productData,...action.productData],
    productCount:action.productCount,
    page:state.page+1
  });
}
};
const getDataByCatStart = (state, action) => {
  return updateObject(state, {
    DataByCatloading: true,
  });
};
const getDataByCatFail = (state, action) => {
  return updateObject(state, {
    DataByCatloading: false,
    error: action.error,
  });
};
const getDataByCatSuccess = (state, action) => {

 
  return updateObject(state, {
    DataByCatloading: false,
    DataByCat:action.DataByCat,
    DataByCatCount:action.DataByCatCount,
    DataByCatPage:state.DataByCatPage+1
  });

};
export const getSupplierDataStart = (state, action) => {
  return updateObject(state, {
    supplierDataloading: true,
  });
};
export const getSupplierDataFail = (state, action) => {
  return updateObject(state, {
    supplierDataloading: false,
    error: action.error,
  });
};
export const getSupplierDataSuccess = (state, action) => {
  return updateObject(state, {
    supplierDataloading: false,
    mobileNumber: action.mobileNumber,
    businessDetails: action.businessDetails,
  });
};
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CATEGORY:
      return setCategory(state, action);

    case actionTypes.CATEGORY_ARRAY_START:
      return getCategorydataStart(state, action);
    case actionTypes.CATEGORY_ARRAY_SUCCESS:
      return getcategoryDataSucesss(state, action);
    case actionTypes.CATEGORY_ARRAY_FAIL:
      return getCategorydataFail(state, action);

    case actionTypes.SELLER_INFO_START:
      return getSellerInfoStart(state, action);
    case actionTypes.SELLER_INFO_SUCCESS:
      return getSellerInfoSuccess(state, action);
    case actionTypes.SELLER_INFO_FAIL:
      return getSellerInfoFail(state, action);

    case actionTypes.PRODUCT_DATA_START:
      return getProductDataStart(state, action);
    case actionTypes.PRODUCT_DATA_SUCCESS:
      return getProductDataSuccess(state, action);
    case actionTypes.PRODUCT_DATA_FAIL:
      return getProductDataFail(state, action);

    case actionTypes.SUPPLIER_DEATILS_START:
      return getSupplierDataStart(state, action);
    case actionTypes.SUPPLIER_DEATILS_SUCCESS:
      return getSupplierDataSuccess(state, action);
    case actionTypes.SUPPLIER_DEATILS_FAIL:
      return getSupplierDataFail(state, action);
      case actionTypes.PRODUCT_DATA_BYCATEGORY_START:
        return getDataByCatStart(state,action);
      case actionTypes.PRODUCT_DATA_BYCATEGORY_FAIL:
        return getDataByCatFail(state,action);
      case actionTypes.PRODUCT_DATA_BYCATEGORY:
        return getDataByCatSuccess(state,action);
        case PURGE:return setPurge(state,action);
    default:
      return state;
  }
};
export default categoryReducer;
