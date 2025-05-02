import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios, { AxiosError } from "axios";
import { BASE_API_URL } from "../helpers/api";
import { ISuccesLogin } from "../pages/login/types/login.type";
import { jwtDecode } from "jwt-decode";

export interface IUserProfile {
	name: string;
	email:string
}

export interface IUserState {
	jwt: null | string;
	errorMsg?: string;
	profile:IUserProfile;
}

const initialState: IUserState = {
	jwt: loadState<{ jwt: string; }>("jwt")?.jwt ?? null,
	errorMsg: undefined,
	profile: {
		name:"",
		email:""
	}
};


export const login = createAsyncThunk("user/login", async (params: { email: string, password: string; }) => {
	try {
		const { email, password } = params;
		const { data } = await axios.post<ISuccesLogin>(`${BASE_API_URL}/users/login`, { email, password });
		return data;
	} catch (e) {
		if (e instanceof AxiosError) {
			throw new Error(e.response?.data?.message);
		}
	}
});

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null;
		},
		getProfileState: ( state ) => {
			if (state.jwt) {
				const parseJwt = jwtDecode<IUserProfile>(state.jwt)	
				const {name, email} = parseJwt
				state.profile = {
					email,
					name
				}
			}
		},
		clearProfile: (state) => {
			state.profile = {
				name:"",
				email:""
			}
		},
		clearErrorMsg: (state) => {
			state.errorMsg = undefined
		}
		
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action: PayloadAction<ISuccesLogin>) => {
			state.jwt = action.payload.token;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.errorMsg = action.error?.message
		});
	}
});

export default userSlice.reducer;
export const userAсtions = userSlice.actions

