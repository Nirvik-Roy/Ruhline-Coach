import axios from 'axios';

export const changePassword = async (data) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/coach/change-password`,
      {
        current_password: data.current_password,
        password: data.password,
        password_confirmation: data.password_confirmation
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to change password',
      data: null
    };
  }
};