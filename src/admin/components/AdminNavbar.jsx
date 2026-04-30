import { useLocation } from "react-router-dom";

const AdminNavbar = () => {
    const location = useLocation();
    const title = location.pathname.includes("/admin/products") ? "Products" : "Categories";

    return (
        <div style={{
            height: "60px",
            background: "#fff",
            borderBottom: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            fontWeight: "600"
        }}>
            {title}
        </div>
    );
};

export default AdminNavbar;