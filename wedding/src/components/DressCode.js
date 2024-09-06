import { Container } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from 'react-i18next';

const DressCode = () => {
  const { t } = useTranslation();

  return (
      <section id="dressCode" className="block services-block">
      <Container fluid>
        <div className="title-holder" id="title-confirm">
         <h2>{t('dressCodeTitle')}</h2>
          {/* <div className="subtitle"></div> */}
        </div>
        <div className="sub-dresscode">
          {/* <h3>DRESS CODE</h3> */}
          <div className="subtitle"><h2>{t('dressCode')}</h2>
         <p>{t('dressCodeFormal')}</p>
          <div className="dressIcon"></div>
          </div>
        </div>
        <div className="sub-dresscode">
          {/* <h3>Event Policies</h3> */}
          <div className="subtitle"><h2><p>{t('noChildren')}</p></h2>
          <p>{t('dressCodeNoChildren')}</p>
          <div className="kidsIcon"></div>
              </div>
          <div className="subtitle"><h2><p>{t('noSmoking')}</p></h2>
          <p>{t('dressCodeNoSmoking')}</p>
          <div className="smokingIcon"></div>
              </div>
        </div>
      </Container>
      </section>
  );
};

export default DressCode;
