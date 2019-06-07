const defaultUserInfo = {
  name: 'Demo User'
};

export default function reducer(state = {
  user: defaultUserInfo
}, action) {
  return state;
}