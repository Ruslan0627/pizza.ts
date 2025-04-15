import { IProductCardProps } from "./product-card.props";
import cn from "classnames";
import styles from "./product-card.module.css";
import { Link } from "react-router-dom";

const cardIcon = "src/assets/online-shopping.png";
const starIcon = "src/assets/star.png"

function ProductCard({
	className,
	title,
	description,
	img,
	rating,
	price,
	id,
	...props
}: IProductCardProps) {
	return (
		<Link to={"/"} className={cn(styles.link)}>
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
					<button className={cn(styles.addToCardBtn)}>
						<img src={cardIcon} alt="" />
					</button>
					<div className={cn(styles.rating)}>
						{rating}&nbsp;
						<img src={starIcon} alt="иконка звезды" />
					</div>
				</div>
				<div className={cn(styles.footer)}>
						<div className={cn(styles.title)}>
						{title}
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
