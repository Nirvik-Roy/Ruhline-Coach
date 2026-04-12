import axios from "axios"
import toast from "react-hot-toast"

export const getPayoutList = async () => {
    const Token = localStorage.getItem('token')
    if (Token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/payout`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            if (res.data.success == true) {
                // toast.success(res.data?.message || 'Password Update Successfully');
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message)
        }
    } else {
        toast.error('Token not found...')
    }
}