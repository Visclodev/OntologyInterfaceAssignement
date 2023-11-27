import * as React from 'react';
import ontoodLogo from "../index/bandeau-ontood.jpg"
import "../stylesheet/Aboutus.css";

function AboutUs() {
    return (
      <div>
        <img
            src={ontoodLogo}
            alt="ontood logo"
            style={{width: "100%"}} />
        <h className="title">ABOUT US</h>
      </div>
    );
}
  
export default AboutUs;
  