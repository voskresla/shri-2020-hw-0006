const initialSettingsState = {
  repoName: "default repoName",
  buildCommand: "default build command",
  mainBranch: "default main branch",
  period: 0
};

export default (state = initialSettingsState, action) => {
  switch (action.type) {
    case "SAVE_SETTINGS":
      return action.payload;
    default:
      return state;
  }
};
