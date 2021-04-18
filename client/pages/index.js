import styles from 'styles/Home.module.css';

export default function Home() {
  return (
    <>
      <a className={styles.card2} href="/auth/login">
        Login
      </a>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="#">Swush!</a>
          </h1>

          <p className={styles.description}>
            <code className={styles.code}>Get started by creating a secret</code>
          </p>

          <div className={styles.grid}>
            <a href="/dashboard" className={styles.card}>
              <h3>Dashboard &rarr;</h3>
              <p>Checkout your secrets hidden safely in our vaults</p>
            </a>

            <a href="/auth/signup" className={styles.card}>
              <h3>Get Started &rarr;</h3>
              <p>All your secrets safe at one place. No more team passwords!</p>
            </a>
          </div>
        </main>
      </div>
    </>
  );
}
