import { City, CITY_NAMES } from '@/const'

export const getRandomCity = (): City | null => {
  if (!CITY_NAMES.length) {
    return null
  }

  const index = Math.floor(Math.random() * CITY_NAMES.length)
  return CITY_NAMES[index]
}
