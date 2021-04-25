export default Object.freeze({
  LOGIN: Symbol('LOGIN'),
  LOGOUT: Symbol('LOGOUT'),

  GOT_TEAM: Symbol('GOT_TEAM'),
  GOT_SECRET: Symbol('GOT_SECRET'),
  GOT_SECRET_DES: Symbol('GOT_SECRET_DES'),

  SELECT_TEAM: Symbol('SELECT_TEAM'),
  SELECT_SECRET: Symbol('SELECT_SECRET'),
  SELECTED_SECRET: Symbol('SELECTED_SECRET'),
  SELECTED_DES: Symbol('SELECTED_DES'),
  SELECTED_SEC_ID: Symbol('SELECTED_SEC_ID'),

  ALL_DESCRIPTIONS: Symbol('ALL_DESCRIPTIONS'),
  ALL_SECRETS: Symbol('ALL_SECRETS'),

  TOGGLE_DIALOG: Symbol('TOGGLE_DIALOG'),
  SET_NAME: Symbol('SET_NAME'),
});