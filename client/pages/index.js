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
          <Link href="/auth/login">Login</Link>
        </p>
      </main>
    </div>
  );
}
