import { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import "./DashboardLayout.scss";
import NavBar from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";

export default function DashboardLayout() {
    const navigate = useNavigate()
    const loggedIn = localStorage.getItem("login")
    useEffect(() => {
        if (loggedIn !== "true") {
            navigate("/")
        }
    })
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    // Close sidebar on route change
    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    // Lock body scroll while sidebar is open (mobile)
    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [sidebarOpen]);

    return (
        <div className={`dashboard-layout-container${sidebarOpen ? " sidebar-open" : ""}`}>
            <header className="dashboard-layout-header">
                <NavBar onHamburgerClick={() => setSidebarOpen(true)} />
            </header>

            <main className="dashboard-layout-main">
                {/* Mobile backdrop - closes sidebar when clicked */}
                <div
                    className={`dashboard-layout-backdrop${sidebarOpen ? " open" : ""}`}
                    onClick={() => setSidebarOpen(false)}
                    role="presentation"
                    aria-hidden={!sidebarOpen}
                />

                {/* Sidebar drawer (fixed on mobile, static on desktop) */}
                <aside
                    className={`dashboard-layout-sidebar${sidebarOpen ? " open" : ""}`}
                    aria-label="Dashboard navigation"
                >
                    <SideBar />
                </aside>

                {/* Main content area */}
                <section className="dashboard-layout-content">
                    <Outlet />
                </section>
            </main>
        </div>
    );
}