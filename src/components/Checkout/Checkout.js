import React from "react";
import "./Checkout.css";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import Subtotal from "../Subtotal/Subtotal";
import { connect } from 'react-redux'
import * as Cartaction from '../../store/actions/Cartaction'
function Checkout(props) {

  const [cartTotal, setCartTotal] = React.useState(0);
  const id = props.sellerInfos.shopUrlString;

  const cartValue = (value, product, index) => {
    let cartIndex = {
      value: value,
      product: product,
      index: index
    }
    props.onupdateCartIndex(cartIndex);

  };

  React.useEffect(() => {
props.showBackdrop(true)

    document.querySelector("body").classList.remove("overflow-hidden");
    let cartTotalPrice = 0;
    props.cartData.map((product) => {
      cartTotalPrice += product.sellingPrice * parseFloat(product.quantity);
    });
    setCartTotal(cartTotalPrice);
  }, [props.cartData]);
setTimeout(()=>{
props.showBackdrop(false)
},1000)
  return (
    <div className="checkout">
      <div className="checkout__left">
        {props.cartData?.length > 0 ? (
          <div className="checkout__ad">
            <Subtotal id={id} cartTotal={cartTotal} delivery={props.businessDetails.deliveryCharges} deliveryUpto={props.businessDetails.deliveryUpto} cartData={props.cartData} />
          </div>
        ) : (
            <div></div>
          )}
        {props.cartData?.length === 0 ? (
          <div>
            <h2>Your Basket is empty</h2>
            <p>
              You have no items in your bakset. To buy one or more items click "
              Add to basket" next to the item.
            </p>
          </div>
        ) : (
            <div>
              <h2 className="checkout__title">Your Shopping Basket</h2>
              {props.cartData?.map((item, index) => (
                <CheckoutProduct
                  item={item}
                  index={index}
                  cartValue={cartValue}
                />
              ))}
            </div>
          )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    businessDetails: state.category.businessDetails,
    mobileNumber: state.category.mobileNumber,
    cartData: state.cart.cartData,
    authData: state.auth.authData,
    sellerInfos: state.category.sellerInfo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onupdateCartIndex: (cartIndex) => dispatch(Cartaction.updateCartIndex(cartIndex))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
