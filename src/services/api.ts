import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { BACKEND_URL, REQUEST_TIMEOUT } from './const'
import { getToken } from './token'
import { StatusCodes } from 'http-status-codes'
import { processErrorHandle } from './process-error-handle'

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true,
}

type DetailMessageType = {
  type: string
  message: string
}

const shouldDisplayError = (response: AxiosResponse) =>
  !!StatusCodeMapping[response.status]

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

  api.interceptors.response.use(
    (config) => config,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        processErrorHandle(error.message)
      }
    },
  )

  // api.interceptors.response.use(
  //   (response) => response,
  //   (error: AxiosError<DetailMessageType>) => {
  //     if (error.status === 404) {
  //       toast.error('Страница не найдена')
  //     }
  //     return Promise.reject(error)
  //   },
  // )

  return api
}
