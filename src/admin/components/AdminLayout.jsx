import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <Sidebar />

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <AdminNavbar />

                <div style={{ padding: "20px" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;