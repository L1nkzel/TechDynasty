import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AlertBox from "./AlertBox";
import { useState, useEffect } from "react";
import { RootState } from "../store";


const PrivateRoute = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            setOpen(true);
            setTimeout(() => {
                navigate("/", { state: { fromProtectedRoute: true }, replace: true });
            }, 1200); 
        }
    }, [userInfo, navigate]);

    return (
        <>
            {userInfo ? (
                <Outlet />
            ) : (
                <>
                    {open && <AlertBox open={open} setOpen={setOpen} text={"Please login to access this page"} />}
                </>
            )}
        </>
    );
};

export default PrivateRoute;
