import Logo from '@/components/logo/logo'
import { AppRoute } from '@/const'
import styles from './login.module.css'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { loginAction } from '@/store/auth/api-actions'
import { useAppDispatch } from '@/hooks'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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

const defaultValues: LoginData = {
  email: '',
  password: '',
}

const Login = (): JSX.Element => {
  const {
    register,
    getValues,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    const data = getValues()
    dispatch(loginAction(data))
    navigate(AppRoute.Main)
    reset()
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
              onSubmit={onSubmit}
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
                disabled={isSubmitting}
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
