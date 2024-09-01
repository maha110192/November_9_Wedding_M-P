import { Container } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DressCode = () => {
  return (
      <section id="dressCode" className="block services-block">
      <Container fluid>
        <div className="title-holder" id="title-confirm">
          <h2>IMPORTANT EVENT INFORMATION</h2><br/>
          {/* <div className="subtitle"></div> */}
        </div>
        <div className="sub-dresscode">
          {/* <h3>DRESS CODE</h3> */}
          <div className="subtitle"><h2>Dress Code</h2>
          <p>- Formal (suit or long dress) -</p>
          <div className="dressIcon"></div>
          </div>
        </div>
        <div className="sub-dresscode">
          {/* <h3>Event Policies</h3> */}
          <div className="subtitle"><h2>No Children</h2>
          <p>- Please note that the event is designed for adults, and we respectfully request no children -</p>
          <div className="kidsIcon"></div>
              </div>
          <div className="subtitle"><h2>No Smoking</h2>
          <p>- Smoking will be strictly forbidden during the entire duration of the event, both indoors and outdoors -</p>
          <div className="smokingIcon"></div>
              </div>
        </div>
      </Container>
      </section>
  );
};

export default DressCode;
