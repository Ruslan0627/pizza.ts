import styles from "./search.module.css"
import { ISearchProps } from "./search.props";
import cn from "classnames"
import { ForwardedRef, forwardRef } from "react";
const searchIcon = "src/assets/search.png"

const Search = forwardRef<HTMLInputElement, ISearchProps>( function Search ({className,...props}, ref:ForwardedRef) {
		return (
			<div className={cn(styles.wrapper)}>
				<input
				ref = {ref}
				className={ cn(styles.search, className)}
				type="text"
				{...props}
				/>
				<img src ={searchIcon} alt="search-icon" className={cn(styles.icon)}/>
			</div>
		);
})

export default Search ;