import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AlertBox from "../AlertBox";
import { useState, useEffect } from "react";

const AdminRoute = () => {
    const { userInfo } = useSelector((state: any) => state.auth);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            setOpen(true);
            setTimeout(() => {
                navigate("/", { state: { fromProtectedRoute: true }, replace: true });
            }, 1200); 
        }
    }, [userInfo, navigate]);

    return (
        <>
            {userInfo && userInfo.isAdmin ? (
                <Outlet />
            ) : (
                <>
                    {open && <AlertBox open={open} setOpen={setOpen} text={"Please login as admin to access this page"} />}
                </>
            )}
        </>
    );
};

export default AdminRoute;