import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { logoutUser } from "../../../api/auth.api";
import { removeData } from "../../../utils/localStorage";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (_error) {
            // Clear local auth even if server logout fails.
        } finally {
            removeData("authToken");
            removeData("authUser");
            navigate("/login", { replace: true });
        }
    };

    return (
        <div className={styles.sidebar}>
            <h2 className={styles.logo}>Admin</h2>

            <nav className={styles.navLinks}>
                <NavLink to="/admin/categories" className={({ isActive }) =>
                    isActive ? styles.active : styles.link
                }>
                    Categories
                </NavLink>

                <NavLink to="/admin/products" className={({ isActive }) =>
                    isActive ? styles.active : styles.link
                }>
                    Products
                </NavLink>
            </nav>

            <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Sidebar;