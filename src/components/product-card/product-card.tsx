import { IProductCardProps } from "./product-card.props";
import cn from "classnames";
import styles from "./product-card.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartAction } from "../../store/cart.slice";
import { AppDispatch } from "../../store/store";

const cardIcon = "src/assets/online-shopping.png";
const starIcon = "src/assets/star.png"

function ProductCard({
	className,
	name,
	description,
	img,
	rating,
	price,
	id,
	...props
}: IProductCardProps) {

	const dispatch = useDispatch<AppDispatch>()
	function addProductCart (e:MouseEvent) {
		e.preventDefault()
		dispatch(cartAction.add(id))
	}

	return (
		<Link to={`/product/${id}`} className={cn(styles.link)}>
			<div 
			{...props}
			id={id.toString()}
			className={cn(styles.card, className)} 
			>
				<div className={cn(styles.head)} 
				style={{backgroundImage:`url(${img})` }}
				>
					<div className={cn(styles.price)}>
						{price}
					</div>
					<button onClick={addProductCart} className={cn(styles.addToCardBtn)}>
						<img src={cardIcon} alt="" />
					</button>
					<div className={cn(styles.rating)}>
						{rating}&nbsp;
						<img src={starIcon} alt="иконка звезды" />
					</div>
				</div>
				<div className={cn(styles.footer)}>
						<div className={cn(styles.title)}>
						{name}
						</div>
						<div className={cn(styles.description)}>
							{description}
						</div>
					</div>
			</div>
		</Link>
	);
}

export default ProductCard;
