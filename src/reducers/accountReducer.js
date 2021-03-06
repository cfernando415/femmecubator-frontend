const initialState = {
  currentUser: {},
  isUserLoggedIn: false,
  authenticationStatus: "",
  loginData: {},
  registrationStatus: { error: { message: "" } }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER": {
      return {
        ...state,
        isUserLoggedIn: true,
        currentUser: action.payload,
        authenticationStatus: "LOGIN_SUCCES"
      };
    }
    case "REGISTER_USER": {
      return {
        ...state,
        currentUser: action.payload,
        isUserLoggedIn: true,
        authenticationStatus: "LOGIN_SUCCESS"
      };
    }
    case "REGISTER_USER_FAILURE": {
      return {
        ...state,
        currentUser: {},
        isUserLoggedIn: false,
        authenticationStatus: "",
        registrationStatus: action.payload
      };
    }
    case "LOGIN_USER_FAILURE": {
      return {
        ...state,
        isUserLoggedIn: false,
        authenticationStatus: "LOGIN_FAILURE",
        loginData: action.payload
      };
    }
    case "FETCH_CURRENT_USER_INFO": {
      return {
        ...state,
        isUserLoggedIn: true,
        currentUser: action.payload,
        authenticationStatus: "LOGIN_SUCCESS"
      };
    }
    case "LOGOUT_USER": {
      localStorage.clear();
      return {
        ...state,
        isUserLoggedIn: false,
        currentUser: {},
        authenticationStatus: "",
        registrationStatus: { error: { message: "" } }
      };
    }
    case "CHECK_TOKEN": {
      if (localStorage.getItem("token") !== null)
        return { ...state, isUserLoggedIn: true };
      else return { ...state, isUserLoggedIn: false };
    }
    // case "GET_CURRENT_USER_FROM_STORE": {
    //   // const userInfo = JSON.parse(
    //   //   jwt.decode(localStorage.getItem("userInfo"), "$ec123t")
    //   // );
    //   return { ...state, currentUser: userInfo };
    // }
    case "UPDATE_CURRENT_USER_INFO": {
      return {
        ...state,
        currentUser: action.payload
      };
    }
    case "CLEAR_REGISTRATION_ERROR": {
      return { ...state, registrationStatus: { error: { message: "" } } };
    }
    case "CLEAR_AUTHENTICATION_ERROR": {
      return { ...state, authenticationStatus: "", loginData: {} };
    }
    default:
      return state;
  }
};

export default reducer;
