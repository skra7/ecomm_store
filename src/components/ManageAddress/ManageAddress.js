import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
import "./ManageAddress.css";
import Radio from '@material-ui/core/Radio';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import LanguageIcon from '@material-ui/icons/Language';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as CheckoutAction from '../../store/actions/CheckoutAction'
import * as AddressAction from '../../store/actions/AddressAction'
import { connect } from 'react-redux'
import "../Subtotal/Subtotal.css";
import { ExpandLess } from "@material-ui/icons";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const useStyles = makeStyles((theme) => ({
  root: {
    minheight: "100vh",
    backgroundColor: '#fbfbf8'
  },
  image: {
    backgroundImage: "",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    // margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "400px"
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),

  },
  Color: {
    color: "#31de79",
  },
  managesubmit: {
    backgroundColor: "#31de79",
    color: "white",
    float: "right",
    marginRight: "7rem"

  },

  confirm: {
    backgroundColor: "#36cfca",
    color: "white",
    display: "flex",
    marginleft: "10px",
    marginBottom: "10px",
    justifyContent: "center",
    position: 'fixed',
    bottom: theme.spacing(5),
    fontWeight: 700,
    height: '40px',
    letterSpacing: 1,
    borderRadius: '20px',
    zIndex: 100



  },
  paperbg: {
    // backgroundImage : `url(${"/addressadd.png"})`,

  },
  hidden: { display: "none" },
}));

