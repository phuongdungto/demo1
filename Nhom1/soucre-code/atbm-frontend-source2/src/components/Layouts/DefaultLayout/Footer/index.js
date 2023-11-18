import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPrint } from '@fortawesome/free-solid-svg-icons';
import styles from './footer.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Footer() {
    return (
        <>
            <footer id="footer">
                <p>&copy; Copyright 2021 - Socialbook All Rights Reserved</p>
            </footer>
        </>
    )

}

export default Footer;