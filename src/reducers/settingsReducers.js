import * as types from "../actions/";
const initialSettingsState = {
  repoName: "default repoName",
  buildCommand: "default build command",
  mainBranch: "default main branch",
  period: 0
};

export default (state = initialSettingsState, action) => {
  console.log("action.payload from settingsReducer:", action.payload);
  switch (action.type) {
    case types.SAVE_SETTINGS:
      return action.payload;
    default:
      return state;
  }
};
