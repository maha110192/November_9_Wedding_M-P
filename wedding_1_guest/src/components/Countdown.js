import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Countdown = ({ endDate }) => {
  const { t } = useTranslation();

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
          <h2>{t('countdownTitle')}</h2>
          <div className="subtitle">{t('countdownSubtitle')}</div>
        </div>
      </Container>
      <Container className="countdown-container">
        <Row>
          <Col>
            <div className="countdown-item countdown-days">
              <span className="countdown-value">{days}</span>
              <span className="countdown-label days">{t('days')}</span>
            </div>
          </Col>
          <Col>
            <div className="countdown-item">
              <span className="countdown-value">{hours}</span>
              <span className="countdown-label hours">{t('hours')}</span>
            </div>
          </Col>
          <Col>
            <div className="countdown-item">
              <span className="countdown-value">{minutes}</span>
              <span className="countdown-label minutes">{t('minutes')}</span>
            </div>
          </Col>
          <Col>
            <div className="countdown-item">
              <span className="countdown-value">{seconds}</span>
              <span className="countdown-label seconds">{t('seconds')}</span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Countdown;
