const initialState = {
  email: null,
  name: null,
  profilPic: null,
};

const responLogin = (state = initialState, action) => {
  switch (action.type) {
    case 'RESPON_LOGIN':
      return {
        ...state, //copy all previous states
        email: action.payload.email,
        name: action.payload.name,
        profilPic: action.payload.profile_pic,
      };
    case 'RESPON_LOGOUT':
      return {
        email: null,
        name: null,
        profilPic: null,
      };
    default:
      return state;
  }
};

export default responLogin;
