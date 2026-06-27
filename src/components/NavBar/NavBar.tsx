import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import Logo from "../Logo/Logo";
import Bell from "../../assets/bell.svg"
import Avatar from "../../assets/avatar.svg"

import "./NavBar.scss";
import { BiCaretDown } from "react-icons/bi";

const NavBar = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
    };

    return (
        <div className="navbar-container">
            <Logo />
            <form className="navbar-center" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for anything"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-icon-container">
                    <IoSearchSharp className="search-icon" />
                </button>
            </form>

            <div className="navbar-right">
                <p>Docs</p>

                <img src={Bell} alt="Notification Bell" className="bell-icon" />
                <img src={Avatar} alt="User Avatar" className="avatar-icon" />

                <div>
                    <p>Adedeji</p>
                    <BiCaretDown />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
