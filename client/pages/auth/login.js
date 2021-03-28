import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from 'styles/auth/Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const raw = JSON.stringify({ email, password});

    const requestOptions = {
      method: 'POST',
      body: raw,
      redirect: 'follow'
    };

    const res = await fetch('/api/auth/login', requestOptions);
    const result = await res.json();
    console.log(result);

    if (res.status === '200') {
      router.push('/');
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.main} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="example@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.submit} type="submit" disabled={!validateForm()}>
          Login
        </button>
      </form>
    </div>
  );
}
