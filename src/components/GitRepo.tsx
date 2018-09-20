import * as React from "react";
import { IRepository } from "../types";
import "./GitRepo.scss";

export interface IProps { repo: IRepository; clicked: (id: number) => void; }

export const GitRepo: React.SFC<IProps> = ({ repo, clicked }) => (
    <article className="git-repo" onClick={()=>clicked(repo.id)}>
        <h3>{repo.full_name}</h3>
        <h4>{repo.name}</h4>
        <p>
            {repo.description}
        </p>
    </article>
);

export default GitRepo;
