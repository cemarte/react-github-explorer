import { IRepository } from "../types";

export const FETCH_REPOS_REQUEST = "FETCH_REPOS_REQUEST";
export const FETCH_REPOS_SUCCESS = "FETCH_REPOS_SUCCESS";
export const FETCH_REPOS_FAILURE = "FETCH_REPOS_FAILURE";

export function loadRepos() {
  // Interpreted by the thunk middleware:
  return function(dispatch, getState) {
    const { repos } = getState();
    if (repos) {
      // There is cached data! Don't do anything.
      return;
    }
    dispatch({
      type: FETCH_REPOS_REQUEST
    });
    // Dispatch vanilla actions asynchronously
    fetch("https://api.github.com/repositories").then(
      response =>
        response.json().then(data =>
          dispatch({
            type: FETCH_REPOS_SUCCESS,
            payload: data
          })
        ),
      error =>
        dispatch({
          type: FETCH_REPOS_FAILURE,
          payload: error
        })
    );
  };
}

export const SELECT_REPO = "SELECT_REPO";
export function selectRepo(repo: IRepository) {
  return { type: SELECT_REPO, payload: { repo } };
}
