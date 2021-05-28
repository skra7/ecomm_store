import React, { useEffect } from "react";
import "./Orders.css";
import * as OrderAction from "../../store/actions/OrdersAction";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "1em",
    backgroundColor: "white",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Orders = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const id = props.match.params.id;

useEffect(()=>{
props.showBackdrop(true)
props.FetchOrders(props.sellerInfos.userId);
},[])
let data = [];
  data = Array.from(props.userorder).reverse();
  setTimeout(() => {
    if (props.status === 200) {
      props.showBackdrop(false);
     
      props.SetStatus();
    }
  }, 1500);
  
  
  
  if (props.error) {
    props.showSnackbar("Problem submitting data", "error");
    props.showBackdrop(false);
    if (props.error.response.status === 401) {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("number");
      localStorage.removeItem("webUser");
      history.push({pathname:`/login`,state:{redirectTo:'/Orders'}});
    }
    props.SetStatus();
  }

  const handleMoreDetails = (orderId, productList, total,name,address,date,status,statusCode,deliveryCharge) => {
    history.push({
      pathname: `/Orders/${orderId}`,
      state: {
        id: orderId,
        productList: productList,
        total: total,
        name:name,
        address:address,
        date:date,
        status:status,
        statusCode:statusCode,
        paramId:id,
        deliveryCharge:deliveryCharge
      },
    });
  };
  return (
    <>
      {data.length>0?data.map((item) => {
        return (
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                <i>
                  {" "}
                  <span
                    style={{
                      backgroundColor: "#f5f5f5",
                      borderRadius: "5px",
                      fontWeight: "700",
                    }}
                  >
                    {" "}
                    OrderId&nbsp;#{item.invoiceId}
                  </span>
                </i>
              </Typography>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography className={classes.pos} color="textSecondary">
                  <span style={{ borderRadius: "5px", fontWeight: "700" }}>
                    {" "}
                    status :{item.status}
                  </span>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  <span style={{ borderRadius: "5px", fontWeight: "700" }}>
                    {" "}
                    {new Date(item.date).toDateString()}
                  </span>
                </Typography>
              </div>
              <Typography className={classes.pos} color="textSecondary">
                <span style={{ borderRadius: "5px", fontWeight: "700" }}>
                  {" "}
                  {item.productList.length} &nbsp; items
                </span>
              </Typography>
              {item.productList.map((names,index) => {
                return (
                  <>
                      <span style={{ letterSpacing:'0.04em',whiteSpace:'pre-wrap',overflowWrap:'break-word'}}>
                      {(index? ',':'')+names.name}
                    </span>
                  </>
                );
              })}
            </CardContent>
            <span
              style={{
                position: "relative",
                top: "22%",
                left: "2.5%",
                fontSize: "14px",
              }}
            >
              <Typography variant="body2" component="p">
              <strong>&#42;Inclusive of All Charges</strong><br/>
                {item.deliveryCharge>0?<strong> Total:&#8377;{item?.totalAmount+item?.deliveryCharge}</strong>:
                <strong> Total:&#8377;{item?.totalAmount}</strong>
                }
              </Typography>
            </span>
            <p
              onClick={() =>
                handleMoreDetails(
                  item._id, 
                  item.productList, 
                  item.totalAmount,
                  item.userName,
                  item.userAddress,
                   item.date,
                  item.status,
                  item.statusCode,
                  item.deliveryCharge)
              }
              className="more_details"
            >
              More Details
              <ArrowRightIcon />
            </p>
          </Card>
        );
      }):<center><h3>No Orders Yet</h3></center>}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    sellerInfos: state.category.sellerInfo,
    userorder: state.order.Orders,
    status: state.order.status,
    error:state.order.error
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    FetchOrders: (sellerId) => dispatch(OrderAction.UserOrders(sellerId)),
    SetStatus:()=>dispatch(OrderAction.SetStatus())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
