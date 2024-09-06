import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChurch, faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const locations = [
  {
    id: 1,
    icon: faChurch,
    translationKey: "religiousCeremony" // Reemplaza texto estático por claves de traducción
  },
  {
    id: 2,
    icon: faChampagneGlasses,
    translationKey: "weddingReception" // Reemplaza texto estático por claves de traducción
  }
];

const Where = () => {
  const { t } = useTranslation();
  
  return (
    <section id="wherewillbe" className='block services-block'>
      <Container fluid>
        <div className="title-holder">
           <h2>{t('whereTitle')}</h2>
           <div className="subtitle">{t('whereSubtitle')}</div>
        </div>
        <div className="row location_row">
          {locations.map((location) => (
            <div className="col-md-6 col-lg-4" key={location.id}> <br/>
              <div className="service-item">
                {/* <div className="icon">
                  <FontAwesomeIcon icon={location.icon} />
                </div> */}

                <h3>
                  {t(`${location.translationKey}.title`)} 
                  <FontAwesomeIcon icon={location.icon} />
                </h3>
                <p className='locationTime'>{t(`${location.translationKey}.time`)}</p>
                <p>{t(`${location.translationKey}.description`)}</p>
                <p>{t(`${location.translationKey}.description2`)}</p>
                <div className="location">
                  {/* El src del iframe debería ser específico para cada ubicación. */}
                  <iframe
                    src={t(`${location.translationKey}.locationUrl`)} 
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t(`${location.translationKey}.title`)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Where;
