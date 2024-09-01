import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChurch, faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';

const locations = [
  {
    id: 1,
    icon: faChurch,
    title: "Religious Ceremony",
    time: "Time: 4:00 p.m.",
    description: "Place: Parroquia del Señor del Encino",
    description2:"Address: Jardín, Barrio del Encino, 20240. Aguascalientes, Ags., México.",
    location: <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d778.363643634333!2d-102.2937839218664!3d21.875182263614903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8429ee796b62a955%3A0x6f40669481f287ec!2sParroquia%20del%20Se%C3%B1or%20del%20Encino!5e0!3m2!1ses-419!2sca!4v1715200189348!5m2!1ses-419!2sca"   allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="church"/>
  },
  {
    id: 2,
    icon: faChampagneGlasses,
    title: "Wedding Reception",
    time: "Time: 6:30 p.m.",
    description: "Place: Casa de Piedra",
    description2:"Address: Av. Guadalupe Gonzalez #1116. Pocitos, 20329. Aguascalientes, Ags., México.",
    location: <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3701.667375536074!2d-102.34597572526165!3d21.908880856970157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8429eed4155c9ce9%3A0xd2f568e33afcccd0!2sCasa%20de%20Piedra!5e0!3m2!1ses-419!2sca!4v1715201034384!5m2!1ses-419!2sca"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="church" />
  }
]

const Where = () => {
  return (
    <section id="wherewillbe" className='block services-block'>
      <Container fluid>
        <div className="title-holder">
          <h2>VENUES & WEDDING ITINERARY</h2>
          <div className="subtitle">A day to remember: from vows to celebrations</div>
        </div>
        <div className="row location_row">
          {locations.map((location) => (
            <div className="col-md-6 col-lg-4" key={location.id}>
              <div className="service-item">
                <div className="icon">
                  {/* <FontAwesomeIcon icon={location.icon} /> */}
                </div>
                <h3>{location.title} <FontAwesomeIcon icon={location.icon}/></h3>
                <p>{location.time}</p>
                <p>{location.description}</p>
                <p>{location.description2}</p>
                <div className="location">{location.location}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Where;