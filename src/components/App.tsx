import * as React from "react";
import { GitRepoList } from "./GitRepos";
import "./App.scss";
import { IRepository } from "../types";
import { GitRepoDetails } from "./GitRepoDetails";
import { loadRepos, selectRepo } from "../actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
export class App extends React.Component<
  {
    repos: IRepository[];
    isLoading: boolean;
    fetchMore: () => {};
    error?: Error;
    dispatch: Dispatch<any>;
  },
  { selectedRepo: IRepository }
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
    const { selectedRepo } = this.state;
    return (
      <React.Fragment>
        <header className="repo-header">
          <h1>Repo explorer</h1>
        </header>
        <main>
          <nav className="repo-list">
            <GitRepoList
              data={this.props.repos}
              isLoading={this.props.isLoading}
              onFetchMore={this.props.fetchMore}
              repoSelected={this.handleRepoSelected}
              error={this.props.error}
            />
          </nav>
          <section className="repo-details">
            {selectedRepo && <GitRepoDetails repo={selectedRepo} />}
          </section>
        </main>
      </React.Fragment>
    );
  }

  private handleRepoSelected = (repo: IRepository): void => {
    this.props.dispatch(selectRepo(repo));
  };
}

export default connect(
  state => ({
    repos: state.repository.repos,
    isLoading: state.repository.isLoading,
    error: state.repository.error
  }),
  (dispacth, getState) => ({})
)(App);
