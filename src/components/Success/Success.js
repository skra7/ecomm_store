import React from "react";
import "./Success.css";
import { useHistory } from "react-router-dom";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import GetAppIcon from "@material-ui/icons/GetApp";
import { connect } from "react-redux";
import { persistor } from "../../index";
function Success(props) {
  const [receipturl, setreceipturl] = React.useState(
    props.location.state.data || ""
  );
  const history = useHistory();
  const id = props.match.params.id;
  const [category, setCategory] = React.useState("");
  React.useEffect(() => {
    window.scrollTo(0, 0);
    props.showBackdrop(true);
  }, []);
  if (!props.productDataloading) {
    props.showBackdrop(false);
  }
  return (
    <div className="success">
      <CheckCircleOutlineIcon style={{ fontSize: 100, color: "#31de79" }} />
      <h1>Your order is successfully placed</h1>
      <div className="success__button">
        <div style={{ margin: "30px" }}>
          <h3>
            <GetAppIcon />
            &nbsp;&nbsp;
            <a
              href={receipturl}
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              Download Receipt
            </a>
          </h3>
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<ArrowBackIcon />}
          onClick={(e) => {
            e.preventDefault();
           
            let string = window.location.origin;
            window.open(string, "_self");
          }}
        >
          Home
        </Button>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    sellerInfos: state.category.sellerInfo,
    sellerInfoloading: state.category.sellerInfoloading,
    supplierDataloading: state.category.supplierDataloading,
    businessDetails: state.category.businessDetails,
    mobileNumber: state.category.mobileNumber,
    cartData: state.cart.cartData,
    productDataloading: state.category.productDataloading,
  };
};

export default connect(mapStateToProps, null)(Success);
