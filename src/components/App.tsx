import * as React from "react";
import { GitRepoList } from "./GitRepos";
import "./App.scss";
import { IRepository } from "../types";
import { GitRepoDetails } from "./GitRepoDetails";
import { WithFetchData } from "./WithFetchData";

// tslint:disable-next-line:typedef
const WithFetchDataRepos = WithFetchData(GitRepoList);

export class App extends React.Component<{}, { selectedRepo: IRepository }> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedRepo: undefined
        };
    }

    public render(): JSX.Element {
        const { selectedRepo } = this.state;
        return (
            <React.Fragment>
                <header className="repo-header">
                    <h1>Github Repo explorer</h1>
                </header>
                <main>
                    <nav className="repo-list">
                        <WithFetchDataRepos
                            url="https://api.github.com/repositories"
                            repoSelected={this.handleRepoSelected}>
                        </WithFetchDataRepos>
                    </nav>
                    <section className="repo-details">
                        {selectedRepo && <GitRepoDetails repo={selectedRepo} />}
                    </section>
                </main>
            </React.Fragment>
        );
    }

    private handleRepoSelected = (repo: IRepository): void => {
        this.setState({ selectedRepo: repo });
    }
}
export default App;