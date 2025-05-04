import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/product.interface";
import axios from "axios";
import { BASE_API_URL, TOKEN } from "../../helpers/api";
import { ICartItem } from "../../store/cart.slice";
import CartItem from "../../components/cart-Item/cart-item";

function Cart() {

	const [cartProdcts, setCartProducts] = useState<IProduct[]>([])
	const cartItems = useSelector((s:RootStore) => s.cart.items)
	 const getItem = async (id:number) => {
		const { data } = await axios.get(`${BASE_API_URL}/products/${id}`,{
			headers: {
				"Authorization":`Bearer ${TOKEN}`
			}
		})
		return data[0]
	 }

	 const loudAllItems = async ():Promise<void> => {
		const res = await Promise.all(cartItems.map( i => getItem(i.id)))
		setCartProducts(res)
	 }

	 useEffect(() => {
		loudAllItems()
	},[])
	return (
		<div>
			<h1>Корзина</h1>
			{
				cartItems.map((i:ICartItem) => {
					const product = cartProdcts.find((p:IProduct) => p.id == i.id)
					if(!product) return
					return <CartItem key={i.id} count={i.count} {...product}/>
				}) 
			}
		</div>
	);
}

export default Cart;
