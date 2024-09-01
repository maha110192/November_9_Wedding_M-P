import Container from "react-bootstrap/Container";
import React from "react";



export default function Gifts() {
  return (
    <section id="gifts" className="block services-block">
      <Container fluid>
        <div className="title-holder">
          <h2>WEDDING REGISTRY</h2>
          <h4><br/>Want to support our adventure?</h4>
          <div className="subtitle">
          Our greatest gift is sharing this special day with you!
            <br />
            Should you wish to offer a gift, we suggest the following options
          </div>
        </div>
      </Container>
      <Container fluid>
        <div className="gifts">
            <ul>
                <li><h4>Wedding Registry</h4><a href='https://www.amazon.ca/wedding/registry/1FH8GNM41R1RV' target='_blank'rel="noreferrer"><i className="fab fa-amazon giftIcon"></i></a></li> 
            </ul>
        </div>
        <div className="gifts">
            <ul>
                <li><br/><h4>Amazon Gift Card</h4><a href='https://www.amazon.ca/s?k=amazon+giftcard&hvadid=667095432685&hvdev=c&hvlocphy=9001536&hvnetw=g&hvqmt=e&hvrand=18002234315312005217&hvtargid=kwd-304179729572&hydadcr=23340_13656967&tag=googcana-20&ref=pd_sl_82e8vto3pn_e' target='_blank'rel="noreferrer"><i class="fa-solid fa-gift giftIcon2"></i></a></li> 
            </ul>
        </div>
      </Container>
    </section>
  );
}