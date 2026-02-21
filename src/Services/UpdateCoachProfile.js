import axios from 'axios';

export const updateCoachProfile = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/coach/update-profile`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`
          // Content-Type omitted so axios sets multipart/form-data with boundary
        }
      }
    );
    return response.data;
  } catch (error) {
    throw {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to update profile',
      data: null
    };
  }
};
