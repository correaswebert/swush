import styles from 'styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Swush!</a>
        </h1>

        <p>
          <Link href="/auth/login" className={styles.link}>Login</Link>
          <br></br>
          <Link href="/auth/signup" className={styles.link}>Sign Up</Link>
        </p>
      </main>
    </div>
  );
}
