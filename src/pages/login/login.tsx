import styles from './login.module.css'
import cn from 'classnames'
import { loginAction } from '@/store/auth/api-actions'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { selectAuthorizationStatus, selectLoginStatus } from '@/store/auth/selectors'
import Header from '@/components/header/header'
import { AppRoute, AuthorizationStatus } from '@/const'
import { Navigate, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { getRandomCity } from './utils'
import { setCity } from '@/store/app-slice/app-slice'

const loginSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z
    .string()
    .min(2, 'Пароль минимум 2 символа')
    .refine((password) => /[a-zA-Z]/.test(password), {
      message: 'Пароль должен содержать хотя бы одну букву',
    })
    .refine((password) => /\d/.test(password), {
      message: 'Пароль должен содержать хотя бы одну цифру',
    }),
})

type LoginData = z.infer<typeof loginSchema>

const Login = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoading } = useAppSelector(selectLoginStatus)
  const authorizationStatus = useAppSelector(selectAuthorizationStatus)

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />
  }

  const randomCity = useMemo(
    () => getRandomCity(),
    [],
  )

  const handleClickCity = () => {
    if (!randomCity) {
      return
    }

    dispatch(setCity(randomCity))
    navigate(AppRoute.Main);
  }

  const onSubmit = (data: LoginData) => {
    dispatch(loginAction(data))
  }

  return (
    <div className="page page--gray page--login">
      <Header withUserNav={false} />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={(evt) => {
                evt.preventDefault()
                handleSubmit(onSubmit)()
              }}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className={cn('login__input form__input', {
                    [styles.error]: !!errors.email,
                  })}
                  type="email"
                  placeholder="Email"
                  required
                  {...register('email')}
                />

                {errors.email && (
                  <div className={styles.error_text}>
                    {errors.email?.message}
                  </div>
                )}
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className={cn('login__input form__input', {
                    [styles.error]: !!errors.password,
                  })}
                  type="password"
                  placeholder="Password"
                  required
                  {...register('password')}
                />

                {errors.password && (
                  <div className={styles.error_text}>
                    {errors.password?.message}
                  </div>
                )}
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Sign in'}
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#" onClick={handleClickCity}>
                <span>{randomCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Login
