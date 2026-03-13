import axios from 'axios'


const apiKey = VITE_OPEN_WEATHER_API_KEY
const geoWeatherUrl = import.meta.env.VITE_OPEN_WEATHER_GEO_URL
// const fourDayWeather = import.meta.env.VITE_OPEN_WEATHER_FOUR_DAY_URL

/**TO DO */
export async function getCurrentWeather(latitude, longitude) {
    if (!latitude || !longitude || !apiKey) {
        throw new Error('Missing required parameters or API key')
    } try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
        console.log('yyyyyyy',response.data);
            return response.data
            
    } catch (error) {
        console.error('Error fetching current weather:', error)
        if (error.response) {
      throw new Error(`Error: ${error.response.status}`)
    } else if (error.request) {
        throw new Error('No response received from the server')
    }}
}


/**Fetch city list based on user input
 * @param {string} cityName - Name of the city for search
 * @returns {Promise<Array} - A list of cities
 * @throw {Error} If the API request fails.
 */

export async function fetchCityList(cityName) {
  try {
    const response = await axios.get(`${geoWeatherUrl}`, {
      params: {
        q: cityName,
        limit: 3,
        units: 'metric',
        appid: apiKey,
      },
    })
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error('Failed fetching the city')
    }
  }
}