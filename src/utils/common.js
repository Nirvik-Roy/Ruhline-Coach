import axios from "axios";
import toast from "react-hot-toast";
export const commonDelelteApi = async (url,id) => {
    const Token = localStorage.getItem('token')
    if (id && Token && url) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}${url}/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Token}`
                }
            });
            toast.success(res.data?.message || 'Data Deleted Successfully');
            return res.data
        } catch (err) {
            console.log(err.response.data)
            toast.error(err.response?.data?.message || 'Unexpected Error Occured');
        }
    }
}