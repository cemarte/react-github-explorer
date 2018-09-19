import * as React from "react";
import { IRepository } from "../types";

export interface IProps { repo: IRepository; }

export const GitRepo: React.SFC<IProps> = ({ repo }) => (
    <article className="git-repo">
        <h3>{repo.full_name}</h3>
        <h4>{repo.name}</h4>
        <p>
            {repo.description}
        </p>
    </article>
);

export default GitRepo;
