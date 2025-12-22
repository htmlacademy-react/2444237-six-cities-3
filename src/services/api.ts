import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { BACKEND_URL, REQUEST_TIMEOUT } from './const'
import { getToken } from './token'

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  })

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken()

    if (token && config.headers) {
      config.headers['x-token'] = token
    }

    return config
  })

  // api.interceptors.response.use(
  //   (config) => config,
  //   (error: AxiosError<DetailMessageType>) => {
  //     if (error.response && shouldDisplayError(error.response)) {
  //       processErrorHandle(error.message)
  //     }
  //   },
  // )

  return api
}
