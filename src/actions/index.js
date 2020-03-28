// import API
import api from "../api/schoolciserver";

// CONST
export const SAVE_SETTINGS = "SAVE_SETTINGS";
export const FETCH_SETTINGS_BEGIN = "FETCH_SETTINGS_BEGIN";
export const FETCH_SETTINGS_SUCCESS = "FETCH_SETTINGS_SUCCESS";
export const FETCH_SETTINGS_ERROR = "FETCH_SETTINGS_ERROR";

export const saveSettings = payload => {
  return {
    type: SAVE_SETTINGS,
    payload: payload
  };
};

export const getSettingsFromYNDX = () => async dispatch => {
  console.log("fire get from YNDX");
  // START FETCHING
  dispatch({ type: FETCH_SETTINGS_BEGIN });
  // SUCCESS FETCHING
  try {
    // NOTE: не напиши сюда dispatch:SAVE_SETTINGS, считаю что плохо размазывать, вызови лучше функцию в логике компонента
    const response = await api.get("/settings");
    dispatch({ type: FETCH_SETTINGS_SUCCESS });
    return Promise.resolve(response);
  } catch (e) {
    dispatch({ type: FETCH_SETTINGS_ERROR });
    return Promise.reject();
  }
};
