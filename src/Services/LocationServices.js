import axios from 'axios';


export const getCountries = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/location/countries`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    throw {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to fetch countries',
      data: null
    }
  }
}


export const getStates = async (countryId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/location/countries/${countryId}/states`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    throw {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to fetch states',
      data: null
    }
  }
}


export const getCities = async (stateId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/location/states/${stateId}/cities`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    throw {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to fetch cities',
      data: null
    }
  }
}


export const getPhoneCountryCodes = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/location/phone-country-codes`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (error) {
    throw {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to fetch phone country codes',
      data: null
    }
  }
}
