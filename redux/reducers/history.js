const initialState = {
    history: '',
    historyList: []
  };
  
  const history = (state = initialState, action) => {
    
    switch (action.type) {
      case "APPEND_HISTORY": {
          return {
            ...state,
          historyList: [...state.historyList, action.data]
          }
      }
      default: {
        return state;
      }
    }
  };
  
  export default history;