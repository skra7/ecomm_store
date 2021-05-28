import React from 'react';
import "./Verify.css";
import { ReactComponent as Logo } from "../../Logo/Logo_1.svg";
import Button from "@material-ui/core/Button";
import * as VerifyActions from '../../store/actions/AuthAction'
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';


function Verify(props) {
    const number = props.location.state.number || 0;
    const countryCode = props.location.state.countryCode || "";;
    const [counter, setCounter] = React.useState(30);
    const history=useHistory();

    const [OTP, setOTP] = React.useState("");

    const OTPChange = (event) => {
        setOTP(event.target.value);

    }
    React.useEffect(() => {
        const timer =counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
      }, [counter]);
      
      const resend=(event)=>{ 
          event.preventDefault();
          setCounter(30);
          if(props.location.state.number.length === 10) {
        
           var resendData = {
                countryCode : "+91",
                numberWithOutCountryCode :props.location.state.number
              };
             props.onResend(resendData);
            
        }
        else {
            props.showSnackbar("Mobile number is invalid", "error");
        }
            
      }
  
   if(props.resenderror)
   {
    props.showSnackbar(props.resenderror, "error");
   }
    const submit = (event) => {
        event.preventDefault();
        event.preventDefault();
       
        if(OTP.length === 4) {
           
            var verifydata = {
                countryCode : countryCode,
                numberWithOutCountryCode : number,
                OTP : OTP
              };
            props.onVerify(verifydata)
        }
        else {
            props.showSnackbar("Invalid OTP", "error");
    
        }
    }
    
    if (props.verifystatus === 200) {
    
     localStorage.setItem("isLogin", true);
     localStorage.setItem("number", number);
     localStorage.setItem("webUser", JSON.stringify(props.verifydata));
    

     history.push(`${props.location.state.redirectTo}`);
     props.onSetStatus()
   
    }
    if(props.verifyerror)
    {
      props.showSnackbar("Enter OTP Again", "error");
      props.onSetStatus()
    }
    return (
        <form className="login__page">
            <div className="login__pageLogo">
                <Logo />
            </div>
            <div className="login__pageText">
                <h3>OTP verification </h3>
            </div>
    <div className="login__pageMessage"> Enter OTP sent to &nbsp;<strong> {countryCode}-{number}</strong>
            </div>
            <div className="login__pageMessageChange "><Button className="login__pageRequestButtonButton" onClick={() => history.push(`/login`)}>
            Go Back
            </Button>
            </div>
            <div className="login__pageInput">
                <input value={OTP} onChange={OTPChange} placeholder=" * * * * "></input>
               
            </div>
           <div>
          
               </div>
            <div className="login__pageRequestButton">
          
                <Button type="submit" onClick={submit} className="login__pageRequestButtonButton" variant="contained">
                    VERIFY
                </Button>
                
            </div>
           
            <div className="login__pageMessageResend"> <br/>{counter<=0?<Button   type="submit" className="login__pageRequestButtonButton" onClick={resend} variant="contained" >
                    RESEND
    </Button>:<Button type="submit"  disabled onClick={resend} >
                    RESEND
    </Button>}
    <div style={{textAlign:'center',margin:'20px auto'}}><strong>&nbsp;Time left  :&nbsp;{counter}</strong> 
                    </div>
            </div>
        </form>
    )
}
const mapStateToProps=(state)=>{
  return{
verifystatus:state.auth.verifystatus,
verifyerror:state.auth.verifyerror,
resendstatus:state.auth.resendstatus,
resenderror:state.auth.resenderror,
verifydata:state.auth.verifydata
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
     onVerify:(verifydata)=>dispatch(VerifyActions.verifyOtp(verifydata)),
     onResend:(resendData)=>dispatch(VerifyActions.resendOtp(resendData)),
     onSetData:(authData)=>dispatch(VerifyActions.AuthData(authData)),
     onSetStatus:()=>dispatch(VerifyActions.AuthStatus())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Verify)
