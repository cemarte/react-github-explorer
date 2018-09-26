import * as React from "react";
import { IUser } from "../types";
import './GitRepoUser.scss';
export const GitRepoUser: React.SFC<{ user: IUser }> = ({ user }) => {
  if (user) {
    return (
      <aside className="git-user">
        <div className="img-wrapper" style={{backgroundImage:`url(${user.avatar_url})`}}>
        </div>
        <div className="user-info">
          <h5>{user.login}</h5>
          <a href={user.url} />
        </div>
      </aside>
    );
  }
};

GitRepoUser.displayName = "GitRepoUser";
export default GitRepoUser;
