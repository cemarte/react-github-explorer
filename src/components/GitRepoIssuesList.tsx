import * as React from "react";
import { IInjectedProps } from "./WithFetchData";
import { IIssue } from "../types";

export interface IGitRepoIssuesListItem {
  issue: IIssue;
}

export const GitRepoIssuesListItem: React.SFC<IGitRepoIssuesListItem> = ({
  issue
}) => (
  <section className="issues">
    <h4>{issue.title}</h4>
    <p>State: {issue.state}</p>
    <p>Last Update: {issue.updated_at}</p>
  </section>
);
GitRepoIssuesListItem.displayName = "GitRepoIssuesListItem";

export const GitRepoIssuesList: React.SFC<IInjectedProps<IIssue>> = ({
  data,
  isLoading
}) => {
  if (!data || !data.length) {
    return isLoading ? <div>Loading</div> : <div>No Issues</div>;
  }
  return (
    <React.Fragment>
      <h3>Issues ({data.length})</h3>
      {data.map((issue: IIssue) => (
        <GitRepoIssuesListItem issue={issue} key={issue.node_id} />
      ))}
    </React.Fragment>
  );
};

GitRepoIssuesList.displayName = "GitRepoIssuesList";
export default GitRepoIssuesList;
