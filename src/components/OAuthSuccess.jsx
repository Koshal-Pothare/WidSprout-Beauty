import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {

    const navigate = useNavigate();
    

    useEffect(() => {

        const params = new URLSearchParams(window.location.search);

        const token = params.get("token");
        const id = params.get("id");
        const username = params.get("username");
        const role = params.get("role");

        if (token) {
            localStorage.setItem("isuserLoggedIn",JSON.stringify(true));
            localStorage.setItem("token", token);
            localStorage.setItem("userId", id);
            localStorage.setItem("username", username);
            localStorage.setItem("role", role);

            if (role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/user");
            }

        } else {
            navigate("/login");
        }

    }, []);

    return <h2>Logging in...</h2>;
};

export default OAuthSuccess;