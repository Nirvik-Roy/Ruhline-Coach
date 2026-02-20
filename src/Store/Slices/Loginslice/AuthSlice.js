import axios from "axios";
import { toast } from "react-hot-toast";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Authregister } from "../RegisterSlice/AuthRegisterSlice";
import { Autoverify } from "../AutoVerificationSlice/AutoVerificationSlice";
export const Auth = createAsyncThunk('Auth', async (loginParams, { rejectWithValue }) => {
    const { formData } = loginParams
    console.log(formData)
    if (formData) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/coach/login`, formData);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Login Success');
                console.log(res.data.data)
                return res.data.data

            }
        } catch (err) {
            // toast.error(err.response?.data?.data.errors?.email[0])
            toast.error(err.response?.data?.errors?.email[0])
            console.log(err.response)
            return rejectWithValue(err.response?.data || "Something went wrong");
        }
    }
})
export const AuthlogOut = createAsyncThunk('AuthlogOut', async (loginParams, { rejectWithValue }) => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/coach/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Logut Success');
                localStorage.removeItem('token')
                return res.data.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message)
            return rejectWithValue(err.response?.data || "Something went wrong");
        }
    } else {
        toast.error('Unauthenticated...')
        return rejectWithValue("Something went wrong");
    }

})
const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: false,
        isLoading: false,
        isChecking: true,
        isRegister: false,
        registrationErrors: '',
        errors: '',
    },
    reducers: {
        verifyToken(state,) {
            const token = localStorage.getItem('token');
            if (token) {
                state.isLogin = true,
                    state.isChecking = false;
            }else{
                state.isChecking = false,
                state.isLogin = false
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(Auth.pending, (state) => {
            state.isLoading = true;
            state.isLogin = false,
                state.errors = ''
        })

        builder.addCase(AuthlogOut.pending, (state) => {
            state.isLoading = true;
            state.isLogin = true;
            state.errors = ''
        })
        builder.addCase(AuthlogOut.fulfilled, (state) => {
            state.isLoading = false;
            state.isLogin = false;
            state.errors = ''
        })
        builder.addCase(AuthlogOut.rejected, (state) => {
            state.isLoading = false;
            state.isLogin = true;
        })
        builder.addCase(Auth.fulfilled, (state, action) => {
            if (action.payload.token) {
                state.isLogin = true;
                state.isLoading = false;
                state.errors = '';
                localStorage.setItem('token', action.payload.token)
            }
        })
        builder.addCase(Auth.rejected, (state, action) => {
            state.isLoading = false;
            state.isLogin = false;
            state.errors = action.payload.errors
        })

        builder.addCase(Authregister.pending, (state) => {
            state.isRegister = false,
                state.isLoading = true,
                state.registrationErrors = ''
        })

        builder.addCase(Authregister.fulfilled, (state) => {
            state.isRegister = true,
                state.isLoading = false,
                state.registrationErrors = ''
        })

        builder.addCase(Authregister.rejected, (state, action) => {
            state.isRegister = true,
                state.isLoading = false,
                state.registrationErrors = action.payload
        })
    }
})
export const { verifyToken } = AuthSlice.actions
export default AuthSlice.reducer;