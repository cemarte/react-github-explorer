import * as React from "react";
import { IRepository } from "../types";
import { WithFetchData } from "./WithFetchData";
import { GitRepoIssuesList } from "./GitRepoIssuesList";
import GitRepoContributorsList from "./GitRepoContributors";


// tslint:disable-next-line:typedef
const WithFetchDataGitIssuesList = WithFetchData(GitRepoIssuesList);
// tslint:disable-next-line:typedef
const WithFetchDataGitContributorsList = WithFetchData(GitRepoContributorsList);

export interface IGitRepoDetailsProps {
    repo: IRepository;
}
export class GitRepoDetails extends React.Component<IGitRepoDetailsProps, {}> {
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
                    <section className="issues-section">
                        <WithFetchDataGitIssuesList key={`issues-for-${repo.node_id}`} url={repo.issues_url.replace("{/number}", "")} />
                    </section>
                    <section className="contributors-section">
                        <WithFetchDataGitContributorsList key={`contributors-for-${repo.node_id}`}  url={repo.contributors_url} />
                    </section>
                </main>
            </article>
        );
    }
}
export default GitRepoDetails;