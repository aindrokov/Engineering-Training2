const INITIAL_STATE = {
  data: {},
  dataLoaded: false,
  loading: false,
  error: "This is an error message",
};

function dataLoadedReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "TOGGLE_DATALOADED":
      return {
        ...state,
        dataLoaded: !state.dataLoaded,
        loading: false,
      };
    default:
      return state;
    case "DATA_LOADING":
      return {
        ...state,
        loading: action.loading,
      };
    case "DATA_SUCCESS":
      return {
        ...state,
        data: action.data,
      };
    case "DATA_FAILURE":
      return {
        ...state,
        error: action.error,
        loading: false,
      };
  }
}

export default dataLoadedReducer;
