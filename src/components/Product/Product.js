import React from "react";
import "./Product.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import * as Cartaction from '../../store/actions/Cartaction'
import IconButton from "@material-ui/core/IconButton";
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import Badge from '../../UI/commons/Badge'

function Product({ product, key, filteredCart, onAddtoCart, onupdateCart, supplierId }) {

  const history = useHistory();

  const productDetails = (product) => {
    history.push({
      pathname: `/product/${product._id}`,
      state: {
        data: product,
        filteredCart: filteredCart
      }
    })
  }
  const productCart = (product) => {

    var cartData = {
      supplierId: supplierId,
      supplierCategoryId: product.supplierCategoryId,
      supplierProductId: product._id,
      categoryName: product.categoryName,
      productName: product.productName,
      description: product.description,
      sellingPrice: product.sellingPrice,
      originalPrice: product.originalPrice,
      unit: product.unit,
      quantity: 1,
      perQuantity: product.perQuantity || 1,
      imageUrl: product.imageUrl,
    };
    onAddtoCart(cartData);
    // addToast("Added To Cart", { appearance: "success", autoDismiss: true });

  }
  const cartValue = (value, product, filteredCart) => {
    let cartupdatedData = {
      value: value,
      product: product,
      filteredCart: filteredCart
    }
    onupdateCart(cartupdatedData);

  };
  let discount = null;
  let priceDiff = product.originalPrice - product.sellingPrice
  if (parseFloat(product.originalPrice) > parseFloat(product.sellingPrice)) {
    discount = (((product.originalPrice - product.sellingPrice) / product.originalPrice) * 100).toFixed(0);

  }

  return (
    <div id={product._id} key={product._id} className="product">
      <div className="product__info">
        <Typography>
        { product.productName.length>45?
        <strong> <p className="product__name">{product.productName.substr(0,45)}.....</p></strong>
        :<strong> <p className="product__name">{product.productName}</p></strong>}
          <p className="product__price">

            <small>&#8377; </small>

            <strong>{product.sellingPrice}</strong>
            <small>/{product?.perQuantity>1?product.perQuantity:null} {product.unit}</small>
          </p>
          {priceDiff > 0 ? <p className="product__price">

            <small>&#8377; </small>

            <strong><small><p style={{ textDecoration: 'line-through', color: '#777' }}>{product.originalPrice}</p></small></strong>

          </p> : null}


        </Typography>
      </div>


      { discount>0 ? <Badge discount={discount}><div className="product"> <img
        src={
          product.imageUrl.split(",")[0]
            ? product.imageUrl.split(",")[0]
            : "/icon.jpg"
        }
        loading="lazy"
        alt=""
        onClick={(event) => {
          event.preventDefault();
          productDetails(product)
        }}
      /></div></Badge> : <div className="product"><img
          src={
            product.imageUrl.split(",")[0]
              ? product.imageUrl.split(",")[0]
              : "/icon.jpg"
          }
          alt=""
          loading="lazy"
          onClick={(event) => {
            event.preventDefault();
            productDetails(product)
          }}
        /></div>}


      <div className="product__buttons">

        {filteredCart.length > 0 && filteredCart[0].quantity > 0 ? (
          <div className="product__incDec">
            <IconButton
              className="product__incDecButton"
              onClick={(event) => {
                event.preventDefault();
                cartValue(-1, product, filteredCart[0]);
              }}
            >
              <RemoveIcon />
            </IconButton>

            <input type="text" value={filteredCart[0].quantity} readOnly />
            <IconButton
              className="product__incDecButton"
              onClick={(event) => {
                event.preventDefault();
                cartValue(1, product, filteredCart[0]);
              }}
            >
              <AddIcon />
            </IconButton>
          </div>
        ) : (

            <Button
              style={{
                backgroundColor: "#31de79",
                color: "#ffffff",
                border: "1px solid",
                width: "150px",
                zIndex: "2"
              }}
              variant="contained"
              size="small"
              className="product__cartButton"
              onClick={(event) => {
                event.preventDefault();
                productCart(product);
              }}
            >
              <ShoppingCartIcon />
          &nbsp;&nbsp;Add
            </Button>
          )}
      </div>

    </div>

  );
}
const mapStateToProps = (state) => {
  return {

    cartData: state.cart.cartData,
    supplierId: state.category.supplierId
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddtoCart: (cartData) => dispatch(Cartaction.AddtoCart(cartData)),
    onupdateCart: (cartupdatedData) => dispatch(Cartaction.updateCart(cartupdatedData))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);
