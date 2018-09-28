// import { IRepository } from "../types";

// export const FETCH_REPOS_REQUEST = "FETCH_REPOS_REQUEST";
// export const FETCH_REPOS_SUCCESS = "FETCH_REPOS_SUCCESS";
// export const FETCH_REPOS_FAILURE = "FETCH_REPOS_FAILURE";

// export function loadRepos(loadMore?: boolean) {
//   // Interpreted by the thunk middleware:
//   return function(dispatch, getState) {
//     const { repos, nextLink } = getState();
//     let url = "https://api.github.com/repositories";
//     if(loadMore){
//       url = nextLink;
//     }
//     if (!loadMore && repos) {
//       // There is cached data! Don't do anything.
//       return;
//     }
//     dispatch({
//       type: FETCH_REPOS_REQUEST
//     });
//     // Dispatch vanilla actions asynchronously
//     fetch(url).then(
//       response => {
//         if (response.ok) {
//           const nextLink = getNextLink(response.headers);
//           response.json().then(data =>
//             dispatch({
//               type: FETCH_REPOS_SUCCESS,
//               payload: { data, nextLink }
//             })
//           );
//         }
//       },
//       error =>
//         dispatch({
//           type: FETCH_REPOS_FAILURE,
//           payload: error
//         })
//     );
//   };
// }

// export const SELECT_REPO = "SELECT_REPO";
// export function selectRepo(repo: IRepository) {
//   return function(dispatch, getState) {
//     dispatch({ type: SELECT_REPO, payload: { repo } });
//     dispatch(loadIssues(repo.issues_url, repo.id));
//     dispatch(loadContributors(repo.contributors_url, repo.id));
//   };
// }

// export const FETCH_ISSUES_REQUEST = "FETCH_ISSUES_REQUEST";
// export const FETCH_ISSUES_SUCCESS = "FETCH_ISSUES_SUCCESS";
// export const FETCH_ISSUES_FAILURE = "FETCH_ISSUES_FAILURE";
// export function loadIssues(url: string, repoId: number) {
//   // Interpreted by the thunk middleware:
//   return function(dispatch, getState) {
//     const { issuesMap } = getState();
//     if (issuesMap && issuesMap[repoId]) {
//       // There is cached data! Don't do anything.
//       return;
//     }
//     dispatch({
//       type: FETCH_ISSUES_REQUEST
//     });
//     // Dispatch vanilla actions asynchronously
//     fetch(url.replace("{/number}", "")).then(
//       response => {
//         if (response.ok) {
//           const nextLink = getNextLink(response.headers);
//           response.json().then(data =>
//             dispatch({
//               type: FETCH_ISSUES_SUCCESS,
//               payload: { repoId: repoId.toString(), data, nextLink }
//             })
//           );
//         }
//       },
//       error =>
//         dispatch({
//           type: FETCH_ISSUES_FAILURE,
//           payload: error
//         })
//     );
//   };
// }

// export const FETCH_CONTRIBUTORS_REQUEST = "FETCH_CONTRIBUTORS_REQUEST";
// export const FETCH_CONTRIBUTORS_SUCCESS = "FETCH_CONTRIBUTORS_SUCCESS";
// export const FETCH_CONTRIBUTORS_FAILURE = "FETCH_CONTRIBUTORS_FAILURE";
// export function loadContributors(url: string, repoId: number) {
//   // Interpreted by the thunk middleware:
//   return function(dispatch, getState) {
//     const { contributorsMap } = getState();
//     if (contributorsMap && contributorsMap[repoId]) {
//       // There is cached data! Don't do anything.
//       return;
//     }
//     dispatch({
//       type: FETCH_CONTRIBUTORS_REQUEST
//     });
//     // Dispatch vanilla actions asynchronously
//     fetch(url).then(
//       response => {
//         if (response.ok) {
//           const nextLink = getNextLink(response.headers);
//           response.json().then(data =>
//             dispatch({
//               type: FETCH_CONTRIBUTORS_SUCCESS,
//               payload: { repoId: repoId.toString(), data, nextLink }
//             })
//           );
//         }
//       },
//       error =>
//         dispatch({
//           type: FETCH_CONTRIBUTORS_FAILURE,
//           payload: error
//         })
//     );
//   };
// }

// function getNextLink(headers: Headers): string {
//   const link: string = headers.get("Link");
//   if (link) {
//     return link
//       .split(";")[0]
//       .replace("<", "")
//       .replace(">", "");
//   }
//   return "";
// }
