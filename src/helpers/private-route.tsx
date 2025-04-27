import { RootStore } from "../store/store";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }: {children:ReactNode}) {
	const jwt = useSelector( ( state:RootStore) => state.user.jwt) 
	if (!jwt) {
		return <Navigate to={"/auth/login"} replace/>
	}
		return <>{children}</>
}

export default PrivateRoute; 