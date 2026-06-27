import { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import "./FilterModal.scss";

interface FilterModalProps {
    organizations: string[];
    onFilter: (filters: {
        organization: string;
        username: string;
        email: string;
        date: string;
        phoneNumber: string;
        status: string;
    }) => void;
    onReset: () => void;
}

const FilterModal = ({ organizations, onFilter, onReset }: FilterModalProps) => {
    const [filters, setFilters] = useState({
        organization: "",
        username: "",
        email: "",
        date: "",
        phoneNumber: "",
        status: "",
    });

    const statusOptions = ["", "Active", "Inactive", "Pending", "Blacklisted"];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFilter(filters);
    };

    return (
        <div className="filter-modal">
            <form onSubmit={handleSubmit}>
                <div className="filter-group">
                    <label>Organization</label>
                    <select
                        name="organization"
                        value={filters.organization}
                        onChange={handleInputChange}
                    >
                        <option value="">Select</option>
                        {organizations.map((org) => (
                            <option key={org} value={org}>
                                {org}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="User"
                        value={filters.username}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="filter-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={filters.email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="filter-group">
                    <label>Date</label>
                    <div className="date-input-container">
                        <input
                            type="date"
                            name="date"
                            value={filters.date}
                            onChange={handleInputChange}
                        />
                        <FiCalendar className="date-icon" />
                    </div>
                </div>

                <div className="filter-group">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={filters.phoneNumber}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="filter-group">
                    <label>Status</label>
                    <select
                        name="status"
                        value={filters.status}
                        onChange={handleInputChange}
                    >
                        <option value="">Select</option>
                        {statusOptions.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-actions">
                    <button type="button" onClick={onReset} className="reset-button">
                        Reset
                    </button>
                    <button type="submit" className="filter-button">
                        Filter
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FilterModal;