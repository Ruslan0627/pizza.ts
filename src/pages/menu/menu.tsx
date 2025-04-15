import Header from "../../components/header/header";
import Search from "../../components/search/search";
import cn from "classnames"
import styles from "./menu.module.css"
import ProductCard from "../../components/product-card/product-card";

function Menu() {
		return (
		<>
		<div className = {cn(styles.head)}>
		<Header>Меню</Header>
		<div>
		<Search placeholder={"введите блюдо или состав"}/>
		</div>
		</div>
		<div className={styles.productWrapper}>
		<ProductCard
			id ={1}
			title="Наслождение"
			description="Солями, рукола, помидоры, оливки"
			rating={4.5}
			price={300}
			img={"https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_1280.jpg"}
			/>
			</div>
		</>
		);
}

export default Menu;