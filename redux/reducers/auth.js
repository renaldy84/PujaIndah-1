
const initialState = {
    status:false
};

const auth = (state = initialState, action) => {
  
  switch (action.type) {
    case "LOGIN": {
        return {
            ...state,
            status: true,
        }
    }
    case "LOGOUT": {
        return {
          status: false,
        }
    }
    default: {
      return state;
    }
  }
};

export default auth;