import { useLoaderData} from "react-router-dom";
import { IProduct } from "../../interfaces/product.interface";

function Product() {
	const[ data ] = useLoaderData() as IProduct[]
		return (
				<h2>Блюдо {data.name}</h2>
		);
}

export default Product