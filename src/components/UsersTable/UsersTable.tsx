import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiFilter, FiMoreVertical } from "react-icons/fi";
import "./UsersTable.scss";
import FilterModal from "../FilterModal/FilterModal";

interface User {
    id: number;
    organization: string;
    username: string;
    email: string;
    phoneNumber: string;
    dateJoined: string;
    status: "Active" | "Inactive" | "Pending" | "Blacklisted";
}

interface UsersTableProps {
    users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
    const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: "ascending" | "descending" } | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filters, setFilters] = useState({
        organization: "",
        username: "",
        email: "",
        date: "",
        phoneNumber: "",
        status: "",
    });
    const organizations = [...new Set(users.map((user) => user.organization))];

    const handleFilter = (newFilters: typeof filters) => {
        setFilters(newFilters);
        setShowFilterModal(false);
        setCurrentPage(1); // Reset to first page on filter
    };

    const handleReset = () => {
        setFilters({
            organization: "",
            username: "",
            email: "",
            date: "",
            phoneNumber: "",
            status: "",
        });
        setCurrentPage(1);
    };




    const requestSort = (key: keyof User) => {
        let direction: "ascending" | "descending" = "ascending";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key: keyof User) => {
        if (!sortConfig || sortConfig.key !== key) return <FiChevronDown />;
        return sortConfig.direction === "ascending" ? <FiChevronUp /> : <FiChevronDown />;
    };

    const sortedUsers = [...users];

    const filteredUsers = sortedUsers.filter((user) => {
        return (
            (filters.organization === "" || user.organization === filters.organization) &&
            (filters.username === "" || user.username.toLowerCase().includes(filters.username.toLowerCase())) &&
            (filters.email === "" || user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
            (filters.date === "" || user.dateJoined.includes(filters.date)) &&
            (filters.phoneNumber === "" || user.phoneNumber.includes(filters.phoneNumber)) &&
            (filters.status === "" || user.status === filters.status)
        );
    });
    if (sortConfig) {
        sortedUsers.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "ascending" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "ascending" ? 1 : -1;
            }
            return 0;
        });
    }


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const getVisiblePages = (): Array<number | "..."> => {
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        }

        if (currentPage <= 3) {
            return [1, 2, 3, "...", totalPages];
        }

        if (currentPage >= totalPages - 2) {
            return [1, "...", totalPages - 2, totalPages - 1, totalPages];
        }

        return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Active":
                return { backgroundColor: "#e8f5e8", color: "#39d539" };
            case "Inactive":
                return { backgroundColor: "#f0f0f0", color: "#545f7d" };
            case "Pending":
                return { backgroundColor: "#fff8e8", color: "#e2b827" };
            case "Blacklisted":
                return { backgroundColor: "#ffebee", color: "#ff4d4f" };
            default:
                return { backgroundColor: "#f0f0f0", color: "#545f7d" };
        }
    };



    return (
        <div className="users-table-container">
            <div className="table-header" style={{ position: "relative" }}>
                <button
                    className="filter-toggle-button"
                    onClick={() => setShowFilterModal(!showFilterModal)}
                >
                    <FiFilter /> Filter
                </button>

                {/* Modal will appear below the button */}
                {showFilterModal && (
                    <FilterModal
                        organizations={organizations}
                        onFilter={handleFilter}
                        onReset={handleReset}
                    />
                )}
            </div>
            <table className="users-table">
                <thead>
                    <tr>
                        {[
                            { key: "organization", label: "ORGANIZATION" },
                            { key: "username", label: "USERNAME" },
                            { key: "email", label: "EMAIL" },
                            { key: "phoneNumber", label: "PHONE NUMBER" },
                            { key: "dateJoined", label: "DATE JOINED" },
                            { key: "status", label: "STATUS" },
                        ].map((column) => (
                            <th key={column.key} onClick={() => requestSort(column.key as keyof User)}>
                                <div className="header-content">
                                    <span>{column.label}</span>
                                    <span className="sort-icon">{getSortIndicator(column.key as keyof User)}</span>
                                </div>
                            </th>
                        ))}
                        <th className="actions-header"></th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((user) => (
                        <tr key={user.id}>
                            <td>{user.organization}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.dateJoined}</td>
                            <td>
                                <span className="status-badge" style={getStatusStyle(user.status)}>
                                    {user.status}
                                </span>
                            </td>
                            <td className="actions-cell">
                                <FiMoreVertical className="actions-icon" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="table-footer">
                <div className="showing-entries">
                    <span>Showing</span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="entries-select"
                    >
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <span>out of {filteredUsers.length}</span>
                </div>
                <div className="pagination">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="page-button"
                    >
                        &lt;
                    </button>
                    {getVisiblePages().map((page, index) => (
                        page === "..." ? (
                            <span className="page-ellipsis" key={`ellipsis-${index}`}>
                                ...
                            </span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => paginate(page)}
                                className={`page-button ${currentPage === page ? "active" : ""}`}
                            >
                                {page}
                            </button>
                        )
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="page-button"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UsersTable;
