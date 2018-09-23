import * as React from "react";
import { IRepository } from "../types";
import { WithFetchData } from "./WithFetchData";
import { GitRepoIssuesList } from "./GitRepoIssuesList";


// tslint:disable-next-line:typedef
const WithFetchDataGitIssuesList = WithFetchData(GitRepoIssuesList);

export interface IProps {
    repo: IRepository;
}
export class GitRepoDetails extends React.Component<IProps, { }> {
    constructor(props: any) {
        super(props);
    }
    public render(): JSX.Element {
        const { repo } = this.props;
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
                        <WithFetchDataGitIssuesList key={`issues-for-${repo.node_id}`} url={repo.issues_url.replace("{/number}", "")}/>
                    </section>
                </main>
            </article>
        );
    }
}
export default GitRepoDetails;