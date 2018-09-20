import * as React from "react";
import { GitRepos } from "./GitRepos";
import "./App.scss";
import { IRepository } from "../types";
export class App extends React.Component<{}, { selectedRepo: IRepository }> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedRepo: undefined
        };
        this.handleRepoSelected = this.handleRepoSelected.bind(this);
    }

    private handleRepoSelected(repo: IRepository): void {
        this.setState({ selectedRepo: repo });
    }

    public render(): JSX.Element {
        const { selectedRepo } = this.state;
        return (

            <React.Fragment>
                <header>
                    <h1>Repo explorer</h1>
                </header>
                <main>
                    <nav>
                        <GitRepos repoSelected={this.handleRepoSelected}></GitRepos>
                    </nav>
                    <section>
                        {selectedRepo && <h1>{selectedRepo.full_name}</h1>}
                    </section>
                </main>
            </React.Fragment>
        );
    }

}
export default App;