interface IProduct {
	id: number;
	name:string;
	ingredients:string[];
	image:string;
	rating: number;
	price: number
}

export type { IProduct }