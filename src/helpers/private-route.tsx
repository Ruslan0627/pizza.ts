import { ReactNode } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function PrivateRoute({ children }: {children:ReactNode}) {
	const jwt = localStorage.getItem("jwt")
	if (!jwt) {
		return <Navigate to={"/auth/login"} replace/>
	}
		return <>{children}</>
}

export default PrivateRoute; 