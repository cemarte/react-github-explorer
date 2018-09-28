import { observable, action, reaction, computed } from "mobx";
import { IRepository } from "../types";

export class RepositoryStore {
  @observable
  repos: IRepository[] = [];
  @observable
  nextLink: string = "";

  constructor() {
    reaction(
      () => this.repos.filter(repo => !repo.private),
      privateRepos => {
        if (privateRepos.length > 5) {
          alert("You've got private repos");
        }
      }
    );
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
  fetchIssues(repoId: string) {
    
  }
  @action
  fetchContributors(repoId: string) {
    
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
