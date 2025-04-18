import Header from "../../components/header/header";
import Search from "../../components/search/search";
import cn from "classnames"
import styles from "./menu.module.css"
import { BASE_API_URL, TOKEN } from "../../helpers/api";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/product.interface";
import axios, { AxiosError } from "axios";
import MenuList from "../../components/menu-list/menu-list";

function Menu() {
	const [ products, setProducts ] = useState<IProduct[]>([])
	const [ isLoading, setIsLoading ] = useState<boolean>(false)
	const [error, setError ] = useState<string>()

	useEffect(() => {
		getProducts()
	},[])

	const getProducts = async () => {
		try {
			setIsLoading(true)
			const { data } = await axios<IProduct[]>(`${BASE_API_URL}/products`,{
				headers: {
							"authorization": `Bearer ${TOKEN}`
						}
			})
			setProducts(data)
		}
		catch (e) {
			console.log(e);
			if (e instanceof AxiosError) {
				setError(e?.response?.data?.message || e.message)
			}
		}
		finally {
			setIsLoading(false)
		}
	}
		return (
		<>
		<div className = {cn(styles.head)}>
		<Header>Меню</Header>
		<div>
		<Search placeholder={"введите блюдо или состав"}/>
		</div>
		</div>
		<div className={styles.productWrapper}>
		{ isLoading && <div>Загрузка...</div> }
		{ error && <h1>{error}</h1>}

			{
				!isLoading && <MenuList products = {products}/>
			}
			</div>
		</>
		);
}

export default Menu;