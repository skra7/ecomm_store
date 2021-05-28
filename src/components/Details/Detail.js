import React from 'react';
import "./Detail.css";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Button from "@material-ui/core/Button";
import iconimage from "../../images/icon.jpg";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from '../../UI/commons/Badge'
import { connect } from 'react-redux'
import * as Cartaction from '../../store/actions/Cartaction'
function Detail(props) {
  const [product, setproduct] = React.useState(props.location.state.data || []);
  const noImage = [1];
  const [filteredCart, setFilteredCart] = React.useState([]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const product = props.location.state.data;
    setFilteredCart(props.cartData.filter(
      (cart) => cart.supplierProductId === product._id
    ))
  }, [props.cartData])

  async function productCart(product) {

    var cartData = {
      supplierId: props.supplierId,
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

    props.onAddtoCart(cartData);
    // addToast("Added To Cart", { appearance: "success", autoDismiss: true });

  }
  const cartValue = (value, product, filteredCart) => {
    let cartupdatedData = {
      value: value,
      product: product,
      filteredCart: filteredCart
    }
    props.onupdateCart(cartupdatedData);
  };
  let priceDiff = product.originalPrice - product.sellingPrice
  let discount = null;
  if (product.originalPrice > product.sellingPrice) {
    discount = (((product.originalPrice - product.sellingPrice) / product.originalPrice) * 100).toFixed(0);
  }
  return (
    <form className="product__page">
      <div className="product__name">
        <h2>{product.productName}</h2>
      </div>
      <div className="product__carousel">
        <AliceCarousel fadeOutAnimation={true} autoPlay autoPlayInterval="3000">
          {
            product.imageUrl.split(",")[0] ? (
              product.imageUrl.split(",")?.map((image, index) => (
                discount ? <Badge discount={discount}>
                  <img key={index} src={image} className="sliderimg" alt=""  style={{width:window.screen.width}}/>
                </Badge> : <img key={index} src={image} className="sliderimg" alt="" style={{width:window.screen.width}} />
              ))
            )
              :

              (
                noImage.map((index) => (

                  discount ? <Badge discount={discount}>
                    <img src={iconimage} className="sliderimg" alt="" style={{width:window.screen.width}}/>
                  </Badge> : <img src={iconimage} className="sliderimg" alt="" style={{width:window.screen.width}}/>
                ))


              )


          }



        </AliceCarousel>

      </div>

      <div className="product__description">
        {product.description ? <p><strong>Description : </strong>{product.description}</p> : null}
      </div>
      <div className="product__price">
        <h2>&#8377; {product.sellingPrice}</h2><br />
        {priceDiff > 0 ? <strong><p style={{ textDecoration: 'line-through', color: '#777' }}><br />&nbsp;&nbsp;&#8377; {product.originalPrice}</p></strong> : null}

      </div>
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
    </form>
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
    onupdateCartIndex: (cartIndex) => dispatch(Cartaction.updateCartIndex(cartIndex)),
    onAddtoCart: (cartData) => dispatch(Cartaction.AddtoCart(cartData)),
    onupdateCart: (cartupdatedData) => dispatch(Cartaction.updateCart(cartupdatedData))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
