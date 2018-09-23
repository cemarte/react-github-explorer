import * as React from "react";
import { IUser } from "../types";
import { IInjectedProps } from "./WithFetchData";

export const GitRepoContributorsList: React.SFC<IInjectedProps<IUser>> = ({ data }) => {
    if (data && data.length) {
        return (
            <React.Fragment>
                <h3>Contributors</h3>
                <ul>
                    {data.map(contrib => <li key={contrib.node_id}>{contrib.login}</li>)}
                </ul>
            </React.Fragment>
        );
    }
    return null;
};

GitRepoContributorsList.displayName = "GitRepoContributorsList";
export default GitRepoContributorsList;