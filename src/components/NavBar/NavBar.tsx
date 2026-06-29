import { useSearchStore } from "../../store/useSearchStore";
import { IoSearchSharp } from "react-icons/io5";
import { BiCaretDown } from "react-icons/bi";
import { FiMenu, FiSidebar } from "react-icons/fi";
import Logo from "../Logo/Logo";
import Bell from "../../assets/bell.svg";
import Avatar from "../../assets/avatar.svg";
import "./NavBar.scss";

type NavBarProps = {
    onHamburgerClick?: () => void;
};

const NavBar = ({ onHamburgerClick }: NavBarProps) => {
    const { searchQuery, setSearchQuery } = useSearchStore();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
    };

    return (
        <div className="navbar-container">
            <button
                type="button"
                className="navbar-hamburger"
                onClick={onHamburgerClick}
                aria-label="Open sidebar"
            >
                <FiSidebar size={24} />
            </button>

            <Logo />

            <form className="navbar-center" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for anything"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search"
                />
                <button type="submit" className="search-icon-container" aria-label="Submit search">
                    <IoSearchSharp className="search-icon" />
                </button>
            </form>

            <div className="navbar-right">
                <p className="docs-link">Docs</p>

                <button
                    type="button"
                    className="icon-button"
                    aria-label="Notifications"
                >
                    <img src={Bell} alt="" className="bell-icon" />
                </button>

                <button
                    type="button"
                    className="icon-button avatar-button"
                    aria-label="User menu"
                >
                    <img src={Avatar} alt="" className="avatar-icon" />
                </button>

                <div className="user-dropdown">
                    <p>Adedeji</p>
                    <BiCaretDown />
                </div>
            </div>
        </div>
    );
};

export default NavBar;