import { Link } from "react-router-dom";
import cn from "classnames"
import Button from "../../components/button/button";
import Header from "../../components/header/header";
import Input from "../../components/input/input";
import styles from "./login.module.css"
import { FormEvent, useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { BASE_API_URL } from "../../helpers/api";
import { ISuccesLogin } from "./types/login.type";

export type LoginForm = {
	email: {
		value:string,
	}
	password: {
		value:string,
	}
}

function Login() {
	const [error, setError] = useState()
	const timer = useRef<ReturnType<typeof setTimeout>>(null)
	const submit = ((e:FormEvent) => {
		e.preventDefault()
		const target = e.target as typeof e.target & LoginForm
		const {email, password} = target
		sendLogin(email?.value, password?.value)
	})
	const sendLogin = async (email:string, password:string) => {
		try {
		const { data } = await axios.post<ISuccesLogin>(`${BASE_API_URL}/users/login`, { email, password })
		console.log(`toke ${data.token} ${data}`);
		}
		catch (e) {
			if (e instanceof AxiosError ) {
				setError(e.response?.data.message)
				timer.current = setTimeout(() => {
					setError("")
				}, 5000)
			}
		}
	}

useEffect(() => {
	return clearTimeout(timer.current)
},[])
		return (
				<div className={cn(styles.login)}>
					<Header>{error? error :"Вход"}</Header>
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