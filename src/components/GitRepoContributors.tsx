import * as React from "react";
import { IUser } from "../types";
import { IInjectedProps } from "./WithFetchData";
import GitRepoUser from "./GitRepoUser";

export const GitRepoContributorsList: React.SFC<IInjectedProps<IUser>> = ({
  data
}) => {
  if (data && data.length) {
    return (
      <React.Fragment>
        <h3>Contributors</h3>
        <ul>
          {data.map(contrib => (
            <GitRepoUser key={contrib.node_id} user={contrib} />
          ))}
        </ul>
      </React.Fragment>
    );
  }
  return null;
};

GitRepoContributorsList.displayName = "GitRepoContributorsList";
export default GitRepoContributorsList;
