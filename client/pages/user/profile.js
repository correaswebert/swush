import withSession from 'utils/withSession';
import { connectToDatabase } from 'utils/connectDb';
import getAuthenticatedUser from "utils/auth"

export default function UserProfile({ name, publicKey }) {
  return (
    <>
      <h2>{name}</h2>
      <p style={{ fontStyle: 'italic' }}>{publicKey}</p>
    </>
  );
}

// localhost:3000/6083e1a7873fb913a0c6b34e

export const getServerSideProps = withSession(async function ({ query, req, res }) {
  const sessionUser = req.session.get('user');

  if (!sessionUser) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  await connectToDatabase();

  const user = await getAuthenticatedUser(sessionUser.jwt)
  console.log(user);

  return {
    props: {
      name: user.name,
      publicKey: user.publicKey
    },
  };
});
