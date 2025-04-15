import { HTMLAttributes, ReactNode } from "react";

interface IHeaderProps extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode
}

export type { IHeaderProps }