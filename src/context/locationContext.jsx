import { createContext, useContext, useCallback, useReducer } from 'react'
import { getCountries, getStates, getCities, getPhoneCountryCodes } from '../Services/LocationServices'

const toList = (res) => (Array.isArray(res) ? res : res?.data ? (Array.isArray(res.data) ? res.data : []) : [])

const initialState = {
  countries: [],
  states: {},
  cities: {},
  phoneCodes: [],
  loading: { countries: false, states: {}, cities: {}, phoneCodes: false },
  errors: { countries: null, states: {}, cities: {}, phoneCodes: null }
}

function locationReducer(state, action) {
  switch (action.type) {
    case 'COUNTRIES_START':
      return { ...state, loading: { ...state.loading, countries: true }, errors: { ...state.errors, countries: null } }
    case 'COUNTRIES_SUCCESS':
      return { ...state, countries: action.payload, loading: { ...state.loading, countries: false }, errors: { ...state.errors, countries: null } }
    case 'COUNTRIES_ERROR':
      return { ...state, loading: { ...state.loading, countries: false }, errors: { ...state.errors, countries: action.payload } }
    case 'STATES_START':
      return {
        ...state,
        loading: { ...state.loading, states: { ...state.loading.states, [action.countryId]: true } },
        errors: { ...state.errors, states: { ...state.errors.states, [action.countryId]: null } }
      }
    case 'STATES_SUCCESS':
      return {
        ...state,
        states: { ...state.states, [action.countryId]: action.payload },
        loading: { ...state.loading, states: { ...state.loading.states, [action.countryId]: false } },
        errors: { ...state.errors, states: { ...state.errors.states, [action.countryId]: null } }
      }
    case 'STATES_ERROR':
      return {
        ...state,
        loading: { ...state.loading, states: { ...state.loading.states, [action.countryId]: false } },
        errors: { ...state.errors, states: { ...state.errors.states, [action.countryId]: action.payload } }
      }
    case 'CITIES_START':
      return {
        ...state,
        loading: { ...state.loading, cities: { ...state.loading.cities, [action.stateId]: true } },
        errors: { ...state.errors, cities: { ...state.errors.cities, [action.stateId]: null } }
      }
    case 'CITIES_SUCCESS':
      return {
        ...state,
        cities: { ...state.cities, [action.stateId]: action.payload },
        loading: { ...state.loading, cities: { ...state.loading.cities, [action.stateId]: false } },
        errors: { ...state.errors, cities: { ...state.errors.cities, [action.stateId]: null } }
      }
    case 'CITIES_ERROR':
      return {
        ...state,
        loading: { ...state.loading, cities: { ...state.loading.cities, [action.stateId]: false } },
        errors: { ...state.errors, cities: { ...state.errors.cities, [action.stateId]: action.payload } }
      }
    case 'PHONE_CODES_START':
      return { ...state, loading: { ...state.loading, phoneCodes: true }, errors: { ...state.errors, phoneCodes: null } }
    case 'PHONE_CODES_SUCCESS':
      return { ...state, phoneCodes: action.payload, loading: { ...state.loading, phoneCodes: false }, errors: { ...state.errors, phoneCodes: null } }
    case 'PHONE_CODES_ERROR':
      return { ...state, loading: { ...state.loading, phoneCodes: false }, errors: { ...state.errors, phoneCodes: action.payload } }
    default:
      return state
  }
}

const LocationContext = createContext(null)

export function LocationProvider({ children }) {
  const [state, dispatch] = useReducer(locationReducer, initialState)

  const fetchCountries = useCallback(async () => {
    dispatch({ type: 'COUNTRIES_START' })
    try {
      const res = await getCountries()
      dispatch({ type: 'COUNTRIES_SUCCESS', payload: toList(res) })
    } catch (err) {
      dispatch({ type: 'COUNTRIES_ERROR', payload: err?.message || 'Failed to fetch countries' })
    }
  }, [])

  const fetchStates = useCallback(async (countryId) => {
    if (!countryId) return
    dispatch({ type: 'STATES_START', countryId })
    try {
      const res = await getStates(countryId)
      dispatch({ type: 'STATES_SUCCESS', countryId, payload: toList(res) })
    } catch (err) {
      dispatch({ type: 'STATES_ERROR', countryId, payload: err?.message || 'Failed to fetch states' })
    }
  }, [])

  const fetchCities = useCallback(async (stateId) => {
    if (!stateId) return
    dispatch({ type: 'CITIES_START', stateId })
    try {
      const res = await getCities(stateId)
      dispatch({ type: 'CITIES_SUCCESS', stateId, payload: toList(res) })
    } catch (err) {
      dispatch({ type: 'CITIES_ERROR', stateId, payload: err?.message || 'Failed to fetch cities' })
    }
  }, [])

  const fetchPhoneCodes = useCallback(async () => {
    dispatch({ type: 'PHONE_CODES_START' })
    try {
      const res = await getPhoneCountryCodes()
      dispatch({ type: 'PHONE_CODES_SUCCESS', payload: toList(res) })
    } catch (err) {
      dispatch({ type: 'PHONE_CODES_ERROR', payload: err?.message || 'Failed to fetch phone codes' })
    }
  }, [])

  const value = {
    ...state,
    fetchCountries,
    fetchStates,
    fetchCities,
    fetchPhoneCodes
  }

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
}

export function useLocationContext() {
  const ctx = useContext(LocationContext)
  if (!ctx) throw new Error('useLocationContext must be used within LocationProvider')
  return ctx
}
