import { Outlet } from "react-router-dom";

import "./DashboardLayout.scss";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";

export default function DashboardLayout() {
    return (
        <div className="dashboard-layout-container">
            <header className="dashboard-layout-header">
                <NavBar />            </header>

            <main className="dashboard-layout-main">
                <aside className="dashboard-layout-sidebar">
                    <SideBar />
                </aside>

                <section className="dashboard-layout-content">
                    <Outlet />
                </section>
            </main>
        </div>
    );
}
