import * as actionTypes from './actionTypes';
export const setcategory = (category) => {
  return {
    type: actionTypes.ADD_TO_CATEGORY,
    category: category
  }
}
export const getSupplierDeatilsSuccess = (mobileNumber, businessDetails) => {
  return {
    type: actionTypes.SUPPLIER_DEATILS_SUCCESS,
    mobileNumber: mobileNumber,
    businessDetails: businessDetails
  }

}
export const getSupplierDeatilsStart = () => {
  return {
    type: actionTypes.SUPPLIER_DEATILS_START
  }
}
export const getSupplierDeatilsFail = (error) => {
  return {
    type: actionTypes.SUPPLIER_DEATILS_FAIL,
    error: error
  }

}
export const getCategoryDataStart = () => {
  return {
    type: actionTypes.CATEGORY_ARRAY_START,

  }
}
export const getCategoryDataFail = (error) => {
  return {
    type: actionTypes.CATEGORY_ARRAY_FAIL,
    error: error

  }
}
export const getCategoryDataSuccess = (CategoryData) => {
  return {
    type: actionTypes.CATEGORY_ARRAY_SUCCESS,
    CategoryData: CategoryData,
  
  }
}
export const getProductDataStart = () => {
  return {
    type: actionTypes.PRODUCT_DATA_START
  }
}
export const getProductDataFail = (error) => {
  return {
    type: actionTypes.PRODUCT_DATA_FAIL,
    error: error
  }
}
export const getProductDataSuccess = (productData, productCount) => {
  return {
    type: actionTypes.PRODUCT_DATA_SUCCESS,
    productData: productData,
    productCount:productCount
  }
}
export const getSellerInfoStart = () => {
  return {
    type: actionTypes.SELLER_INFO_START
  }
}
export const getSellerInfoFail = (error) => {
  return {
    type: actionTypes.SELLER_INFO_FAIL,
    error: error
  }
}
export const getSellerInfoSuccess = (sellerInfo, supplierId) => {
  return {
    type: actionTypes.SELLER_INFO_SUCCESS,
    sellerInfo: sellerInfo,
    supplierId: supplierId

  }
}
export const getCategoryData = (id,pagination,page) => {
  return (dispatch) => {
    dispatch(getSellerInfoStart());

    fetch(
      `http://15.207.67.143:4000/seller/sellerInfoBywebUrl?webUrl=${window.location.origin}`,
      
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
         
        }),
      }
    )
      .then((r) => r.json())
      .then((r) => {
        dispatch(getSupplierDeatilsStart())
        fetch(
          `http://15.207.67.143:4000/supplierInfo?id=${r.data[0].userId}`,
          {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
             
            }),
          }
        )
          .then((r) => r.json())
          .then((r) => {
            dispatch(getSupplierDeatilsSuccess(r.data.numberWithOutCountryCode, r.data.businessDetails))
          })
          .catch((err) => {
            dispatch(getSupplierDeatilsFail(err));

          });


        dispatch(getCategoryDataStart());
        fetch(
          `http://15.207.67.143:4000/supplierCategorybyId?id=${r.data[0].userId}`,
          {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
             
            }),
          }
        )
          .then((r) => r.json())
          .then((r) => {

            dispatch(getCategoryDataSuccess(r.data[0]))

          })
          .catch((err) => {
            dispatch(getCategoryDataFail(err))

          });


        dispatch(getProductDataStart());
        fetch(
          `http://15.207.67.143:4000/supplierProductByUser?id=${r.data[0].userId}&pagination=${pagination}&page=${page}`,
          {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
             
            }),
          }
        )
          .then((r) => r.json())
          .then((r) => {

            dispatch(getProductDataSuccess(r.data[0], r.productCount));
          })
          .catch((err) => {
            dispatch(getProductDataFail(err));

          });


        dispatch(getSellerInfoSuccess(r.data[0], r.data[0].userId))
      })
      .catch((err) => {
        dispatch(getSupplierDeatilsFail(err))

      });


  }
}

export const getdataByCategoryStart = () => {
  return {
    type: actionTypes.PRODUCT_DATA_BYCATEGORY_START,
  };
};
export const getdataByCategoryFail = (error) => {
  return {
    type: actionTypes.PRODUCT_DATA_BYCATEGORY_FAIL,
    error: error,
  };
};
export const getdataByCategorySuccess = (DataByCat,DataByCatCount) => {
  return {
    type: actionTypes.PRODUCT_DATA_BYCATEGORY,
    DataByCat: DataByCat,
    DataByCatCount: DataByCatCount,
  };
};
export const getDataByCategory = (id, category) => {
  return (dispatch) => {
    dispatch(getdataByCategoryStart());
console.log(id)
    fetch(
      `http://15.207.67.143:4000/supplierProductByCategory?id=${id}&category=${category}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }),
      }
    )
      .then((r) => r.json())
      .then((r) => {
         console.log(r.data[0],category)
        dispatch(getdataByCategorySuccess(r.data[0],r.productCount));
      })

      .catch((err) => {
        dispatch(getdataByCategoryFail(err));
      });
  };
};
