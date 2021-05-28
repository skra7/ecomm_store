import React from 'react'
import "./UserProfile.css"
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import * as Categoryaction from '../../store/actions/CategoryAction';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import Button from "@material-ui/core/Button";
function userProfile(props) {
  const logout = () => {
    localStorage.removeItem('isLogin')
    localStorage.removeItem('number');
    localStorage.removeItem('webUser');


  
    props.showBackdrop(true)
    setTimeout(()=>{
      let string = window.location.origin;
      window.open(string, "_self");
      props.onSetCategory('All');
    },500)

  }

  return (
    <>
      <div className="Profile">
        <div>Hello &nbsp;<strong> {localStorage.getItem('number')}</strong></div>
      </div>
      <div className="ProfileMenu">
      <Link to={`/Orders`}>  <h4> <LocalMallOutlinedIcon />&nbsp;Orders</h4><span className="ChevronRightIcon"><ChevronRightIcon /></span></Link>
     <Link to={`/manageAddresses`}>  <h4> <AccountCircleIcon />&nbsp;Manage Addresses</h4><span className="ChevronRightIcon"><ChevronRightIcon /></span></Link>

      </div>

      <Button style={{
          backgroundColor: "salmon",
          display:'flex',
      
          color: "#ffffff",
          fontWeight:'700',
          marginTop:'50px',
          marginLeft:'auto',
          marginRight:'auto',
          border: "1px solid",
          width: "200px",
          zIndex: "2"
        }}
          variant="contained"
          size="small"
          onClick={logout}><ExitToAppIcon />&nbsp;LOGOUT</Button>
    </>

  )
}
const mapStateToProps = (state) => {
  return {
    sellerInfos: state.category.sellerInfo,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

    onSetCategory: (category) => dispatch(Categoryaction.setcategory(category)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(userProfile);