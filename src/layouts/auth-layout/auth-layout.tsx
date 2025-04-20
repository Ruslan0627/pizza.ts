import { Link, Outlet } from "react-router-dom";
import styles from "./auth-layout.module.css"
import cn from "classnames"
function AuthLayout() {
	return (
		<div className={cn(styles.layout)}>
		<div className={cn(styles.logo)}>
			<h4>logo</h4>
		</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
}

export default AuthLayout;
  