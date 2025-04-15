import { IHeaderProps } from "./header.props";
import styles from "./header.module.css"
import cn from "classnames";

function Header({children,className,...props}:IHeaderProps) {
		return (
				<h1
				className={cn(styles.header,className)}
				{...props}
				>
					{children}
				</h1>
		);
}

export default Header;