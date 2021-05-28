
import React from 'react';
import "./Footer.css";
import { connect } from 'react-redux'
function Footer(props) {
    return (
        <nav className="footer" style={{zIndex:'99'}}>
            <div className="footer__content">
                <div className="footer__left">
                    <a href><p className="footer__leftTitleName">{props.businessDetails?.businessName}</p></a>
                    <a href><p className="footer__leftTitleAddress">{props.businessDetails?.address}</p></a>
                    <a href><p className="footer__leftTitleTime">{props.mobileNumber}</p></a>
                </div>

                <div className="footer__right">
                    {/* <div>
                        <a href><p className="footer__rightTitle">Managed by Dukandar </p></a>
                    </div> */}
                    <div className="footer__rightLogo">
                        {props.businessDetails?.profilePic ? (
        <img
        style={{
            position:'absolute',
          width: "70px",
          height: "70px",
          objectFit: "fill",
          right:'2.5%',
       
          borderRadius: "10px",
        }}
          alt=""
          src={props.businessDetails?.profilePic}
        />
      ) : null}<br/>
                    </div>
                </div>
            </div>
            <div className="footer__center">
                © Dukandar | 2021
            </div>
        </nav>
    )
}
const mapStateToProps = (state) => {
    return {


        supplierDataloading: state.category.supplierDataloading,
        businessDetails: state.category.businessDetails,
        mobileNumber: state.category.mobileNumber,
    };
};


export default connect(mapStateToProps, null)(Footer);