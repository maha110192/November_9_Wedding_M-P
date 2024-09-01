import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function AppHeader(){
    return(
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">November 09, 2024</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#countdown">When</Nav.Link>
              <Nav.Link href="#wherewillbe">Where</Nav.Link>
              <Nav.Link href="#reservation">RSVP</Nav.Link>
              <Nav.Link href="#gifts">Gifts</Nav.Link>
              <Nav.Link href="#sociales">Need a service</Nav.Link>
            </Nav> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}