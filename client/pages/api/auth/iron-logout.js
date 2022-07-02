import withSession from 'utils/withSession';

function handleLogout(req, res) {
  req.session.destroy();
  res.send('Logged out');
}

export default withSession(handleLogout);
