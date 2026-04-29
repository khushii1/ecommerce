import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <h2 className={styles.logo}>Admin</h2>

            <nav>
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
        </div>
    );
};

export default Sidebar;