function ManageAddress(props) {
  const classes = useStyles();
  const history = useHistory();
  const[ItemtoShow,setItemToshow]=React.useState(3);
  const [more,setMore]=React.useState(false)
  const [varState, setVarState] = React.useState("");
  
  const id = props.sellerInfos.shopUrlString;
  React.useEffect(() => {
    props.onfetchaddress();
  }, [])

  const handleAddress = (event) => {
    event.preventDefault();
    history.push({
      pathname: `/address`,
      state:{locate:'/manageAddresses'},
      
     
    });
  };
  const deletes = (addressId) => {
    confirmAlert({
      title: 'Delete Address',
      message: 'Are you sure you want to delete this address.',
      buttons: [
        {
          label: 'No',
          onClick: () => null
        },
        {
          
          label: 'Yes',
          onClick: () => handleDelete(addressId)
        }
      ]
    });
  };
  const handleDelete=(addressId)=>{
    let addressid={
      id:addressId
    }
props.onDeleteAddress(addressid)
props.showBackdrop(true)
  }
  if(props.deletestatus===200)
  {
    props.showBackdrop(false);

    props.onSetAddresssStatus();


  }
  if(props.deleteerror)
  {
    props.showSnackbar(" Please Login Again","error");
    props.onsetAddressError();
    if(props.deleteerror.response.status === 401||props.deleteerror.response.status === 500) {
      localStorage.removeItem('isLogin')
      localStorage.removeItem('number');
      localStorage.removeItem('webUser');
      history.push({
        pathname:'/login',
        state:{
          redirectTo:'/manageAddresses'
        }
      });
      window.location.reload(false)
    }
    props.showBackdrop(false);
  }

  if(props.updatestatus===200)
  {
    props.showBackdrop(false);

    props.onSetAddresssStatus();


  }

  const editAddress = (ids, fullName, addressLine1, addressLine2, city, pin, type) => {

    history.push({
      pathname: `/editAddress`,
      state: {
        addressId: ids,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        city: city,
        pin: pin,
        type: type,
        fullName: fullName,
        locate:'/manageAddresses'

      }
    });
  };

  const handleChange = (event) => {
    event.preventDefault();
    setVarState(event.target.value);
  };

  
  const webUser = props.authData.webUser;

  if (props.status === 200) {
    props.showBackdrop(false);

    history.push({
      pathname: `/success`, state: {
        data: props.checkoutLocation
      }
    })

  }
  if (props.error) {
    props.showSnackbar("Cart Checkout Failed", "error");
    props.showBackdrop(false);
  }
 const showMore=()=>{
    if(ItemtoShow===3)
    { 
      setItemToshow(props.checkoutAddress.length)
      setMore(true)
    }
    
    else{
      setItemToshow(3)
       setMore(false);
    }
  }
  return (
    <Grid container component="main" className={classes.root}>

      <CssBaseline />

      <Grid container spacing={1}
        alignItems="center"
        justify="center"
        style={{ minHeight: "0vh" }}
      >
       

        <Grid item xs={12} sm={6} md={4} component={Paper} className={props.checkoutAddress.length > 0 ? "" : classes.paperbg} elevation={6} square >
          <div className={classes.paper}>
        
            <form
              className={classes.form}
              noValidate
              onSubmit={(e) => e.preventDefault()}
            >


              <Button
                size="small"
                variant="contained"
                className={classes.managesubmit}
                onClick={handleAddress}
              >
                <AddIcon /> Add Address
            </Button>
              <br />
          
              {
                
                props.checkoutAddress?.length > 0 ? (
                 
                  props.checkoutAddress?.slice(0,ItemtoShow).map((address) => (
                  <div>
                    <div key={address.id} className="radioManageAddress MoreWrap">
                     
                      <div className="address_details">
                        <h4>{address.fullName}</h4>
                        <p className="radioAddress__fullAddress">{address.addressLine1 + " " + address.addressLine2 + "," + address.city}</p>
                        <strong><p>{"Pin :" + address.pin}</p></strong>
                        <div style={{ display: 'flex', marginLeft: '80px' }}>
                            <p onClick={() => editAddress(address.id, address.fullName, address.addressLine1, address.addressLine2, address.city, address.pin, address.type)} style={{ marginTop: '0.8em', fontSize: '14px', fontWeight: '700', letterSpacing: '1px', color: "#bd5563" }}>
            
                                EDIT
                                </p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <p onClick={() => deletes(address.id)} style={{ marginTop: '0.8em', fontSize: '14px', fontWeight: '700', letterSpacing: '1px', color: "#bd5563" }}>
                             
                                DELETE
                                </p>
                          </div>
                      </div>
                      <div className="addressLabel">
                        {
                          address.type === "Home" ? (
                            <div >
                              <HomeRoundedIcon style={{ color: "#91c9c6" }} />
                                      
                            </div>
                          ) : address.type === "Business" ? (
                            <div>
                              <BusinessCenterIcon style={{ color: "#97afba" }} />
                                       
                            </div>
                          ) : (
                                <div>
                                  <LanguageIcon style={{ padding: 0, color: "#97afba" }} />
                                       
                                </div>
                              )
                        }

                      </div>

                    </div>
                    </div>
                
                  )
                  )
                ) : (

                    <div className="addAddress">
                      <img src="/addressadd.png" alt="" />
                      <Typography component="h1" variant="h5">Add Address to Continue</Typography>
                    </div>
                  )
              }
              

  
              <a className="btn btn-primary" onClick={showMore}>
  {
  
props.checkoutAddress?.length>3? more ? (
   <span className="show">Show less <ExpandLess /></span>
  ) : (
 <span className="show">Show more <ExpandMoreIcon/></span>
  ):null}
</a>

            </form>
          </div>

        </Grid>
       

      </Grid>
    </Grid>
  );
}
const mapStateToProps = (state) => {
  return {
    cartData: state.cart.cartData,
    checkoutAddress: state.address.checkoutAddress,
    supplierId: state.category.supplierId,
    status: state.checkout.status,
    checkoutLocation: state.checkout.checkoutLocation,
    error: state.checkout.error,
    authData: state.auth.authData,
    sellerInfos: state.category.sellerInfo,
    updatedaddress: state.address.updatedaddress,
    updatestatus: state.address.updatestatus,
    deletestatus:state.address.deletestatus,
    deleteerror:state.address.deleteerror,
    deleteAddress:state.address.deleteAddress
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onCheckout: (data) => dispatch(CheckoutAction.checkout(data)),
    onfetchaddress: () => dispatch(AddressAction.fetchAddress()),
    onDeleteAddress:(addressId)=>dispatch(AddressAction.deleteAddress(addressId)),
    onSetAddresssStatus:()=>dispatch(AddressAction.setAddressStatus()),
    onsetAddressError:()=>dispatch(AddressAction.setAddressError())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageAddress);


