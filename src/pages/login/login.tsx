import Logo from '@/components/logo/logo'
import { AppRoute } from '@/const'
import styles from './login.module.css'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { loginAction } from '@/store/api-actions'
import { useAppDispatch } from '@/hooks'
import { validateData, ValidationResult } from './const'

const Login = (): JSX.Element => {
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const [isValidationError, setValidationError] = useState<ValidationResult>({
    isValid: true,
    error: null,
  })

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    if (emailRef.current !== null && passwordRef.current !== null) {
      const formData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }

      const result = validateData(formData)
      setValidationError(result)

      if (!result.isValid) {
        return
      }

      dispatch(loginAction(formData))
    }

    navigate(AppRoute.Main)
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo type="header" />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  ref={emailRef}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className={cn('login__input form__input', {
                    [styles.error]: !isValidationError.isValid,
                  })}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  ref={passwordRef}
                />

                {isValidationError.error !== null && (
                  <div className={styles.error_text}>
                    {isValidationError.error}
                  </div>
                )}
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Login
