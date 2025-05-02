import { Link, useNavigate } from "react-router-dom";
import cn from "classnames"
import Button from "../../components/button/button";
import Header from "../../components/header/header";
import Input from "../../components/input/input";
import styles from "./login.module.css"
import { FormEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../../store/store";
import { login, userAсtions } from "../../store/user.slice";

export type LoginForm = {
	email: {
		value:string,
	}
	password: {
		value:string,
	}
}

function Login() {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const timer = useRef<ReturnType<typeof setTimeout>>(null)
	const userState = useSelector((state:RootStore) => state.user)
	const { jwt, errorMsg } = userState
	const submit = ((e:FormEvent) => {
		e.preventDefault()
		dispatch(userAсtions.clearErrorMsg())
		const target = e.target as typeof e.target & LoginForm
		const {email, password} = target
		sendLogin(email?.value, password?.value)
	})
	const sendLogin = async (email:string, password:string) => {
		dispatch(login({email,password}))
	}

useEffect(() => {
	if (jwt) navigate("/")
	return () => {
		clearTimeout(timer.current)
	}
},[jwt,navigate,dispatch])
		return (
				<div className={cn(styles.login)}>
					<Header>{ errorMsg ? errorMsg : "Вход"}</Header>
					<form onSubmit={submit} className={cn(styles.form)}>
						<div className={cn(styles.field)}>
							<label htmlFor="email">
								Ваш email
							</label>
								<Input 
								type="email" 
								id="email" 
								placeholder="Email"
								/>
						</div>
						<div className={cn(styles.field)}>
							<label htmlFor="password">
								Ваш пороль
							</label>
								<Input 
								type="password" 
								id="password" 
								placeholder="Ввидите пороль"
								/>
						</div>
								<Button size="L">Вход</Button>
					</form>
					<div className={cn(styles.links)}>
						<div>
						Нет аккаунта?
						</div>
						<div>
						<Link to={"/auth/register"}>Зарегестрироваться</Link>
						</div>
					</div>
				</div>
		);
}

export default Login