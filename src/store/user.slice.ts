import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
	jwt: null | string
}

const initialState: IUserState = {
	jwt:null
}

export const userSlice = createSlice({
	name:"user",
	initialState,
	reducers: {
		initJwt: (state, action:PayloadAction<string>) => {
			state.jwt = action.payload
		},
		logout: (state) => {
			state.jwt = null
		}
	}
})

export default userSlice.reducer
export const userAсtions = userSlice.actions

