import { IProduct } from "../../interfaces/product.interface";
import ProductCard from "../product-card/product-card";
import { IMenuLIstProps } from "./menu-list.props";
import styles from "./menu-list.module.css"
import cn from "classnames"

function MenuList( { products }: IMenuLIstProps) {
		return (
				<div className={cn(styles.wrapper)}>
					{
					products.map( (product:IProduct) => (
					<ProductCard
					id ={product?.id}
					name={product?.name}
					description={product?.ingredients.join(" , ")}
					rating={product?.rating}
					price={product.price}
					img={product?.image}
					/>
				))
			}
				</div>
		);
}

export default MenuList;