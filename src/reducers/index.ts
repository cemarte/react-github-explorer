import { combineReducers } from "redux";
import * as repoActions from "../actions";
const repoReducer = (
  state = { repos: [], issuesMap: {}, contributorsMap: {} },
  action
) => {
  switch (action.type) {
    case repoActions.FETCH_REPOS_REQUEST:
    case repoActions.FETCH_ISSUES_REQUEST: {
      return { ...state, isLoading: true };
    }
    case repoActions.FETCH_REPOS_SUCCESS: {
      return {
        ...state,
        repos: [...state.repos, ...action.payload.data],
        nextLink: action.payload.nextLink,
        isLoading: false
      };
    }
    case repoActions.FETCH_ISSUES_SUCCESS: {
      return {
        ...state,
        issuesMap: {
          ...state.issuesMap,
          ...{
            [action.payload.repoId]: {
              data: action.payload.data,
              nextLink: action.payload.nextLink
            }
          }
        },
        isLoading: false
      };
    }
    case repoActions.FETCH_CONTRIBUTORS_SUCCESS: {
      return {
        ...state,
        contributorsMap: {
          ...state.contributorsMap,
          ...{
            [action.payload.repoId]: {
              data: action.payload.data,
              nextLink: action.payload.nextLink
            }
          }
        },
        isLoading: false
      };
    }
    case repoActions.FETCH_REPOS_FAILURE:
    case repoActions.FETCH_ISSUES_FAILURE: {
      return { ...state, error: action.payload, isLoading: false };
    }
    case repoActions.SELECT_REPO: {
      return { ...state, selectedRepo: action.payload.repo };
    }
    default: {
      return state;
    }
  }
};

const rootReducer = combineReducers({ repository: repoReducer });
export default rootReducer;
