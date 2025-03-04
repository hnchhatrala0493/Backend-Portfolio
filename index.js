import axios from 'axios'
import router from './router' // Import your router instance

axios.defaults.baseURL = 'https://backend-portfolio-pw1y.vercel.app'

// Intercept responses
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      router.push('/login') // Redirect to login page
    }
    return Promise.reject(error)
  },
)

export default axios
