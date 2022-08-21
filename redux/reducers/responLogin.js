const initialState = {
  email: null,
  name: null,
  profilPic: null,
  detailProfile: null,
  daerah: null,
};

const responLogin = (state = initialState, action) => {
  switch (action.type) {
    case 'RESPON_LOGIN':
      return {
        ...state, //copy all previous states
        email: action.payload.data.email,
        name: action.payload.data.name,
        profilPic: action.payload.data.profile_pic,
        daerah: action.payload.daerah,
      };
    case 'RESPON_LOGOUT':
      return {
        email: null,
        name: null,
        profilPic: null,
        daerah: null,
      };
    case 'DETAIL_PROFILE':
      return {
        ...state,
        detailProfile: action.payload,
      };
    default:
      return state;
  }
};

export default responLogin;
