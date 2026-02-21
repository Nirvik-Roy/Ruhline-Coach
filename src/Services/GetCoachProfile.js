import axios from 'axios';

export const getCoachProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/auth/coach/me`,
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
      message: error.response?.data?.message || error.message || 'Failed to fetch profile',
      data: null
    };
  }
};
