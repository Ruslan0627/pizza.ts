import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface ICartItem {
	id: number,
	count: number;
}

export interface ICartState {
	items: ICartItem[];
}

const initialState: ICartState = {
	items: []
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<number>) => {
			const item = state.items.find(i => i.id === action.payload);
			if (item) {
				item.count++;
			} else {
				state.items.push({ id: action.payload, count: 1 });
			}
		},
		subtract: (state, action: PayloadAction<number>) => {
			const item = state.items.find(i => i.id === action.payload);
			if (item) {
				if (item.count > 1) {
					item.count--;
				}
				else state.items = state.items.filter(i => i !== item);
			}
		},
		remove: (state, action:PayloadAction<number>) => {
			const item = state.items.find(i => i.id === action.payload);
			if (item) {
				state.items = state.items.filter(i => i !== item);
			}
		}
	}
}
);

export const cartAction = cartSlice.actions
