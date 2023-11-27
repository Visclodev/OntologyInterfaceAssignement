import * as React from 'react';
import {  Link } from "react-router-dom";
import "../stylesheet/TopBar.css"
import ontoodLogo from "../index/ontood-logo.jpg"

function TopBar() {
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1%", 
            backgroundColor: "#fcf4ff",
            boxShadow: "10px 5px 5px #f9f2fb"}} >
            <div style={{ marginLeft: "2vw" }}>
                {/*<strong style={{ fontSize: "1.8rem" }}>ontood.</strong>*/}
                <img
                src={ontoodLogo}
                alt="ontood logo"
                style={{  width: '75px' }} />
            </div>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }} >
                <li className="underLine2 hide_on_responsive">
                    <Link to="/">ONTOLOGY</Link>
                </li>
                <li className="underLine2 hide_on_responsive">
                    <Link to="/aboutUs">ABOUT US</Link>
                </li>
            </div>
        </div>
    );
}
export default TopBar;