import { ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	size?: "L" | "S"
}

export type { IButton }