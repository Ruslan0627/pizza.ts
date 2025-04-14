import styles from "./layout.module.css";

import cn from "classnames";

import { NavLink, Outlet } from "react-router-dom";
import Button from "../../components/button/button";

const avatarImage = "src/assets/user.png"
const menuImg = "src/assets/menu.png"
const menuCart = "src/assets/online-shopping.png"
const logoutImg = "src/assets/power-button.png"

function Layout() {
	console.log("Layout отрендерился");
	return (
		<div className={cn(styles.layout)}>
			<div className={cn(styles.sidebar)}>
				<div className={cn(styles.user)}>
					<img src={avatarImage} className={cn(styles.avatar)} alt="user avatar" />
					<div className={cn(styles.name)}>Имя пользвателя</div>
					<div className={cn(styles.email)}>example@gmail.com </div>
				</div>
				<div className={cn(styles.menu)}>
				<NavLink to="/" className={({isActive})=> cn(styles.link, {
					[styles.active]:isActive
				})}>
				<img src={menuImg} alt="" />
				Меню
				</NavLink>
				<NavLink className={({isActive})=> cn(styles.link, {
					[styles.active]:isActive
				})} to="/cart">
				<img src={menuCart} alt="" />
				Корзина
				</NavLink>
				</div>
				<Button size="S" className={cn(styles.exitBtn)}>
					<img className ={cn(styles.imgBtn)} src={logoutImg} alt="" />
					<span>Выйти</span>
					</Button>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}

export default Layout;
