import * as React from "react";
import { IRepository } from "../types";

export class GitRepoDetails extends React.Component<{ repo: IRepository }, { issues: any[] }> {
    constructor(props: any) {
        super(props);
        this.state = {
            issues: undefined
        };
    }
    public render(): JSX.Element {
        const { repo } = this.props;
        const { issues } = this.state;
        return (
            <article>
                <header>
                    <h2>{repo.full_name}</h2>
                    <p>{repo.description}</p>
                </header>
                <main>
                    <section>
                        {repo.owner.login}
                    </section>
                    <section>
                        {issues && issues.map(issue => (
                            <h3>{issue.title}</h3>
                        ))}
                    </section>
                </main>
            </article>
        );
    }
    /**
     * componentDidMount
     */
    public componentDidMount(): void {
        const { repo } = this.props;
        if (!this.state.issues) {

            fetch(repo.issues_url.replace("{/number}", "")).then(response => {
                if (response.ok) {
                    response.json().then(issues => {
                        this.setState({ issues });
                    });
                }
            }).catch(console.error);
        }
    }
}
export default GitRepoDetails;