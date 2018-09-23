import * as React from "react";
import { IRepository } from "../types";
import { GitRepo } from "./GitRepo";
import "./GitRepos.scss";


export class GitRepos extends React.Component<{ repoSelected: (repo: IRepository) => void }, { repos: IRepository[] }> {
    next: string;
    constructor(props: any) {
        super(props);
        this.state = {
            repos: []
        };
    }

    public componentDidMount(): void {
        this.fetchRepos();
    }

    private fetchRepos(): void {
        fetch(this.next || "https://api.github.com/repositories?page=1&per_page=100").then((response) => {
            if (response.ok) {
                this.next = response.headers.get("Link").split(";")[0].replace("<", "").replace(">", "");
                response.json().then((repos) => {
                    this.setState({ repos: [...this.state.repos, ...repos] });
                });
            }
        });

    }

    public render(): JSX.Element {
        const { repos } = this.state;
        if (!repos) {
            return (<div>No repos</div>);
        }
        return (
            <section className="repos">
                {
                    repos.length && repos.map((repo) => (
                        <GitRepo key={repo.id} repo={repo} clicked={this.handleRepoClick} />
                    ))
                }
                <div>
                    <button type="button" onClick={this.loadMore}>Load More</button>
                </div>
            </section>
        );
    }

    private loadMore = () => {
        this.fetchRepos();
    }

    private handleRepoClick = (repoId: number): void => {
        this.props.repoSelected(this.state.repos.find(r => r.id === repoId));
    }
}