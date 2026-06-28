import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./NotFound.scss";

const NotFound = () => {
    return (
        <div className="not-found-page">
            <div className="not-found-container">
                <h1 className="not-found-title">404</h1>
                <p className="not-found-message">Page Not Found</p>
                <p className="not-found-description">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/dashboard" className="back-to-dashboard">
                    <FiArrowLeft /> Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default NotFound;