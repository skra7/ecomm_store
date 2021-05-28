import React from "react";
import { connect } from 'react-redux'
import * as AddressAction from '../../store/actions/AddressAction'
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useHistory } from "react-router-dom";
import uuid from "react-uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
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
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#31de79",
    color: "white",
  },
  radio: {
    display: "flex",
    flexDirection: "row"
  },
  hidden: { display: "none" },
}));

function Address(props) {
  const id = props.sellerInfos.shopUrlString;
  const classes = useStyles();
  const history = useHistory();
  const cartTotal = props.location.state?.cartTotal || 0;
  let addressStatus = props.location.state?.addressStatus || 0;
  const delivery = props.location.state?.delivery || 0;
  const deliveryUpto = props.location.state?.deliveryUpto || 0;
  const [varState, setVarState] = React.useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    pin: "",
    type: "Other"
  });



  const handleAddress = (event) => {

    event.preventDefault();
    props.showBackdrop(true);
    if (varState.fullName.length > 2 && varState.addressLine1.length > 4 && varState.city.length > 2 && varState.pin.length > 4) {

      addressStatus = true;
      var address = {
        id: uuid(),
        fullName: varState.fullName,
        addressLine1: varState.addressLine1,
        addressLine2: varState.addressLine2,
        city: varState.city,
        pin: varState.pin,
        type: varState.type
      };
      props.onAddaddress(address)

    }

    else {
      props.showSnackbar("Please enter valid values", "error")
      props.showBackdrop(false);
    }


  };
  if (props.error) {
    props.showSnackbar("Problem submitting data", "error")
    props.showBackdrop(false);
    
    if(props.error.response.status === 401||props.error.response.status === 500) {
      localStorage.removeItem('isLogin')
      localStorage.removeItem('number');
      localStorage.removeItem('webUser');
      history.push({
         pathname:`/login`,
         state:{
           redirectTo:'/login'
         }
      });
    }
    props.onSetError();
  }

  if (props.status === 200) {
    props.showBackdrop(false);
    props.onSetStatus();
    history.push({
      pathname: `${props.location.state.locate}`,
      state: {
        cartTotal: cartTotal,
        delivery: delivery,
        deliveryUpto: deliveryUpto,


      }
    });

  }
  const handleChange = (name) => (event) => {
    setVarState({ ...varState, [name]: event.target.value });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container spacing={0}
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square >
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Enter Address
          </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={(e) => e.preventDefault()}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="fullname"
                    label="Full Name"
                    name="fullName"
                    autoComplete="fullName"
                    value={varState.fullName}
                    onChange={handleChange("fullName")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="addressline1"
                    label="Address Line 1 (min 5 characters)"
                    name="addressline1"
                    autoComplete="addressline1"
                    value={varState.addressLine1}
                    onChange={handleChange("addressLine1")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="addressline2"
                    label="Address Line 2"
                    id="addressline2"
                    autoComplete="adddressline2"
                    value={varState.addressLine2}
                    onChange={handleChange("addressLine2")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="city"
                    label="City"
                    id="city"
                    autoComplete="city"
                    value={varState.city}
                    onChange={handleChange("city")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="pincode"
                    label="Pin Code"
                    id="pincode"
                    autoComplete="pincode"
                    value={varState.pin}
                    onChange={handleChange("pin")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend" color="grey">Type</FormLabel>
                    <RadioGroup aria-label="type" name="type" value={varState.type} className={classes.radio} onChange={handleChange("type")}>
                      <FormControlLabel value="Home" control={<Radio />} label="Home" />
                      <FormControlLabel value="Business" control={<Radio />} label="Business" />
                      <FormControlLabel value="Other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                onClick={handleAddress}
              >
                Confirm
            </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
const mapStateToProps = (state) => {
  return {
    sellerInfos: state.category.sellerInfo,
    checkoutAddress: state.address.checkoutAddress,
    error: state.address.error,
    status: state.address.status
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddaddress: (address) => dispatch(AddressAction.addAddress(address)),
    onSetStatus: () => dispatch(AddressAction.setAddressStatus()),
    onSetError:()=>dispatch(AddressAction.setAddressError())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Address); 