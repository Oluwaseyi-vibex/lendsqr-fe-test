import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiStar, FiUser } from "react-icons/fi";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import "./UserDetails.scss";
import { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import { LuUser, LuUserRound } from "react-icons/lu";
import type { User } from "../../types/user";



const UserDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("/users_data.json");
                const users: User[] = await response.json();
                const foundUser = users.find((u) => u.id === Number(id));
                if (foundUser) {
                    setUser(foundUser);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error loading user data:", error);
                setLoading(false);
            }
        };
        fetchUserData();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;

    const handleBlacklist = () => {
        console.log("Blacklist user:", user.id);
        // Add your blacklist logic here
    };

    const handleActivate = () => {
        console.log("Activate user:", user.id);
        // Add your activate logic here
    };


    return (
        <div className="user-details-page">
            {/* Header */}
            <div className="user-details-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <HiArrowLongLeft size={30} /> Back to Users
                </button>
                <div className="header-actions">
                    <h1>User Details</h1>
                    <div className="header-action-buttons">
                        {/* Blacklist Button: Always visible, disabled if already blacklisted */}
                        <button
                            disabled={user?.status === "Blacklisted"}
                            className={`blacklist-button ${user?.status === "Blacklisted" ? "blacklisted" : ""}`}
                            onClick={handleBlacklist}
                        >
                            {user?.status === "Blacklisted" ? "BLACKLISTED" : "BLACKLIST USER"}
                        </button>

                        {/* Activate Button: Only visible for Inactive, Pending, or Blacklisted users */}
                        {(user?.status === "Inactive" || user?.status === "Pending" || user?.status === "Blacklisted") && (
                            <button className="activate-button" onClick={handleActivate}>
                                ACTIVATE USER
                            </button>
                        )}

                        {/* Inactive Indicator: Only visible for Inactive users */}
                        {user?.status === "Inactive" && (
                            <span className="inactive-button">INACTIVE USER</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Profile Section */}
            <div className="profile-section">


                <div className="profile-info">

                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        <div className="profile-avatar">
                            <div className="avatar-placeholder">
                                <LuUserRound size={40} />
                                {/* {user.username.split(" ")[0][0]}{user.username.split(" ")[1][0]} */}
                            </div>
                        </div>
                        <div className="profile-name">
                            <h2>{user.username}</h2>

                            <span className="user-id">{user.accountNumber}</span>


                        </div>
                    </div>

                    <span className="divider">
                    </span>

                    <div className="profile-tier">
                        <span className="change-tier-span">User’s Tier</span>

                        <div className="user-tier">
                            <div className="tier-stars">
                                {[...Array(user.tier)].map((_, i) => (
                                    <FiStar key={i} className="star-icon" />
                                ))}
                            </div>
                        </div>
                    </div>

                    <span className="divider">
                    </span>

                    <div className="profile-balance">
                        <h2>{user.accountBalance}</h2>
                        <span>{user.bvn}/Providus Bank</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    <button className="tab active">General Details</button>
                    <button className="tab">Documents</button>
                    <button className="tab">Bank Details</button>
                    <button className="tab">Loans</button>
                    <button className="tab">Savings</button>
                    <button className="tab">App and System</button>
                </div>
            </div>



            {/* Content Sections */}
            <div className="content-sections">
                {/* Personal Information */}
                <div className="section">
                    <h3>Personal Information</h3>
                    <div className="section-grid">
                        <div className="info-box">
                            <div className="info-header">FULL NAME</div>
                            <div className="info-data">{user.username}</div>
                        </div>
                        <div className="info-box">
                            <div className="info-header">PHONE NUMBER</div>
                            <div className="info-data">{user.phoneNumber}</div>
                        </div>
                        <div className="info-box">
                            <div className="info-header">EMAIL ADDRESS</div>
                            <div className="info-data">{user.email}</div>
                        </div>
                        <div className="info-box">
                            <div className="info-header">BVN</div>
                            <div className="info-data">{user.bvn}</div>
                        </div>
                        <div className="info-box">
                            <div className="info-header">GENDER</div>
                            <div className="info-data">{user.gender}</div>
                        </div>
                        <div className="info-box">
                            <div className="info-header">MARITAL STATUS</div>
                            <div className="info-data">{user.maritalStatus}</div>
                        </div>
                        <div className="info-box">
                            <div className="info-header">CHILDREN</div>
                            <div className="info-data">{user.children}</div>
                        </div>
                        <div className="info-box">
                            <div className="info-header">TYPE OF RESIDENCE</div>
                            <div className="info-data">{user.residenceType}</div>
                        </div>
                    </div>
                </div>

                <span className="divider">

                </span>

                {/* Education and Employment */}
                <div className="section section-divider">
                    <h3>Education and Employment</h3>
                    <div className="section-grid">
                        <div className="info-box">
                            <div className="info-header">LEVEL OF EDUCATION</div>
                            <div className="info-data">{user.education}</div>
                        </div>
                        <div className="info-box">
                            <div className="info-header">EMPLOYMENT STATUS</div>
                            <div className="info-data">{user.employmentStatus}</div>
                        </div>
                        <div className="info-box">
                            <div className="info-header">SECTOR OF EMPLOYMENT</div>
                            <div className="info-data">{user.sector}</div>
                        </div>
                        <div className="info-box">
                            <div className="info-header">DURATION OF EMPLOYMENT</div>
                            <div className="info-data">{user.duration}</div>
                        </div>
                        <div className="info-box">
                            <div className="info-header">OFFICE EMAIL</div>
                            <div className="info-data">{user.officeEmail}</div>
                        </div>
                        <div className="info-box">
                            <div className="info-header">MONTHLY INCOME</div>
                            <div className="info-data">{user.monthlyIncome}</div>
                        </div>
                        <div className="info-box">
                            <div className="info-header">LOAN REPAYMENT</div>
                            <div className="info-data">{user.loanRepayment}</div>
                        </div>
                    </div>
                </div>

                {/* Socials */}
                <div className="section section-divider">
                    <h3>Socials</h3>
                    <div className="section-grid">
                        <div className="info-box">
                            <div className="info-header">TWITTER</div>
                            <div className="info-data">
                                {user.twitter}
                            </div>
                        </div>
                        <div className="info-box">
                            <div className="info-header">FACEBOOK</div>
                            <div className="info-data">
                                {user.facebook}
                            </div>
                        </div>
                        <div className="info-box">
                            <div className="info-header">INSTAGRAM</div>
                            <div className="info-data">
                                {user.instagram}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Guarantor */}
                <div className="section">
                    <h3>Guarantor</h3>
                    {user.guarantors.map((guarantor, index) => (
                        <div key={index} className="guarantor-section">
                            <div className="section-grid">
                                <div className="info-box">
                                    <div className="info-header">FULL NAME</div>
                                    <div className="info-data">{guarantor.fullName}</div>
                                </div>
                                <div className="info-box">
                                    <div className="info-header">PHONE NUMBER</div>
                                    <div className="info-data">{guarantor.phoneNumber}</div>
                                </div>
                                <div className="info-box">
                                    <div className="info-header">EMAIL ADDRESS</div>
                                    <div className="info-data">{guarantor.email}</div>
                                </div>
                                <div className="info-box">
                                    <div className="info-header">RELATIONSHIP</div>
                                    <div className="info-data">{guarantor.relationship}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserDetails;