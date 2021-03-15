export default function Signup() {
  return (
    <>
      <form method="post" action="">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />

        <button type="submit">Signup</button>
      </form>

      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
}
