import { useSelector } from "react-redux";
import { RootStore } from "../../store/store";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/product.interface";
import axios from "axios";
import { BASE_API_URL } from "../../helpers/api";
import { ICartItem } from "../../store/cart.slice";
import CartItem from "../../components/cart-Item/cart-item";

function Cart() {
	const token = useSelector((root:RootStore) => root.user.jwt)

	const [cartProducts, setCartProducts] = useState<IProduct[]>([])
	const cartItems = useSelector((s:RootStore) => s.cart.items)
	const getItem = async (id:number) => {
		const { data } = await axios.get(`${BASE_API_URL}/products/${id}`,{
			headers: {
				"Authorization":`Bearer ${token}`
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

	const cartPrice = () => {
		return cartProducts
			.map((e) => {
				const cartItem = cartItems.find((p: ICartItem) => p?.id === e.id);
				if (cartItem && e.price) { 
					return { ...e, count: cartItem.count };
				}
				return null;
			})
			.filter(Boolean) 
			.reduce((acc, elem) => acc + (elem.price * elem.count), 0);
	};
	return (
		<div>
			<h1>Корзина</h1>
			{
				cartItems.map((i:ICartItem) => {
					const product = cartProducts.find((p:IProduct) => p.id === i.id)
					if(!product) return
					return <CartItem key={i.id} count={i.count} {...product}/>
				}) 
			}
			<div>Цена: {cartPrice()}</div>
		</div>
	);
}

export default Cart;
