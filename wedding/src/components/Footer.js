import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';


export default function Footer() {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 700) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function goTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    // Replace '1234567890' with your WhatsApp number
    const whatsappNumber = '+524491489782';
    const whatsappMessage = 'Hello, I need help with designing a web invitation.';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <Container fluid>
            <div className="copyright" id='sociales'>
                <div className="subtitle">
                    <p>{t('footer1')}</p>
                    <p>{t('footer2')} <a href={whatsappURL} target='_blank' rel="noreferrer"><big><u>Click here</u></big></a></p>
                    <p><br /><small>© 2024 Calupoh+. All Rights Reserved.</small></p>
                </div>
            </div>
            {/* <div className="socials">
                <ul>
                    <li><a href='https://www.linkedin.com/in/miguel-ahumada-803a87116/' target='_blank' rel="noreferrer"><i className="fab fa-linkedin-in"></i></a></li>
                    <li><a href='https://www.linkedin.com/in/miguel-ahumada-803a87116/' target='_blank' rel="noreferrer"><i className="fab fa-instagram"></i></a></li>
                    <li><a href='https://www.linkedin.com/in/miguel-ahumada-803a87116/' target='_blank' rel="noreferrer"><i className="fab fa-facebook"></i></a></li>
                    <li><a href='https://www.linkedin.com/in/miguel-ahumada-803a87116/' target='_blank' rel="noreferrer"><i className="fab fa-twitter"></i></a></li>
                </ul>
            </div> */}
            {
                show && (<div className='go-top' onClick={goTop}></div>)
            }
        </Container>
    );
}
