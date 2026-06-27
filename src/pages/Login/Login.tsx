import { useState } from "react"

import PabloImg from "../../assets/pablo-sign-in.svg"
import "./Login.scss"
import Logo from "../../components/Logo/Logo";
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="container">

            <section className="left-section">
                <div className="logo-container">
                    <Logo />
                </div>

                <img className="pablo-img" src={PabloImg} />
            </section>

            <section className="right-section">
                <div className="right-section-header">
                    <h1>Welcome!</h1>
                    <p>Enter details to login.</p>
                </div>

                <form>
                    <div className="input-wrapper">
                        <div className="input-container">
                            <input type="email" placeholder="Email" className="" />
                        </div>

                        <div className="input-container">
                            <input type={showPassword ? "text" : "password"} placeholder="Password" className="" />
                            <div onClick={togglePasswordVisibility} className="input-toggle">
                                {showPassword ? "HIDE" : "SHOW"}
                            </div>
                        </div>

                        <p className="forgot-password">FORGOT PASSWORD?</p>
                    </div>

                    <button className="submit-button" type="submit">LOG IN</button>
                </form>
            </section>
        </div>
    )
}

export default Login
