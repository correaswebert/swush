import withSession from 'utils/withSession';

function handleUser(req, res) {
  const user = req.session.get('user');
  res.send({ user });
}

export default withSession(handleUser);
