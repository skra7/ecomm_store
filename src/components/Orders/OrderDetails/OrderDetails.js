import React from "react";
import ClearIcon from "@material-ui/icons/Clear";
import GetAppIcon from "@material-ui/icons/GetApp";
import DeliveryTracking from '../../../UI/DeliveryTracking/DeliveryTracking'
import "./OrderDetails.css";

const OrderDetails = (props) => {
  const orderId = props.location.state.id || '';
  const productList = props.location.state.productList || '';
  const total = props.location.state.total || '';
  const name=props.location.state.name || '';
  const address=props.location.state.address || '';
  const date=props.location.state.date || '';
  const status=props.location.state.status;
  const statusCode=props.location.state.statusCode;
  const DeliveryCharge=props.location.state?.deliveryCharge||0;
React.useEffect(()=>{
 window.scrollTo(0,0)
},[])
  return (
    <>
      <div className="OrderDetails">
        Order ID <i>#{orderId}</i>
        <hr />
        <section className="Orderheader">
        <a href={`https://dukandar.s3.ap-south-1.amazonaws.com/online_receipt/${orderId}.jpg`} target="_blank">Download Invoice</a>
          <GetAppIcon />
        </section>
  <p style={{display:'flex',marginTop:'2em',justifyContent:'flex-end'}}>{new Date(date).toDateString()}</p>
        {productList.map((item) => {
          return (
            <>
          
              <section className="Products">
                <div>
              <span> <strong> {item.name}</strong></span><br/>
                <img
                  src={
                    item.imageUrl?.split(",")[0]
                      ? item.imageUrl?.split(",")[0]
                      : "/icon.jpg"
                  }
                  alt=""
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "8px",
                    objectFit: "fill",
                  }}
                />
                </div>
                <p style={{ display: "flex", alignItems: "center",wordBreak:'break-word' }}>
                <span style={{display:'flex',wordBreak:'break-word'}}>  &#8377;{item.price}</span>
                  <ClearIcon />
                  {item.qty}
                </p>
                <p style={{ display: "flex" ,wordBreak:'break-word'}}>
                  &nbsp;&#8377;{parseInt(item.price) * parseInt(item.qty)}
                </p>
              </section>
            </>
          );
        })}
        <br />
        {DeliveryCharge>0?<strong>&#42;Delivery charge of  &#8377;{DeliveryCharge} is included in the total amount</strong>:<strong>&#42;This order was qualified for free shippping</strong>}
        <hr />
        <section style={{ display: "flex", justifyContent: "center" }}>
          <h3>Total : &#8377; {total+DeliveryCharge} </h3>
        </section>
        <hr />
        <section className="DeliveryTrack">
          <DeliveryTracking status={status} statusCode={statusCode} id={props.paramId} date={date} />
        </section>
        <section className="Deliveryheader">
          <h3 style={{color:'black'}}>Delivery Address</h3>
          <div className="DeliveryAddress">
      <h2 style={{fontSize:'17px'}}>{name}</h2>
      <p>{address?.substr(0,address?.length-11)}</p>
      <p>{address?.substr(address?.length-11,address?.length)}</p>
      </div>
        </section>
      </div>
    </>
  );
};

export default OrderDetails;
