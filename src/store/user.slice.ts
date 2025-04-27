import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios from "axios";
import { BASE_API_URL } from "../helpers/api";
import { ISuccesLogin } from "../pages/login/types/login.type";

export interface IUserState {
	jwt: null | string
}

const initialState: IUserState = {
	jwt:loadState<{jwt: string}>("jwt")?.jwt ?? null
}

export const login  = createAsyncThunk ("user/login", async (params: {email: string, password: string}) => {
	const { email, password }  = params
	const { data } = await axios.post<ISuccesLogin>(`${BASE_API_URL}/users/login`, { email, password })
	return data
})

export const userSlice = createSlice({
	name:"user",
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null
		}
	}, 
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action:PayloadAction<ISuccesLogin>) => {
			 state.jwt = action.payload.token
		})
	}
})

export default userSlice.reducer
export const userAсtions = userSlice.actions

