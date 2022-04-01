const initialState = {
  status: false,
  apiToken: '',
  email: '',
  name: '',
  fotoProfile: '',
};

const auth = (state = initialState, action) => {
  console.log(action.data);
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        status: true,
        apiToken: 'action.data.api_token',
        email: 'action.data.email',
        name: 'action.data.name',
        // fotoProfile: action.data.profile_pic,
        fotoProfile:
          'https://fashionsista.co/wallpaper/wallpaper/20210811/foto-cowok-keren-buat-profil-fb-foto-foto-keren-preview.jpg',
      };
    }
    case 'LOGOUT': {
      return {
        status: false,
        apiToken: '',
        email: '',
        name: '',
        fotoProfile: '',
      };
    }
    default: {
      return state;
    }
  }
};

export default auth;
