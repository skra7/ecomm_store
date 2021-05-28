import React from "react";
import "./CheckoutProduct.css";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";

function CheckoutProduct({ item, index, cartValue }) {
  return (

          <div className="checkoutProduct">
      <img
        className="checkoutProduct__image"
        src={
          item.imageUrl.split(",")[0]
            ? item.imageUrl.split(",")[0]
            : "/icon.jpg"
        }
        alt=""
      />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{item.productName}</p>
        <p className="checkoutProduct__price">
          <small>&#8377;</small>
          <strong>{item.sellingPrice}</strong>
        </p>
        {/* <div className="checkoutProduct__rating"> */}
          {/* {Array(item.rating)
            .fill()
            .map((_) => (
              <span aria-label="Rupees" role="img">
                &#11088;
              </span>
            ))} */}
          {/* {item.productName} */}
        {/* </div> */}
        <span className="product__incDec" style={{display:'block'}}>
          <IconButton
            className="product__incDecButton"
            onClick={(event) => {
              event.preventDefault();
              cartValue(-1, item, index);
            }}
            
          >
            <RemoveIcon />
          </IconButton>
          <input type="text" value={item.quantity} readOnly />
          <IconButton
            className="product__incDecButton"
            onClick={(event) => {
              event.preventDefault();
              cartValue(1, item, index);
            }}
            
          >
            <AddIcon />
          </IconButton>
        </span>
      </div>
    </div>
  );
}

export default CheckoutProduct;
