import * as React from "react";
import { IInjectedProps } from "./WithFetchData";
import { IIssue } from "../types";

export const GitRepoIssuesListItem: React.SFC<{ issue: IIssue }> = ({ issue }) => (
    <section className="issues">
        <h3>{issue.title}</h3>
        <p>State: {issue.state}</p>
        <p>Last Update: {issue.updated_at}</p>
    </section>
);

export const GitRepoIssuesList: React.SFC<IInjectedProps<IIssue>> = ({ data }) => {
    if (data && data.length) {
        return <React.Fragment>{data.map((issue: IIssue) => <GitRepoIssuesListItem issue={issue} key={issue.node_id} />)}</React.Fragment>;
    }
    return (<h3>No Issues</h3>);
};

GitRepoIssuesList.displayName = "GitRepoIssuesList";
export default GitRepoIssuesList;