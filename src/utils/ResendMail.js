import axios from "axios";
import toast from "react-hot-toast";

export const resendEmailApi = async (data) => {
    console.log(data)
    if (data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/coach/email/resend-verification`, data);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Email resend successfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}