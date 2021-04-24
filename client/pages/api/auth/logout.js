import withSession from 'utils/withSession';

const LogoutApi = async (req, res) => {
  req.session.destroy();
  res.status(200).json({ Info: 'Logged out successfully' });
};

export default withSession(LogoutApi);
