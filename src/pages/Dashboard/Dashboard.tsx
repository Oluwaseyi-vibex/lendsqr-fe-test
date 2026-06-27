import StatsCard from "../../components/StatsCard/StatsCard";
import UsersIcon from '../../assets/dashboard/users-stats-card-.svg'


import "./Dashboard.scss";

const Dashboard = () => {
    return (
        <div className="dashboard-page">
            <h1>Users</h1>


            <div className="stats-cards-container">
                <StatsCard src={UsersIcon} title="USERS" number={1000} />
                <StatsCard src={UsersIcon} title="ACTIVE USERS" number={1000} />
                <StatsCard src={UsersIcon} title="USERS WITH LOANS" number={1000} />
                <StatsCard src={UsersIcon} title="USERS WITH SAVINGS" number={1000} />
            </div>
        </div>
    )
}

export default Dashboard
