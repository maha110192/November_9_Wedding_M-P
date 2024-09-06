import React from 'react';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const locations = [
  {
    id: 1,
    icon: faHotel,
    title: "Hotel Alameda Grand",
    description: "Antigua Alameda #821, Héroes, 20190. Aguascalientes, Ags., México.",
    location: <a href='https://alamedagrand.com' target='_blank'rel="noreferrer" className='btn btn-primary'>Reserve</a>
  },
  {
    id: 2,
    icon: faHotel,
    title: "Marriott Hotel",
    description: "Blvd. Zacatecas Norte, Trojes De Alonso, 20116. Aguascalientes, Ags., México.",
    location: <a href='https://www.marriott.com/es/hotels/agumc-aguascalientes-marriott-hotel/overview/' target='_blank'rel="noreferrer"className='btn btn-primary'>Reserve</a>
  },
  {
    id: 3,
    icon: faHotel,
    title: "Hilton Garden Inn",
    description: "Blvd. Luis Donaldo Colosio Murrieta #404, Valle de las Trojes, 20115. Aguascalientes, Ags., México.",
    location: <a href='https://www.hilton.com/en/hotels/agugigi-hilton-garden-inn-aguascalientes/?SEO_id=GMB-AMER-GI-AGUGIGI&y_source=1_MTIxNjk1ODAtNzE1LWxvY2F0aW9uLndlYnNpdGU%3D' target='_blank'rel="noreferrer" className='btn btn-primary'>Reserve</a>
  }
]

const Hotels = () => {

  const { t } = useTranslation();

  return (
    <section id="wherewillbe" className='block services-block'>
      <Container fluid>
        <div className="title-holder">
          <h2>{t('hotelsTitle')}</h2>
          <div className="subtitle">{t('hotelsSubtitle')}</div>
        </div>
        <div className="row location_row">
          {locations.map((location) => (
            <div className="col-md-6 col-lg-4" key={location.id}>
              <div className="service-item">
                <div className="icon">
                  {/* <FontAwesomeIcon icon={location.icon} /> */}
                </div>
                <h3>{location.title} <FontAwesomeIcon icon={location.icon}/></h3>
                <p>{location.description}</p>
                <div className="location">{location.location}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Hotels;
