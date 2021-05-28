import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';
import * as OrderAction from "../../store/actions/OrdersAction";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));





 function VerticalLinearStepper(props) {
    let statusCode=props.statusCode
    function getStepContent(step) {
        switch (step) {
          case 1:
            return `on ${new Date(props.date).toLocaleString()}`;
          case 2:
            return 'Order Accepted';
           case 3:
               return 'Please Contact Store ' 
          case 4:
            return `Products Delivered Successfully`;
          default:
            return 'Unknown step';
        }
      }
    function getSteps() {
        let acceptOrCancel='';
        if(statusCode===2||4)
        {
            acceptOrCancel="Order Accepted"
        }
        if(statusCode===3)
        {
            acceptOrCancel="Order Canceled"
        }
      return ['Order Placed', acceptOrCancel,'Delivered'];
    }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(props.statusCode);
  if(activeStep===3)
  {
      setActiveStep(2)
  }
  const steps = getSteps();



  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep-1} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
         
            <StepContent>

              {props.statusCode===3?<Typography variant="caption" color="error">{getStepContent(props.statusCode)}</Typography>:<Typography>{getStepContent(props.statusCode)}</Typography>}
             
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
         
        </Paper>
      )}
    </div>
  );
}


  export default VerticalLinearStepper