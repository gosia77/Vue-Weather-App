import axios from 'axios'


const apiKey = '67df65255ba2010d7626b016f882ccf2'
// const geoWeatherUrl = import.meta.env.VITE_OPEN_WEATHER_GEO_URL
// const fourDayWeather = import.meta.env.VITE_OPEN_WEATHER_FOUR_DAY_URL


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