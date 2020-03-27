const fetchUserToken = () => {
  const store = window.localStorage;
  if (!store) {
    // TODO: Handle this shit :P
    return null;
  }
  return store.getItem('token');
};

export const requireAuthentication = () => {
  const token = fetchUserToken();
  if (!token) {
    // ideally there should be a token verification here
    return true;
  }
  return false;
};

export const redirectIfAuthenticated = () => {
  const token = fetchUserToken();
  if (token) {
    return true;
  }
  return false;
};

export const setToken = (token) => {
  const store = window.localStorage;
  if (!store) {
    return null;
  }
  return store.setItem('token', token);
};


export const purgeToken = () => {
  const store = window.localStorage;
  if (!store) {
    return null;
  }
  return store.removeItem('token');
};

export const getToken = fetchUserToken;
