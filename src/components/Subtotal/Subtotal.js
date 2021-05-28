import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

function Subtotal(props) {
  const history = useHistory();
  const checkOut = () => {
    const login = localStorage.getItem("isLogin") || false;
    if (login) {
      history.push({
        pathname: `/checkoutinfo`,
        state: {
          cartTotal: props.cartTotal,
          delivery: props.delivery,
          deliveryUpto: props.deliveryUpto,
        },
      });
    } else {
      history.push(
        {
          pathname:'/login',
          state:{
           redirectTo: '/checkout',
           
          }
        }
        
      );
    }
  };
  var deliveryUpto = parseFloat(props.deliveryUpto);
  var cartTotal = props.cartTotal.toFixed(2);
  var delivery = 0;
  if (props.delivery > 0) {
    delivery = parseFloat(props.delivery);
  }

  return (
    <div
      className="subtotal"
      style={{ backgroundColor: "#34c289", color: "#fff" }}
    >
      {/* Price */}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({props.cartData.length} items) :
              <strong>&#8377; {`${value}`}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={props.cartTotal}
        displayType={"text"}
        thousandSeparator={true}
      />
      {delivery ? (
        <CurrencyFormat
          renderText={(value) => (
            <>
              <p>
                Delivery :
                {cartTotal < deliveryUpto ? (
                  <strong>&#8377; {`${value}`}</strong>
                ) : (
                  <s>
                    <strong>&#8377; {`${value}`}</strong>
                  </s>
                )}
              </p>
            </>
          )}
          decimalScale={2}
          value={props.delivery}
          displayType={"text"}
          thousandSeparator={true}
        />
      ) : null}
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Total Amount :<strong>&#8377; {`${value}`}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={
          parseFloat(cartTotal) < parseFloat(deliveryUpto)
            ? parseFloat(cartTotal) + parseFloat(delivery)
            : parseFloat(props.cartTotal)
        }
        displayType={"text"}
        thousandSeparator={true}
      />
      <button
        onClick={(event) => {
          event.preventDefault();
          checkOut();
        }}
      >
        <Typography>Proceed to Checkout</Typography>
      </button>
    </div>
  );
}

export default Subtotal;
