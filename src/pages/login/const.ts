import { AuthData } from '@/types/auth'

export interface ValidationResult {
  isValid: boolean
  error: string | null
}

export const validateData = (data: AuthData): ValidationResult => {
  const { password } = data

  const hasLetter = /[a-zA-Z]/.test(password)
  const hasDigit = /\d/.test(password)

  if (data.password.length < 2) {
    return {
      isValid: false,
      error: 'Длина пароля должна быть больше 2',
    }
  }

  if (!hasLetter || !hasDigit) {
    return {
      isValid: false,
      error: 'Пароль должен содержать буквы и цифры',
    }
  }

  return {
    isValid: true,
    error: null,
  }
}
