import { IInputProps } from "./input.props";
import styles from "./input.module.css"
import cn from "classnames"
import { ForwardedRef, forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, IInputProps>(function ( {isValid,className,...props}:IInputProps, ref:ForwardedRef) {
		return (
			<input
			ref={ref}
			className={cn(styles.input,className,{
					[styles.valid]: !isValid
				})} 
				type="text" 
				{...props}
				/>
		)
})

export default Input

