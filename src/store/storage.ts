export function loadState<T> (key:string):T | undefined {
	try {
	const	jsonState = localStorage.getItem(key)
	if(!jsonState) return
	return JSON.parse(jsonState)
	}
	catch(e){
		if (e instanceof  Error) {
			throw new Error(e.message)
		}
	}
}

export function saveState<T> (state:T,key:string):undefined {
	if ( state && key) {
		localStorage.setItem(key,JSON.stringify(state))
	}
}