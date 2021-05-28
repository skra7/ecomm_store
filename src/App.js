import React, { Suspense } from "react";
import "./App.css";
import Orders from "./components/Orders/Orders";
import MenuIcon from "@material-ui/icons/Menu";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./UI/Header/Header";
import Footer from "./UI/Footer/Footer";
import { connect } from "react-redux";
import BackDrop from "./UI/commons/BackDrop";
import OrderDetails from "./components/Orders/OrderDetails/OrderDetails";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import Verify from "./components/Verify/Verify";
import Detail from "./components/Details/Detail";
import SnackBarAlert from "./UI/commons/SnackBar";
import Typography from "@material-ui/core/Typography";
import Address from "./components/Address/Address";
import EditAddress from "./components/EditAddress/EditAddress";
import ManageAddress from "./components/ManageAddress/ManageAddress";
import CheckoutInfo from "./components/CheckoutInfo/CheckoutInfo";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
const Home = React.lazy(() => import("./components/Home/Home"));
const Success = React.lazy(() => import("./components/Success/Success"));

const theme = createMuiTheme({
  palette: {
    background: "#00c8c8",
    footer: "#666",
    color3: "#373F51",
    color4: "#eeeeee",
    color5: "#ffffff",
  },
  typography: {
    fontFamily: "Montserrat",
  },
});

