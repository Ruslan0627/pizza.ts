import { HTMLAttributes } from "react";

interface IProductCardProps extends Omit<HTMLAttributes<HTMLDivElement>,"id"> {
	title:string;
	description:string;
	price:number;
	rating:number;
	img:string
}

export type { IProductCardProps }