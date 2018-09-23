import * as React from "react";
import { IRepository } from "../types";
import { GitRepo } from "./GitRepo";
import "./GitRepos.scss";
import { IInjectedProps } from "./WithFetchData";


export class GitRepos extends React.Component<IInjectedProps & { repoSelected: (repo: IRepository) => void }, { data: IRepository[] }> {
    constructor(props: any) {
        super(props);
    }

    public render(): JSX.Element {
        const { data } = this.props;
        if (!data) {
            return (<div>Loading...</div>);
        }
        return (
            <section className="repos">
                {
                    this.renderRepos(data)
                }
                <div>
                    <button type="button" onClick={this.props.onFetchMore}>Load More</button>
                </div>
            </section>
        );
    }

    private renderRepos(repos: IRepository[]): JSX.Element[] {
        return repos.length && repos.map((repo) => (
            <GitRepo key={repo.id} repo={repo} clicked={this.handleRepoClick} />
        ));
    }

    private handleRepoClick = (repoId: number): void => {
        this.props.repoSelected(this.props.data.find(r => r.id === repoId));
    }
}