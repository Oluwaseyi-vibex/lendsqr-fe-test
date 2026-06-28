import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import { FiMoreVertical, FiEye, FiUserX, FiUserCheck } from "react-icons/fi";
import "./TableActionsMenu.scss";

interface TableActionsMenuProps {
  userId: number; // Add userId to the props
  onBlacklistUser: (userId: number) => void;
  onActivateUser: (userId: number) => void;
}

const TableActionsMenu = ({
  userId,
  onBlacklistUser,
  onActivateUser,
}: TableActionsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleViewDetails = () => {
    navigate(`users/${userId}`); // Navigate to the user details page
    setIsOpen(false);
  };

  return (
    <div className="table-actions-menu" ref={menuRef}>
      <button
        className="actions-icon-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMoreVertical className="actions-icon" />
      </button>

      {isOpen && (
        <ul className="actions-dropdown">
          <li className="dropdown-item" onClick={handleViewDetails}>
            <FiEye className="dropdown-icon" /> View Details
          </li>
          <li
            className="dropdown-item"
            onClick={() => {
              onBlacklistUser(userId);
              setIsOpen(false);
            }}
          >
            <FiUserX className="dropdown-icon" /> Blacklist User
          </li>
          <li
            className="dropdown-item"
            onClick={() => {
              onActivateUser(userId);
              setIsOpen(false);
            }}
          >
            <FiUserCheck className="dropdown-icon" /> Activate User
          </li>
        </ul>
      )}
    </div>
  );
};

export default TableActionsMenu;