import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const WeedingCountdown = ({ endDate }) => {
  const calculateTimeLeft = () => {
    const difference = +endDate - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <section id="countdown" className="block services-block">
      <Container fluid>
        <div className="title-holder">
          <h2>Countdown</h2>
          <div className="subtitle">Can’t wait to celebrate with you</div>
        </div>
      </Container>
      <Container className="countdown-container">
        <Row>
          <Col>
            <div className="countdown-item countdown-days" >
              <span className="countdown-value">{days}</span>
              <span className="countdown-label">Days</span>
            </div>
          </Col>
          <Col>
            <div className="countdown-item">
              <span className="countdown-value">{hours}</span>
              <span className="countdown-label">Hours</span>
            </div>
          </Col>
          <Col>
            <div className="countdown-item">
              <span className="countdown-value">{minutes}</span>
              <span className="countdown-label">Minutes</span>
            </div>
          </Col>
          <Col>
            <div className="countdown-item">
              <span className="countdown-value">{seconds}</span>
              <span className="countdown-label">Seconds</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default WeedingCountdown;


