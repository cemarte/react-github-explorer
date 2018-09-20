import * as React from "react";
import { IRepository } from "../types";
import { GitRepo } from "./GitRepo";
import "./GitRepos.scss";


export class GitRepos extends React.Component<{ repoSelected: (repo: IRepository) => void }, { repos: IRepository[] }> {
    constructor(props: any) {
        super(props);
        this.state = {
            repos: undefined
        };
        this.handleRepoClick = this.handleRepoClick.bind(this);
    }

    public componentDidMount(): void {
        fetch("https://api.github.com/repositories").then((response) => {
            if (response.ok) {
                response.json().then((repos) => {
                    this.setState({ repos: repos });
                });
            }
        });
    }

    private handleRepoClick(repoId: number): void {
        this.props.repoSelected(this.state.repos.find(r=>r.id === repoId));
    }

    public render(): JSX.Element {
        const { repos } = this.state;
        if (!repos) {
            return (<div>No repos</div>);
        }
        return (
            <section className="repos">
                {
                    repos.map((repo) => (
                        <GitRepo key={repo.id} repo={repo} clicked={this.handleRepoClick} />
                    ))
                }
            </section>
        );
    }
}