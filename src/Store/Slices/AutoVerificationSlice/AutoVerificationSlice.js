import axios from "axios";
import { toast } from "react-hot-toast";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const Autoverify = createAsyncThunk('Autoverify', async (verificationData, { rejectWithValue }) => {
    if (verificationData) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/coach/email/verify`, verificationData)
            if (res?.data.success) {
                // toast.success(res?.data?.message)
                console.log(res)
                return res.data.data;
            }
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || err.message || 'Verification Failed...Something went wrong...');
            return rejectWithValue(err.response?.data || "Something went wrong");
        }
    }
})