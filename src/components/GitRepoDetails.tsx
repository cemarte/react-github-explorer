import * as React from "react";
import { IRepository, IIssue, IUser } from "../types";
import { GitRepoIssuesList } from "./GitRepoIssuesList";
import GitRepoContributorsList from "./GitRepoContributors";

export interface IGitRepoDetailsProps {
  repo: IRepository;
  issues: IIssue[];
  contributors: IUser[];
}
export class GitRepoDetails extends React.Component<IGitRepoDetailsProps, {}> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {}
  public render(): JSX.Element {
    const { contributors, issues, repo } = this.props;
    if (!issues || !repo) {
      return <div>Loading...</div>;
    }
    return (
      <article>
        <header>
          <h2>{repo.full_name}</h2>
          <p>{repo.description}</p>
        </header>
        <main>
          <section className="issues-section">
            <GitRepoIssuesList data={issues} />
          </section>
          <section className="contributors-section">
            <GitRepoContributorsList data={contributors} />
          </section>
        </main>
      </article>
    );
  }
}
export default GitRepoDetails;
