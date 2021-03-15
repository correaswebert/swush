import Head from 'next/head';
import Link from 'next/link';

import styles from './styles/Layout.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Swush | A secure vault for teams</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <main>{children}</main>

      <footer className={styles.footer_wrapper}>
        <div className={styles.footer_container}>
          <div className={styles.footer_item}>
            &copy; {new Date().getFullYear()} - A product of
            <Link href="https://github.com/aayushhyadav"> Aayush Yadav</Link> and{' '}
            <Link href="https://swebert.codes"> Swebert Correa</Link>
          </div>

          <div className={styles.footer_item}>
            <Link href="#">Homepage</Link>
            <Link href="#">What is Swush?</Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
