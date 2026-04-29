import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./footer/Footer";

const MainLayout = () => {
    return (
        <>
            <Navbar />

            <main style={{ marginTop: "80px" }}>
                <Outlet />   {/* ✅ THIS IS REQUIRED */}
            </main>

            <Footer />
        </>
    );
};

export default MainLayout;