import { useState, useEffect } from "react";
import StatsCard from "../../components/StatsCard/StatsCard";
import UsersIcon from '../../assets/dashboard/users-stats-card-.svg';
import ActiveUsersIcon from '../../assets/dashboard/active-users-stats-card.svg';
import UsersWithLoansIcon from '../../assets/dashboard/users-with-loans-stats-card.svg';
import UsersWithSavingsIcon from '../../assets/dashboard/users-with-savings-stats-card.svg';
import UsersTable from "../../components/UsersTable/UsersTable";
import "./Dashboard.scss";

interface User {
    id: number;
    organization: string;
    username: string;
    email: string;
    phoneNumber: string;
    dateJoined: string;
    status: "Active" | "Inactive" | "Pending" | "Blacklisted";
    hasLoan: boolean;
    hasSavings: boolean;
}

const Dashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/users_data.json");
                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error("Error loading user data:", error);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Calculate stats
    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.status === "Active").length;
    const usersWithLoans = users.filter(user => user.hasLoan).length;
    const usersWithSavings = users.filter(user => user.hasSavings).length;

    if (loading) return <div>Loading...</div>;

    return (
        <div className="dashboard-page">
            <h1>Users</h1>

            <div className="stats-cards-container">
                <StatsCard src={UsersIcon} title="USERS" number={totalUsers} />
                <StatsCard src={ActiveUsersIcon} title="ACTIVE USERS" number={activeUsers} />
                <StatsCard src={UsersWithLoansIcon} title="USERS WITH LOANS" number={usersWithLoans} />
                <StatsCard src={UsersWithSavingsIcon} title="USERS WITH SAVINGS" number={usersWithSavings} />
            </div>

            <UsersTable users={users} />
        </div>
    );
};

export default Dashboard;