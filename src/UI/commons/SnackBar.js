import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
// import Link from '@material-ui/core/Button';
// import { Config } from "../../config/config";
// import axios from 'axios';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
export default function SnackBarAlert(props) {

  
  const renderAlert = (level, message)=>{
    switch (level){
      case "success":
        return <Alert onClose={handleClose} severity="success">{message}</Alert>
      case "error":
        // if(props.resendlink) {
        //   return <Alert onClose={handleClose} severity="error">{message}<Link
        //   component="button"
        //   variant="body2"
        //   onClick={handleResendLink}
        // >
        //   Resend Link
        // </Link></Alert>
        // } 
          return <Alert onClose={handleClose} severity="error">{message}</Alert>
      default:
        return <Alert onClose={handleClose} severity="info">{message}</Alert>
    }
  }

  
//   const hostUrl = Config().hostUrl;


//   const handleResendLink = () => {
//     var apiBaseUrl = `${hostUrl}/user/v1/resend-link`;
//     var data = {
//       emailId: props.email,
//     };
//     var headers = {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//     };
//     axios
//       .post(apiBaseUrl, data, { headers: headers }, { validateStatus: false })
//       .then((response) => {
//         if (response.status === 200) {
//           console.log("Link Sent Jsx element render"); 
//           props.showSnackbar("Link Sent Successfully", "success");
//         }
//       })
//       .catch((err) => {
//         if (err.response) {
//           console.log("######", err.response);
//           var errorMessage = err.response.data.status.message;
//           props.showSnackbar(errorMessage, "error");
//         }
//       });
//   };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        props.setOpen(false);
    };
    return (
  
        <Snackbar  
            anchorOrigin={{ vertical : "top", horizontal : "center" }}
        open={props.open} autoHideDuration={5000} onClose={handleClose}>
          {renderAlert(props.severity, props.message)}
        </Snackbar>
      
    );
}