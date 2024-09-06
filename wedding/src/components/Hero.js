// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";


// const AppHero = () => {
//     return (
//       <div id="home" className="hero-block">
//         <div className="header__content">
//           <div className="header__title-wrapper">
//           <span className="header__subtitle">We are getting married</span>
//             <h1 className="header__title">Daniela Paola<br></br>
//             <small>&</small> <br></br>
//             Miguel Angel</h1>
//             {/* <span className="header__subtitle">We are getting married</span> */}
//             <h2 className="header__date">November 9, 2024</h2>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default AppHero;

import React from "react";
import { useTranslation } from 'react-i18next';
import "bootstrap/dist/css/bootstrap.min.css";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div id="home" className="hero-block">
      <div className="header__content">
        <div className="header__title-wrapper">
          <span className="header__subtitle">{t('heroSubtitle')}</span>
          <h1 className="header__title">
            {t('heroTitle').split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h1>
          <h2 className="header__date">{t('heroDate')}</h2>
        </div>
      </div>
    </div>
  );
};

export default Hero;
