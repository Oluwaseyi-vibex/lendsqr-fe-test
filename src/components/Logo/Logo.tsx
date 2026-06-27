import LogoText from "../../assets/lendsqr.svg"
import LogoIcon from "../../assets/logo-icon.svg"
import "./Logo.scss"
const Logo = () => {
    return (
        <div className="logo-container">
            <img src={LogoIcon} alt="Logo" />
            <img src={LogoText} alt="Lendsqr" />
        </div>
    )
}

export default Logo
