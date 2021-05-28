import React from 'react';
import "./Login.css";
import { ReactComponent as Logo } from "../../Logo/Logo.svg";
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom';
import UserProfile from '../UserProfile/UserProfile'
import * as loginAction from '../../store/actions/AuthAction'
import { connect } from 'react-redux';

function Login(props) {
    const [input, setInput] = React.useState("");
    const history = useHistory();
    const inputChange = (event) => {
        setInput(event.target.value);
    }
    const id =  props.sellerInfos.shopUrlString;
React.useEffect(()=>{
props.showBackdrop(true);
},[])
    const submit = (event) => {

        event.preventDefault();

        if (input.length === 10) {

            var logindata = {
                countryCode: "+91",
                numberWithOutCountryCode: input
            };
            props.onLogin(logindata);

        }
        else {
            props.showSnackbar("Mobile number is invalid", "error");
        }

    }
    let login = localStorage.getItem("isLogin")
    let redirect=props.location.state?.redirectTo || "/"
    if (!login) {
        if (props.status === 200) {
            props.onsetStatus();
            history.push({
                pathname: `/verify`,
                state: {
                    number: input,
                    "countryCode": "+91",
                    redirectTo:redirect
                }
            })

        }
    }

    if (props.error) {
        props.showSnackbar(props.error, "error");
        props.onsetStatus()
    }
    setTimeout(()=>{
        props.showBackdrop(false)
        },1000)
    return (
        <React.Fragment>
            {login ? <div><UserProfile showBackdrop={props.showBackdrop} /></div> : <form className="login__page">
                <div className="login__pageLogo">
                    <Logo />
                </div>
                <div className="login__pageText">
                    <h1>Login </h1>
                </div>
                <div className="login__pageMessagee"> We will send you the four digit verification code on this mobile number
            </div>
                <div className="login__pageInput">
                    <input value={input} onChange={inputChange} placeholder="Phone Number" type="number"></input>
                </div>
                <div className="login__pageRequestButton">
                    <Button type="submit" onClick={submit} className="login__pageRequestButtonButton" variant="contained">
                        REQUEST OTP
                </Button>
                </div>
                <div className="login__pageConditions">
                    By continuing, you agree <a href="http://dukandar.io/terms_condition" target="_blank">Terms of service </a>
                </div>
                {/* <div className="row">
                    <hr />
                </div> */}
            </form>}
        </React.Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
        status: state.auth.status,
        error: state.auth.error,
        sellerInfos: state.category.sellerInfo,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (logindata) => dispatch(loginAction.authentication(logindata)),
        onsetStatus: () => dispatch(loginAction.AuthStatus())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
