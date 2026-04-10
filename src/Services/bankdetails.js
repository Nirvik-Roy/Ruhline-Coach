import axios from "axios";
import toast from "react-hot-toast";
export const getBankDetails = async () => {
    const Token = localStorage.getItem('token');
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/coach/payment-details`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}


export const updateBankDetailsApi = async (data) => {
    const Token = localStorage.getItem('token');
    if (Token && data) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/auth/coach/payment-details`, data, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            },);
            if (res.data.success == true) {
                toast.success(res?.data?.message || 'Bank deatils Update Succesfully')
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}