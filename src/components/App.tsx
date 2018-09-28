import * as React from "react";
import { GitRepoList } from "./GitRepos";
import "./App.scss";
import { IRepository, IIssue, IUser } from "../types";
import { GitRepoDetails } from "./GitRepoDetails";

import { observer, inject } from "mobx-react";
import { RepositoryStore } from "../store";
@inject("store")
@observer
export class App extends React.Component<
  {
    store?: RepositoryStore;
    // repos: IRepository[];
    // issuesMap: { [repoId: string]: { data: IIssue[]; nextLink: string } };
    // contributorsMap: { [repoId: string]: { data: IUser[]; nextLink: string } };
    // isLoading: boolean;
    // fetchMore: () => {};
    // error?: Error;
    // dispatch: Dispatch<any>;
    // selectedRepo: IRepository;
  },
  {}
> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedRepo: undefined
    };
  }

  public componentDidMount() {
    this.props.store ? this.props.store.fetchRepos() : null;
  }

  public render(): JSX.Element {
    if (this.props.store) {
      const { repos } = this.props.store;

      return (
        <React.Fragment>
          <header className="repo-header">
            <h1>Repo explorer</h1>
          </header>
          <main>
            <nav className="repo-list">
              <GitRepoList
                data={repos}
                isLoading={false}
                onFetchMore={this.handleFetchMore}
                repoSelected={this.handleRepoSelected}
              />
            </nav>
            {/* <section className="repo-details">
              {this.renderSelectedRepo(selectedRepo)}
            </section> */}
          </main>
        </React.Fragment>
      );
    }
    return <div>Loading...</div>;
  }

  // private renderSelectedRepo(selectedRepo: IRepository) {
  //   if (selectedRepo) {
  //     const contributors = this.props.contributorsMap[selectedRepo.id].data,
  //       issues = this.props.issuesMap[selectedRepo.id].data;
  //     return (
  //       <GitRepoDetails
  //         contributors={contributors}
  //         repo={selectedRepo}
  //         issues={issues}
  //       />
  //     );
  //   }
  // }

  private handleRepoSelected = (repo: IRepository): void => {
    // this.props.dispatch(selectRepo(repo));
  };

  private handleFetchMore = (): void => {
    // this.props.dispatch(loadRepos(true));
  };
}
