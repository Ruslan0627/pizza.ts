
import { useDispatch } from "react-redux";
import { ICartItemProps } from "./cart-item-props";
import styles from "./cart-item.module.css"
import cn from "classnames"
import { cartAction } from "../../store/cart.slice";

function CartItem({name,image,count,price,id}:ICartItemProps) {
	const dispatch = useDispatch()
	const add = () => {
		dispatch(cartAction.add(id))
	}
	const subtract = () => {
		dispatch(cartAction.subtract(id))
	}

	const remove = () => {
		dispatch(cartAction.remove(id))
	}
		return (
			<div className={styles.wrapper}>
				<div className={styles.img}
				style={{ backgroundImage:`${image}`}}/>
				<div className={cn(styles.desc)}>
				<div className={cn(styles.name)}>{name}</div>
				<div className={cn(styles.price)}>{price}</div>
				</div>
				<div className={cn(styles.action)}>
					<button onClick={subtract} className={cn(styles.btn)}>-</button>
					<div className={styles.count}>{count}</div>
					<button onClick={add} className={cn(styles.btn)}>+</button>
					<button onClick={remove} className={cn(styles.btn)}>X</button>
				</div>
			</div>
		);
}

export default CartItem;