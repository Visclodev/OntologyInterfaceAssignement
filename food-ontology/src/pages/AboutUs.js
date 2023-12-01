import * as React from 'react';
import ontoodLogo from "../index/bandeau-ontood.jpg"
import "../stylesheet/Aboutus.css";
import picture1 from "../index/picture1.jpg"
import picture2 from "../index/picture2.png"
import picture3 from "../index/ontood-logo.jpg"
import picture4 from "../index/ontood-logo.jpg"

function AboutUs() {
    return (
      <div>
        <img
            src={ontoodLogo}
            alt="ontood logo"
            style={{width: "100%"}} />
        <h className="title">ABOUT US</h>
        <div style={{marginTop: "4%"}}>
          <img
            src={picture1}
            alt="picture1"
            style={{width: 200, height: 200, borderRadius: 200/ 2}} />
          <img
            src={picture2}
            alt="picture2"
            style={{width: 200, height: 200, borderRadius: 200/ 2, marginLeft: "15%"}} />
          <img
            src={picture3}
            alt="picture3"
            style={{width: 200, height: 200, borderRadius: 200/ 2, marginLeft: "15%"}} />
            <img
            src={picture4}
            alt="picture4"
            style={{width: 200, height: 200, borderRadius: 200/ 2, marginLeft: "15%"}} />
       </div>
       <div style={{marginTop: "1%"}}>
          <h> Chloé Lere </h>
          <h style={{marginLeft: "21%"}}> Gyzem Yilmaz </h>
          <h style={{marginLeft: "21%"}}> Clovis Schneider </h> 
          <h style={{marginLeft: "20%"}}> Alijona Samuelsson </h>
       </div>
       <div style={{marginTop: "5%", marginLeft: "10%", marginRight: "10%"}}>  
          <p>
            In the project we will work in groups. After the project we will gain more practical experience with knowledge representation, ontology and the Semantic Web technologies and knowledge graphs, and also should get a good understanding of the possibilities and limitations of these technologies in certain types of applications.
            We should build a meaningful application using technologies, such as ontologies, semantic web technologies, and using linked data or knowledge graphs. 
          </p>
       </div>
      </div>
    );
}
  
export default AboutUs;
  