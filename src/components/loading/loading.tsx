import styles from './loading.module.css'

const Loading = (): JSX.Element => {
  return (
    <div className={styles.loading}>
      <h1 className={styles.title}>Loading...</h1>
    </div>
  )
}

export default Loading
