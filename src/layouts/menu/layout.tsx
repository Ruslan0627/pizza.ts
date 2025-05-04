import styles from "./layout.module.css";

import cn from "classnames";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import { useDispatch, useSelector } from "react-redux";
import { userAсtions } from "../../store/user.slice";
import { AppDispatch, RootStore } from "../../store/store";
import { useCallback, useEffect } from "react";
import { ICartItem } from "../../store/cart.slice";

const avatarImage = "src/assets/user.png"
const menuImg = "src/assets/menu.png"
const menuCart = "src/assets/online-shopping.png"
const logoutImg = "src/assets/power-button.png"

function Layout() {
	const navigate = useNavigate()
	const dispatch = useDispatch<AppDispatch>()
	const useProfile = useSelector((state:RootStore) => state.user.profile)
	const cartItems = useSelector( (s:RootStore) => s.cart.items)
	const { name, email } = useProfile
	function logout () {
		dispatch(userAсtions.logout())
		navigate("/auth/login")
	}
	useEffect(() => {
		dispatch(userAсtions.getProfileState())
		return () => { 
			dispatch(userAсtions.clearProfile())
		}
	},[dispatch])

	const getCartItemsCount = useCallback(() => {
		return cartItems.reduce( (acc, rec) => {
			return acc + rec.count
	 },0 )
	},[cartItems]) 

	return (
		<div className={cn(styles.layout)}>
			<div className={cn(styles.sidebar)}>
				<div className={cn(styles.user)}>
					<img src={avatarImage} className={cn(styles.avatar)} alt="user avatar" />
					<div className={cn(styles.name)}>
						{name}
					</div>
					<div className={cn(styles.email)}>
					{email}
					</div>
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
				Корзина {getCartItemsCount()}
				</NavLink>
				</div>
				<Button 
				size="S" 
				onClick={logout} 
				className={cn(styles.exitBtn)}>
					<img className ={cn(styles.imgBtn)} src={logoutImg} alt="" />
					<span>Выйти</span>
					</Button>
			</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
}

export default Layout;
