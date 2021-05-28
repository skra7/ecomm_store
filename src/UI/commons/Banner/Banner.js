import React from 'react'
import './Banner.css'
const Banner=(props)=>{
    return (
        <>
         <div className="banner">
             {props.logo ? (
        <img
        style={{
          position: "relative",
          width: "15%",
          height: "180%",
          borderRadius:"4px",
          objectFit: "fill",
          marginLeft:"0.2em",
          zIndex:2
        }}
          alt=""
          src={props.logo}
        />
      ) : null}
      
             </div>
             <div className="scroll-left">
         {props.delivery?<p style={{color:'#777',fontSize:'18px', fontFamily : 'sans-serif', fontWeight: '700', fontStyle : 'italic'}}>Welcome to {props.businessName}, Delivery is Free above Orders Of &#8377; {props.delivery}</p>:
         <p style={{color:'#777',fontSize:'18px', fontFamily : 'sans-serif', fontWeight: '700', fontStyle : 'italic'}}>Welcome to {props.businessName}</p>}

          </div>
        </>
    )
}

export default Banner
