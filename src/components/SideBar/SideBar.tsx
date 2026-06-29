import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";

import AuditLogsIcon from "../../assets/dashboard/clipboard-list 1.svg";
import BriefcaseIcon from "../../assets/dashboard/briefcase 1.svg";
import DashboardIcon from "../../assets/dashboard/home 1.svg";
import DecisionModelsIcon from "../../assets/dashboard/handshake-regular 1.svg";
import FeesChargesIcon from "../../assets/dashboard/coins-solid 1.svg";
import FeesPricingIcon from "../../assets/dashboard/Vector.svg";
import GuarantorsIcon from "../../assets/dashboard/guarantors.svg";
import KarmaIcon from "../../assets/dashboard/user-times 1.svg";
import LoanProductsIcon from "../../assets/dashboard/Group 104.svg";
import LoanRequestsIcon from "../../assets/dashboard/loans.svg";
import OrganizationIcon from "../../assets/dashboard/briefcase 1(1).svg";
import PreferencesIcon from "../../assets/dashboard/sliders-h 1.svg";
import ReportsIcon from "../../assets/dashboard/chart-bar 2.svg";
import SavingsIcon from "../../assets/dashboard/piggy-bank 1.svg";
import SavingsProductsIcon from "../../assets/dashboard/np_bank_148501_000000 1.svg";
import ServiceAccountIcon from "../../assets/dashboard/user-cog 1.svg";
import ServicesIcon from "../../assets/dashboard/galaxy 1.svg";
import SettlementsIcon from "../../assets/dashboard/scroll 1.svg";
import SystemMessagesIcon from "../../assets/dashboard/icon.svg";
import TransactionsIcon from "../../assets/dashboard/icon.svg";
import UsersIcon from "../../assets/dashboard/user-friends 1.svg";
import WhitelistIcon from "../../assets/dashboard/user-check 1.svg";

import "./SideBar.scss";

type MenuItem = {
    label: string;
    icon: string;
    to: string;
    active?: boolean;
};

type MenuSection = {
    title: string;
    items: MenuItem[];
};

const menuSections: MenuSection[] = [
    {
        title: "Customers",
        items: [
            { label: "Users", icon: UsersIcon, to: "/users", active: true },
            { label: "Guarantors", icon: GuarantorsIcon, to: "/dashboard/guarantors" },
            { label: "Loans", icon: LoanRequestsIcon, to: "/dashboard/loans" },
            { label: "Decision Models", icon: DecisionModelsIcon, to: "/dashboard/decision-models" },
            { label: "Savings", icon: SavingsIcon, to: "/dashboard/savings" },
            { label: "Loan Requests", icon: LoanProductsIcon, to: "/dashboard/loan-requests" },
            { label: "Whitelist", icon: WhitelistIcon, to: "/dashboard/whitelist" },
            { label: "Karma", icon: KarmaIcon, to: "/dashboard/karma" },
        ],
    },
    {
        title: "Businesses",
        items: [
            { label: "Organization", icon: OrganizationIcon, to: "/dashboard/organization" },
            { label: "Loan Products", icon: LoanProductsIcon, to: "/dashboard/loan-products" },
            { label: "Savings Products", icon: SavingsProductsIcon, to: "/dashboard/savings-products" },
            { label: "Fees and Charges", icon: FeesChargesIcon, to: "/dashboard/fees-and-charges" },
            { label: "Transactions", icon: TransactionsIcon, to: "/dashboard/transactions" },
            { label: "Services", icon: ServicesIcon, to: "/dashboard/services" },
            { label: "Service Account", icon: ServiceAccountIcon, to: "/dashboard/service-account" },
            { label: "Settlements", icon: SettlementsIcon, to: "/dashboard/settlements" },
            { label: "Reports", icon: ReportsIcon, to: "/dashboard/reports" },
        ],
    },
    {
        title: "Settings",
        items: [
            { label: "Preferences", icon: PreferencesIcon, to: "/dashboard/preferences" },
            { label: "Fees and Pricing", icon: FeesPricingIcon, to: "/dashboard/fees-and-pricing" },
            { label: "Audit Logs", icon: AuditLogsIcon, to: "/dashboard/audit-logs" },
            { label: "Systems Messages", icon: SystemMessagesIcon, to: "/dashboard/system-messages" },
        ],
    },
];

const SideBar = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const enhancedSections = menuSections.map((section) => ({
        ...section,
        items: section.items.map((item) => ({
            ...item,
            active: location.pathname === item.to,
        })),
    }));

    return (
        <nav className="sidebar" aria-label="Dashboard navigation">
            <button className="sidebar-organization" type="button">
                <img src={BriefcaseIcon} alt="" aria-hidden="true" />
                <span>Switch Organization</span>
                <IoIosArrowDown className="sidebar-organization-caret" aria-hidden="true" />
            </button>

            <Link className="sidebar-link sidebar-dashboard-link" to="/dashboard">
                <img src={DashboardIcon} alt="" aria-hidden="true" />
                <span>Dashboard</span>
            </Link>

            <div className="sidebar-sections">
                {enhancedSections.map((section) => (
                    <section className="sidebar-section" key={section.title}>
                        <h2>{section.title}</h2>
                        <ul>
                            {section.items.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        className={`sidebar-link${item.active ? " sidebar-link-active" : ""}`}
                                        to={item.to}
                                        aria-current={item.active ? "page" : undefined}
                                    >
                                        <img src={item.icon} alt="" aria-hidden="true" />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>

            <div className="sidebar-footer">
                <div onClick={() => {
                    localStorage.clear()
                    navigate('/')
                }}
                    className="sidebar-link sidebar-logout"
                >
                    <MdOutlineLogout aria-hidden="true" />
                    <span>Logout</span>
                </div>
                <p>v1.2.0</p>
            </div>
        </nav>
    );
};

export default SideBar;
