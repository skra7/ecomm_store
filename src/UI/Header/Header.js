import React, { useState } from "react";
import "./Header.css";
import { useHistory } from "react-router-dom";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import * as Categoryaction from "../../store/actions/CategoryAction";
import { connect } from "react-redux";
function Header(props) {
  const history = useHistory();
  let id = "";
  if (props.sellerInfos?.shopUrlString) {
    id = props.sellerInfos?.shopUrlString;
  }

  const goTohome = (e) => {
    e.preventDefault();
  

    history.push("/");
    
   
  

    props.onSetCategory("All");
  };
  const goToProfile = (e) => {
    e.preventDefault();

  
    history.push("/login");

  };
  const goToCheckout = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
   
    history.push("/checkout");

   
  };

  return (
    <nav className="header">
      {/* Logo on the Left */}
      <p className="header__link" onClick={goTohome}>
        <Typography>
          <h4 className="header__logo">
            {props.businessDetails?.businessName?.split(" ")[0]}
            <span style={{ color: "#31de79" }}>
              &nbsp;
              {props.businessDetails?.businessName
                ?.split(" ")
                .slice(1)
                .join(" ")}
            </span>
          </h4>
        </Typography>
      </p>

      {/* Search Box */}

      {/* 3 Links */}

      <div className="header__nav">
        {/* 1st Link */}

        <p onClick={goToProfile} className="header__link">
          <div className="header__option">
            <span className="header__optionLineOne">
              <AccountCircleIcon />
            </span>
          </div>
        </p>
        {/* 2nd Link */}
        {/* <Link to="/" className="header__link">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link> */}
        {/* 3rd Link */}
        <a
          href={`https://api.whatsapp.com/send?phone=91${props.mobileNumber}`}
          className="header__linkWhatsapp"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="header__optionBasket">
            {/* Shopping Basket Icon */}
            <WhatsAppIcon />
            {/* No of items in container */}
          </div>
        </a>
        {/* 4th Link */}
        <p onClick={goToCheckout} className="header__link">
          <div className="header__optionBasket">
            {/* Shopping Basket Icon */}
            <ShoppingCartIcon />
            {/* No of items in container */}
            <span className="header__optionLineTwo header__basketCount">
              {props.cartData.length}
            </span>
          </div>
        </p>
      </div>
    </nav>
  );
}
const mapStateToProps = (state) => {
  return {
    category: state.category.category,
    sellerInfos: state.category.sellerInfo,
    sellerInfoloading: state.category.sellerInfoloading,
    supplierDataloading: state.category.supplierDataloading,
    businessDetails: state.category.businessDetails,
    mobileNumber: state.category.mobileNumber,
    cartData: state.cart.cartData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetCategoryData: (id) => dispatch(Categoryaction.getCategoryData(id)),
    onSetCategory: (category) => dispatch(Categoryaction.setcategory(category)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
