import axios from "axios";
import toast from "react-hot-toast";

export const getDisputeformOptions = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/coach/dispute/form-options`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                return res.data.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data
        }
    } else {
        toast.error('Unauthenticated')
    }
}


export const getDisputeList = async () => {
    const token = localStorage.getItem('token')
    if (token) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/coach/dispute`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                return res.data.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    } else {
        toast.error('Unauthenticated')
    }
}
export const createDispute = async (data) => {
    const token = localStorage.getItem('token')
    if (token && data) {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/coach/dispute`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                toast.success(res?.data?.message)
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data
        }
    } else {
        toast.error('Unauthenticated')
    }
}


export const getSingleDispute = async (id) => {
    const token = localStorage.getItem('token')
    if (token && id) {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/coach/dispute/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                return res.data.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    } else {
        toast.error('Unauthenticated')
    }
}

export const editDispute = async (data, id) => {
    const token = localStorage.getItem('token')
    if (token && data && id) {
        try {
            const res = await axios.put(`${import.meta.env.VITE_BASE_URL}/coach/dispute/${id}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                toast.success(res?.data?.message)
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data
        }
    } else {
        toast.error('Unauthenticated')
    }
}


export const deleteDispute = async (id) => {
    const token = localStorage.getItem('token')
    if (token && id) {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/coach/dispute/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.data.success == true) {
                toast.success(res?.data?.message)
                return res.data
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            return err.response.data.errors
        }
    } else {
        toast.error('Unauthenticated')
    }
}