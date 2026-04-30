import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#f6f7fb" }}>
            <Sidebar />

            <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                <AdminNavbar />

                <div style={{ padding: "20px", overflowX: "auto" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;