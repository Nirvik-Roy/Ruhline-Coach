import axios from "axios";
import toast from "react-hot-toast";

export const ResetPasswordApi = async (data) => {
    console.log(data)
    if (data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/coach/reset-password`, data);
            if (res.data.success == true) {
                toast.success(res.data?.message || 'Reset password succesfully..');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    }
}