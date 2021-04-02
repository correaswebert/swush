import auth from 'utils/auth';

export default async (req, res) => {
  try {
    const { jwt } = req.body;
    const user = await getAuthenticatedUser(jwt);

    user.tokens = user.tokens.filter((token) => jwt != token.token);

    await user.save();
    res.status(200).send({ Info: 'Logged out successfully' });
  } catch (error) {
    res.status(500).send({ Error: 'Internal server error' });
  }
};
