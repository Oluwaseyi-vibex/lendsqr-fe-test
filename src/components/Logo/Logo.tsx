import LogoText from "../../assets/lendsqr.svg";
import LogoIcon from "../../assets/logo-icon.svg";
import "./Logo.scss";

const Logo = () => {
    return (
        <a href="/" className="logo-container" aria-label="Lendsqr home">
            <img src={LogoIcon} alt="" aria-hidden="true" className="logo-icon" />
            <img src={LogoText} alt="Lendsqr" className="logo-text" />
        </a>
    );
};

export default Logo;