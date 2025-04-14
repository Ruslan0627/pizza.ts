import { IButton } from "./button.props";
import cn from "classnames"
import styles from "./button.module.css"

function Button({className, children,size,...props}:IButton) {
		return (
				<button
				className={cn(styles.button, styles.primary, className,{ 
					[styles.small]: size === "S",
					[styles.large]: size === "L"
				})}
				{...props}>
					{children}
				</button>
		);
}

export default Button;