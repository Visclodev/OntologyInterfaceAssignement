import * as React from 'react';
import ontoodLogo from "../index/bandeau-ontood.jpg"
import "../stylesheet/Aboutus.css";
import picture1 from "../index/picture1.jpg"
import picture2 from "../index/picture2.png"
import picture3 from "../index/picture3.jpg"
import picture4 from "../index/picture4.jpg"

function AboutUs() {
    return (
      <div>
        <img
            src={ontoodLogo}
            alt="ontood logo"
            style={{width: "100%"}} />
        <h className="title">ABOUT US</h>
        <div style={{ display: 'flex', marginTop: "4%" }}>
          <div style={{ marginLeft: "5%", marginRight: "7%" }}>
            <img
              src={picture1}
              alt="picture1"
              style={{ width: 225, height: 225, borderRadius: 225 / 2, display: "inherit" }} />
            <h>Chloé Lere</h>
          </div>
          <div style={{ marginLeft: "7%", marginRight: "7%" }}>
            <img
              src={picture2}
              alt="picture2"
              style={{ width: 225, height: 225, borderRadius: 225 / 2 , display: "inherit"}} />
            <h>Gyzem Yilmaz</h>
          </div>
          <div style={{ marginLeft: "7%", marginRight: "7%" }}>
            <img
              src={picture3}
              alt="picture3"
              style={{ width: 225, height: 225, borderRadius: 225 / 2 , display: "inherit" }} />
            <h>Clovis Schneider</h>
          </div>
          <div style={{ marginLeft: "7%", marginRight: "7%" }}>
            <img
              src={picture4}
              alt="picture4"
              style={{ width: 225, height: 225, borderRadius: 225 / 2 , display: "inherit" }} />
            <h>Alijona Samuelsson</h>
          </div>
      </div>
     
       <div style={{marginTop: "5%", marginLeft: "10%", marginRight: "10%"}}>  
          <p>
            Our project, ONTOOD, serves as a practical exploration of knowledge representation and the semantic web technologies concepts through the lens of culinary arts. We have developed a food ontology-based platform that not only enriches our understanding of these technologies but also offers practical solutions to everyday challenges in the kitchen. This initiative aims to create a user-friendly web interface that simplifies the process of discovering, selecting, and cooking dishes based on specific preferences and constraints.
          </p>
          <p>
            Our web interface allows for the application of various constraints—from ingredients and origin to taste profiles and cooking times. This hands-on approach enables us to interact with knowledge graphs and utilize JSON to answer complex questions, such as "How can we cook meals with multiple restrictions?"
          </p>
          <p>
            The project's use cases are reducing food waste, discovering new dishes, and cooking personalized meals which are not just theoretical exercises; they are real-world applications that demonstrate the power of semantic web technologies in addressing global issues like food sustainability.
          </p>
          <p>
            In developing our platform, we have employed React to create a responsive web interface, Protégé to construct our ontology, and JSON for data querying. 
          </p>
          <p>
            Beyond a traditional recipe repository, our project seeks to empower users in engaging with food on a more meaningful level, bridging cultural diversity, individual tastes, and sustainable cooking practices.
          </p>
          
       </div>
      </div>
    );
}
  
export default AboutUs;
  