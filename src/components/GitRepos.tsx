import * as React from "react";
import { IRepository } from "../types";
import { GitRepoListItem } from "./GitRepo";
import "./GitRepos.scss";
import { IInjectedProps } from "./WithFetchData";

export interface IGitRepoListProps {
  repoSelected: (repo: IRepository) => void;
}

export class GitRepoList extends React.Component<
  IInjectedProps<IRepository> & IGitRepoListProps,
  { data: IRepository }
> {
  constructor(props: any) {
    super(props);
  }

  public render(): JSX.Element {
    const { data, isLoading } = this.props;
    if (!data) {
      return isLoading ? <div>Loading...</div> : <div>No Repositories</div>;
    }
    return (
      <section className="repos">
        {this.renderRepos(data)}
        <div>
          <button type="button" onClick={this.props.onFetchMore}>
            Load More
          </button>
        </div>
      </section>
    );
  }

  private renderRepos = (repos: IRepository[]): JSX.Element[] => {
    return (
      repos.length &&
      repos.map(repo => (
        <GitRepoListItem
          key={repo.node_id}
          repo={repo}
          clicked={this.handleRepoClick}
        />
      ))
    );
  };

  private handleRepoClick = (repoId: number): void => {
    this.props.repoSelected(this.props.data.find(r => r.id === repoId));
  };
}
