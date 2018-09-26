import { combineReducers } from "redux";
import * as repoActions from "../actions";
const repoReducer = (state = {}, action) => {
  switch (action.type) {
    case repoActions.FETCH_REPOS_REQUEST: {
      return { ...state, isLoading: true };
    }
    case repoActions.FETCH_REPOS_SUCCESS: {
      return { ...state, repos: action.payload.data, isLoading: true };
    }
    case repoActions.FETCH_REPOS_FAILURE: {
      return { ...state, error: action.payload.data, isLoading: true };
    }
    case repoActions.SELECT_REPO: {
      return { ...state, selectedRepoId: action.payload.data.id };
    }
    default: {
      return state;
    }
  }
};

const rootReducer = combineReducers({ repository: repoReducer });
export default rootReducer;