function App(props) {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setsnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("");
  const [backdropOpen, setBackdropOpen] = React.useState(false);

  const showBackdrop = (val) => {
    setBackdropOpen(val);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarOpen(true);
    setsnackbarMessage(message);
    setSnackbarSeverity(severity);
    return false;
  };

  return (
    <>
      {props.businessDetails ? (
        <>
          {" "}
          <Helmet>
            <title>{props.businessDetails?.businessName}</title>
            <meta
              name="description"
              content={props.businessDetails?.businessName}
            />
            <meta name="theme-color" content="#008f68" />
            <meta
              property="og:image"
              content={`${props.businessDetails?.profilePic}`}
            />
          </Helmet>
          <Typography>
            <MuiThemeProvider theme={theme}>
              <SnackBarAlert
                open={snackbarOpen}
                setOpen={setSnackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                showSnackbar={showSnackbar}
              />
              <BackDrop open={backdropOpen} />

              <Router>
                <Header
                  showSnackbar={showSnackbar}
                  showBackdrop={showBackdrop}
                />
                <Suspense fallback={<BackDrop open={true} />}>
                  <div className="app">
                    <Switch>
                      <Route
                        path="/login"
                        exact
                        render={(props) => (
                          <React.Fragment>
                            {/* <Header {...props} /> */}
                            <Login
                              {...props}
                              key={props.location.key}
                              showSnackbar={showSnackbar}
                              showBackdrop={showBackdrop}
                            />
                            {/* // <Footer /> */}
                          </React.Fragment>
                        )}
                      ></Route>
                      <Route
                        path="/verify"
                        exact
                        render={(props) => (
                          <React.Fragment>
                            {/* <Header {...props} /> */}
                            <Verify
                              {...props}
                              key={props.location.key}
                              showSnackbar={showSnackbar}
                              showBackdrop={showBackdrop}
                            />
                          </React.Fragment>
                        )}
                      ></Route>
                      <Route
                        path="/editAddress"
                        exact
                        render={(props) => (
                          <React.Fragment>
                            {/* <Header {...props}/> */}
                            <EditAddress
                              {...props}
                              key={props.location.key}
                              showSnackbar={showSnackbar}
                              showBackdrop={showBackdrop}
                            />
                          </React.Fragment>
                        )}
                      ></Route>
                      <Route
                        path="/manageAddresses"
                        exact
                        render={(props) => (
                          <React.Fragment>
                            {/* <Header {...props}/> */}
                            <ManageAddress
                              {...props}
                              key={props.location.key}
                              showSnackbar={showSnackbar}
                              showBackdrop={showBackdrop}
                            />
                          </React.Fragment>
                        )}
                      ></Route>
                      <Route
                        exact
                        path="/Orders/:orderId"
                        exact
                        render={(props) => (
                          <React.Fragment>
                            <OrderDetails
                              {...props}
                              key={props.location.key}
                              showSnackbar={showSnackbar}
                              showBackdrop={showBackdrop}
                            />
                          </React.Fragment>
                        )}
                      ></Route>
                      <Route
                        path="/Orders"
                        exact
                        render={(props) => (
                          <React.Fragment>
                            {/* <Header {...props}/> */}
                            <Orders
                              {...props}
                              key={props.location.key}
                              showSnackbar={showSnackbar}
                              showBackdrop={showBackdrop}
                            />
                          </React.Fragment>
                        )}
                      ></Route>
                      <Route
                        path="/product/:id"
                        exact
                        render={(props) => (
                          <React.Fragment>
                            {/* <Header {...props} /> */}
                            <Detail
                              {...props}
                              key={props.location.key}
                              showSnackbar={showSnackbar}
                              showBackdrop={showBackdrop}
                            />
                          </React.Fragment>
                        )}
                      ></Route>
                      <Route
                        path="/checkout"
                        exact
                        render={(props) => (
                          <React.Fragment>
                            <Checkout
                              {...props}
                              key={props.location.key}
                              showSnackbar={showSnackbar}
                              showBackdrop={showBackdrop}
                            />
                          </React.Fragment>
                        )}
                      ></Route>
                      <Route
                        path="/checkoutinfo"
                        exact
                        render={(props) => (
                          <React.Fragment>
                            {/* <Header {...props} /> */}
                            <CheckoutInfo
                              {...props}
                              key={props.location.key}
                              showSnackbar={showSnackbar}
                              showBackdrop={showBackdrop}
                            />
                          </React.Fragment>
                        )}
                      ></Route>
                      <Route
                        path="/address"
                        exact
                        render={(props) => (
                          <React.Fragment>
                            {/* <Header {...props} /> */}
                            <Address
                              {...props}
                              key={props.location.key}
                              showSnackbar={showSnackbar}
                              showBackdrop={showBackdrop}
                            />
                          </React.Fragment>
                        )}
                      ></Route>
                      <Route
                        path="/success"
                        exact
                        render={(props) => (
                          <React.Fragment>
                            {/* <Header {...props} /> */}
                            <Success
                              {...props}
                              key={props.location.key}
                              showSnackbar={showSnackbar}
                              showBackdrop={showBackdrop}
                            />
                          </React.Fragment>
                        )}
                      ></Route>
                      <Route
                        exact
                        path="/"
                        render={(props) => (
                          <React.Fragment>
                            {/* <Header {...props} /> */}

                            <Home
                              {...props}
                              key={props.location.key}
                              showSnackbar={showSnackbar}
                              showBackdrop={showBackdrop}
                            />
                          </React.Fragment>
                        )}
                      />
                    </Switch>
                  </div>
                </Suspense>
                <Footer />
              </Router>
            </MuiThemeProvider>
          </Typography>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "1em auto 1em auto",
            }}
          >
            <img src="/icon.jpg" style={{ height: "200px", width: "250px" }} />
            <span
              style={{
                fontWeight: "700",
                display: "flex",
                marginTop: "1em",
                textAlign: "center",
                color: "red",
              }}
            >
              {" "}
              <a
                style={{ color: "red" }}
                href="http://bit.ly/GetDukandar"
                target="_blank"
              >
                {" "}
                Please Visit The Mobile App And Add your Business Details{" "}
              </a>{" "}
            </span>
            <ul style={{ margin: "1em" }} className="error">
              <strong>STEPS TO UPDATE PROFILE</strong>
              <br />
              <li>Open Your Mobile Application</li>
              <li>
                Tap on the Top most left Menu button &nbsp;
                <MenuIcon
                  style={{
                    fontSize: "17px",
                    backgroundColor: "green",
                    color: "white",
                  }}
                />
              </li>
              <li>Click on Account </li>
              <li>Enter Your Business Name</li>
              <li>Then Open the Website Again In a New Window</li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    sellerInfos: state.category.sellerInfo,
    businessDetails: state.category.businessDetails,
  };
};
export default connect(mapStateToProps, null)(App);
