require("dotenv").config();

const { Octokit } = require("@octokit/rest");
const { application } = require("express");
const JiraApi = require("jira-client");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  baseUrl: "https://api.github.com",
  log: {
    debug: () => {},
    info: () => {},
    warn: console.warn,
    error: console.error,
  },
  request: {
    agent: undefined,
    fetch: undefined,
    timeout: 0,
  },
});

var jira = new JiraApi({
  protocol: "https",
  host: "totalwine.atlassian.net",
  username: process.env.JIRA_USERNAME,
  password: process.env.JIRA_TOKEN,
  apiVersion: "2",
  strictSSL: true,
});

async function findJiraIssue(issueNumber) {
  return new Promise(async (resolve, reject) => {
    jira
      .findIssue(issueNumber)
      .then((issue) => {
        const { summary } = issue.fields;
        console.log("Summary: " + summary);
        resolve({
          title: summary,
          link: `https://totalwine.atlassian.net/browse/${issueNumber}`,
          icon: "bi bi-check-circle-fill",
        });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

let jiraTemplate = {
  icon: "bi bi-check-circle-fill",
};

let errorJiraTemplate = {
  icon: "bi bi-x-circle",
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getIcon() {
  let rNum = getRandomInt(3);
  return rNum >= 1 ? jiraTemplate : errorJiraTemplate;
}

class JiraHandler {
  constructor() {
    this.jirasObject = [];
    this.jiraTicketNumber = [];
  }

  async fetchGitHubData() {
    return new Promise(async (resolve) => {
      const commits = await octokit.rest.repos.listCommits({
        owner: "aindrokov",
        repo: "Engineering-Training",
      });
      resolve(commits);
    });
  }

  getJiraInfo() {
    return new Promise(async (resolve) => {
      this.fetchGitHubData().then((listMyCommits) => {
        let jiraTicketNumber = [];
        let promises = [];
        const regex = /([A-Z][A-Z0-9]+-[0-9]+)/g;
        for (let index = 0; index < listMyCommits.data.length; index++) {
          let ticketNumber =
            listMyCommits.data[index].commit.message.match(regex);
          let indx = jiraTicketNumber.indexOf(ticketNumber);

          if (ticketNumber !== null && indx === -1) {
            jiraTicketNumber.push(ticketNumber);
          } else {
            console.log(jiraTicketNumber + " Jira ticket duplicates");
          }
        }
        console.log(jiraTicketNumber);

        for (let i = 0; i < jiraTicketNumber.length; i++) {
          promises.push(findJiraIssue(jiraTicketNumber[i]));
        }
        Promise.all(promises).then((values) => {
          resolve(values);
        });
      });
    });
  }
}

const jiraHandler = new JiraHandler();

module.exports = jiraHandler;
