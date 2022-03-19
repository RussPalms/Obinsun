import {
  FaFacebook,
  FaTwitter,
  FaDiscord,
  FaLinkedin,
  FaTiktok,
  FaBitcoin,
  FaEthereum,
} from 'react-icons/fa';
import { BsInstagram, BsReddit, BsYoutube, BsSnapchat } from 'react-icons/bs';
import {
  SiGmail,
  SiYahoo,
  SiMicrosoftoutlook,
  SiProtonmail,
  SiVenmo,
  SiPaypal,
  SiBankofamerica,
  SiChase,
  SiDiscover,
  SiAmericanexpress,
  SiCashapp,
  SiZelle,
} from 'react-icons/si';

const Externals = () => {
  return (
    <div className="sticky top-[28em] laptop-l:top-[22em] w-[25em] mobile-l:w-[27em] tablet:w-[45em] laptop:w-[58.5em] laptop-l:w-[79em] xl:w-[95em] 2xl:w-[95em] 3xl:w-[110em] 4vl:w-[124.5em] justify-end flex items-center z-[49] -mb-[22em] vs:-mb-[19em] laptop-l:-mb-[17em] 4vl:-mb-[19em] mobile-l:top-[20em] 4vl:top-[33em] overflow-x-clip">
      <ul className="socials-list-container ">
        <li className="socials-icon-list-container">
          <a
            className="socials-icon-transition social-glass-transition-delay"
            href="#"
          >
            <FaFacebook aria-hidden="true" />
          </a>
        </li>
        <li className="socials-icon-list-container">
          <a
            className="socials-icon-transition social-glass-transition-delay"
            href="#"
          >
            <FaTwitter aria-hidden="true" />
          </a>
        </li>
        <li className="socials-icon-list-container">
          <a
            className="socials-icon-transition social-glass-transition-delay"
            href="#"
          >
            <FaLinkedin aria-hidden="true" />
          </a>
        </li>
        <li className="socials-icon-list-container">
          <a
            className="socials-icon-transition social-glass-transition-delay"
            href="#"
          >
            <BsInstagram aria-hidden="true" />
          </a>
        </li>
        <li className="socials-icon-list-container">
          <a
            className="socials-icon-transition social-glass-transition-delay"
            href="#"
          >
            <BsSnapchat aria-hidden="true" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Externals;
