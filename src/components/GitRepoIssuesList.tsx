import * as React from "react";
import { IInjectedProps } from "./WithFetchData";
import { IIssue } from "../types";

export const GitRepoIssuesListItem: React.SFC<{ issue: IIssue }> = ({ issue }) => (
    <section className="issues">
        <h4>{issue.title}</h4>
        <p>State: {issue.state}</p>
        <p>Last Update: {issue.updated_at}</p>
    </section>
);
GitRepoIssuesListItem.displayName = "GitRepoIssuesListItem";

export const GitRepoIssuesList: React.SFC<IInjectedProps<IIssue>> = ({ data }) => {
    if (data && data.length) {
        return <React.Fragment>
        <h3>Issues</h3>
        {data.map((issue: IIssue) => <GitRepoIssuesListItem issue={issue} key={issue.node_id} />)}
        </React.Fragment>;
    }
    return (<h3>No Issues</h3>);
};

GitRepoIssuesList.displayName = "GitRepoIssuesList";
export default GitRepoIssuesList;