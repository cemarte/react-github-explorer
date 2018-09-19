import * as React from "react";
import { IRepository } from "../types";
import { GitRepo } from "./GitRepo";


export class GitRepos extends React.Component<{}, { repos: IRepository[] }> {
    constructor(props: any) {
        super(props);
        this.state = {
            repos: undefined
        };
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

    public render(): JSX.Element {
        const { repos } = this.state;
        if (!repos) {
            return (<div>No repos</div>);
        }
        return (
            <section className="repos">
                {
                    repos.map((repo) => (
                        <GitRepo repo={repo} />
                    ))
                }
            </section>
        );
    }
}