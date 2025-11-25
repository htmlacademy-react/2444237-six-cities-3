import styles from './spinner.module.css'

const Spinner = (): JSX.Element => {
  return (
    <div className={styles.loading}>
      <div>
        <h1 className={styles.title}>Loading...</h1>
      </div>
    </div>
  )
}

export default Spinner
