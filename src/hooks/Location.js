import { useEffect } from 'react'
import { useLocationContext } from '../context/locationContext'

/**
 * Hook to get countries
 * @returns {{countries: Array, loading: boolean, error: string|null, refetch: Function}}
 */
export const useCountries = () => {
  const { countries, loading, errors, fetchCountries } = useLocationContext()

  useEffect(() => {
    fetchCountries()
  }, [fetchCountries])

  return {
    countries,
    loading: loading.countries,
    error: errors.countries,
    refetch: fetchCountries
  }
}

/**
 * Hook to get states for a country
 * @param {number|null} countryId - The numeric ID of the country
 * @returns {{states: Array, loading: boolean, error: string|null, refetch: Function}}
 */
export const useStates = (countryId) => {
  const { states, loading, errors, fetchStates } = useLocationContext()

  useEffect(() => {
    if (countryId) {
      fetchStates(countryId)
    }
  }, [countryId, fetchStates])

  return {
    states: countryId ? (states[countryId] || []) : [],
    loading: countryId ? (loading.states[countryId] || false) : false,
    error: countryId ? (errors.states[countryId] || null) : null,
    refetch: () => countryId && fetchStates(countryId)
  }
}

/**
 * Hook to get cities for a state
 * @param {number|null} stateId - The numeric ID of the state
 * @returns {{cities: Array, loading: boolean, error: string|null, refetch: Function}}
 */
export const useCities = (stateId) => {
  const { cities, loading, errors, fetchCities } = useLocationContext()

  useEffect(() => {
    if (stateId) {
      fetchCities(stateId)
    }
  }, [stateId, fetchCities])

  return {
    cities: stateId ? (cities[stateId] || []) : [],
    loading: stateId ? (loading.cities[stateId] || false) : false,
    error: stateId ? (errors.cities[stateId] || null) : null,
    refetch: () => stateId && fetchCities(stateId)
  }
}

/**
 * Hook to get phone country codes
 * @returns {{phoneCodes: Array, loading: boolean, error: string|null, refetch: Function}}
 */
export const usePhoneCountryCodes = () => {
  const { phoneCodes, loading, errors, fetchPhoneCodes } = useLocationContext()

  useEffect(() => {
    fetchPhoneCodes()
  }, [fetchPhoneCodes])

  return {
    phoneCodes,
    loading: loading.phoneCodes,
    error: errors.phoneCodes,
    refetch: fetchPhoneCodes
  }
}
