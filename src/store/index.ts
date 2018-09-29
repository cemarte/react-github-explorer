import { observable, action, reaction, computed } from "mobx";
import { IRepository, IIssue, IUser } from "../types";

export class RepositoryStore {
  @observable
  public repos: IRepository[] = [];
  @observable
  public selectedRepo?: IRepository;
  @observable
  public issuesMap: { [repoId: string]: IIssue[] } = {};
  @observable
  public contributorsMap: { [repoId: string]: IUser[] } = {};
  @observable
  public nextLink: string = "";

  constructor() {
    reaction(
      () => this.selectedRepo,
      selectedRepo => {
        this.fetchContributors(selectedRepo);
        this.fetchIssues(selectedRepo);
      }
    );
  }
  @action
  selectRepo(repo: IRepository): any {
    this.selectedRepo = repo;
  }

  @computed
  get getSelectedRepoContributors() {
    return this.selectedRepo &&
      this.contributorsMap[this.selectedRepo.id.toString()]
      ? this.contributorsMap[this.selectedRepo.id.toString()]
      : undefined;
  }
  @computed
  get getSelectedRepoIssues() {
    return this.selectedRepo &&
      this.issuesMap[this.selectedRepo.id.toString()]
      ? this.issuesMap[this.selectedRepo.id.toString()]
      : undefined;
  }

  @action
  fetchRepos(loadMore?: boolean) {
    let url = "https://api.github.com/repositories";
    if (loadMore) {
      url = this.nextLink;
    }
    if (!loadMore && this.repos && this.repos.length) {
      // There is cached data! Don't do anything.
      return;
    }
    // Dispatch vanilla actions asynchronously
    fetch(url).then(
      response => {
        if (response.ok) {
          this.nextLink = getNextLink(response.headers);
          response.json().then(data => {
            this.repos = data;
          });
        }
      },
      error => {}
    );
  }

  @action
  fetchIssues(repository?: IRepository) {
    if (repository && !this.issuesMap[repository.id.toString()])
      fetch(repository.issues_url.replace("{/number}", "")).then(
        response => {
          if (response.ok) {
            // this.nextLink = getNextLink(response.headers);
            response.json().then(data => {
              this.issuesMap[repository.id.toString()] = data;
            });
          }
        },
        error => {}
      );
  }
  @action
  fetchContributors(repository?: IRepository) {
    if (repository && !this.contributorsMap[repository.id.toString()])
      fetch(repository.contributors_url).then(
        response => {
          if (response.ok) {
            // this.nextLink = getNextLink(response.headers);
            response.json().then(data => {
              this.contributorsMap[repository.id.toString()] = data;
            });
          }
        },
        error => {}
      );
  }
}

export const store = new RepositoryStore();

function getNextLink(headers: Headers): string {
  const link = headers.get("Link");
  if (link) {
    return link
      .split(";")[0]
      .replace("<", "")
      .replace(">", "");
  }
  return "";
}
