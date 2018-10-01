import * as React from "react";
import { GitRepoList } from "./GitRepos";
import "./App.scss";
import { IRepository, IIssue, IUser } from "../types";
import { GitRepoDetails } from "./GitRepoDetails";
import { loadRepos, selectRepo } from "../actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
export class App extends React.Component<
  {
    repos: IRepository[];
    issuesMap: { [repoId: string]: { data: IIssue[]; nextLink: string } };
    contributorsMap: { [repoId: string]: { data: IUser[]; nextLink: string } };
    isLoading: boolean;
    fetchMore: () => {};
    error?: Error;
    dispatch: Dispatch<any>;
    selectedRepo: IRepository;
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
    this.props.dispatch(loadRepos());
  }

  public render(): JSX.Element {
    const { isLoading, repos, selectedRepo } = this.props;

    return (
      <React.Fragment>
        <header className="repo-header">
          <h1>Github Repo Explorer</h1>
        </header>
        <main>
          <nav className="repo-list">
            <GitRepoList
              data={repos}
              isLoading={isLoading}
              onFetchMore={this.handleFetchMore}
              repoSelected={this.handleRepoSelected}
            />
          </nav>
          <section className="repo-details">
            {this.renderSelectedRepo(selectedRepo)}
          </section>
        </main>
      </React.Fragment>
    );
  }

  private renderSelectedRepo(selectedRepo: IRepository) {
    if (selectedRepo && this.props.contributorsMap[selectedRepo.id] && this.props.issuesMap[selectedRepo.id]) {
      const contributors = this.props.contributorsMap[selectedRepo.id].data,
        issues = this.props.issuesMap[selectedRepo.id].data;
      return (
        <GitRepoDetails
          contributors={contributors}
          repo={selectedRepo}
          issues={issues}
        />
      );
    }
  }

  private handleRepoSelected = (repo: IRepository): void => {
    this.props.dispatch(selectRepo(repo));
  };

  private handleFetchMore = (): void => {
    this.props.dispatch(loadRepos(true));
  };
}

export default connect(state => ({
  selectedRepo: state.repository.selectedRepo,
  repos: state.repository.repos,
  nextLink: state.repository.nextLink,
  contributorsMap: state.repository.contributorsMap,
  issuesMap: state.repository.issuesMap,
  isLoading: state.repository.isLoading,
  error: state.repository.error
}))(App);
