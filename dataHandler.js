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
      //   resolve(issue, titles, links);
      // })
      .then((issue) => {
        //console.log("Summary: " + issue.fields.summary);
        const { summary } = issue.fields;
        console.log("Summary: " + summary);
        resolve({
          title: summary,
          link: `https://totalwine.atlassian.net/browse/${issueNumber}`,
        });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

const titles = [
  "Create and publish a public repository in GitHub under your personal account named 'Engineering Training'",
  "Create index.html with basic html markup and perform first commit",
  "Add anchor tags for each completed subtasks",
  "Make unordered list of anchor tags",
  "Add the TWM logo as an image to the beginning of the body of the page",
  "Add style attributes to img tag to setting the height and width of the logo",
  "Add a head, add a style tag to the head, add a class to style tag, move logo styles to style tag, remove inline styles from logo, add class to the logo",
  "Add a selector inside style tag that targets the list items and removes the bullet",
  "Pseudo-selectors - Add hover styling to list elements",
  "UI Libraries - Add Bootstrap to your page, add check icons to your list, and convert your list into a bootstrap list-group",
];

const links = [
  "https://totalwine.atlassian.net/browse/DIG-70749",
  "https://totalwine.atlassian.net/browse/DIG-70771",
  "https://totalwine.atlassian.net/browse/DIG-70804",
  "https://totalwine.atlassian.net/browse/DIG-70805",
  "https://totalwine.atlassian.net/browse/DIG-70905",
  "https://totalwine.atlassian.net/browse/DIG-70918",
  "https://totalwine.atlassian.net/browse/DIG-70993",
  "https://totalwine.atlassian.net/browse/DIG-71030",
  "https://totalwine.atlassian.net/browse/DIG-71062",
  "https://totalwine.atlassian.net/browse/DIG-71085",
];

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
  constructor(links, titles) {
    this.links = links;
    this.titles = titles;
    this.jirasObject = [];
    this.jiraTicketNumber = [];
    this.createJiraObject();
    this.fetchGitHubData();
    this.getJiraInfo();
  }
  createJiraObject() {
    for (let index = 0; index < this.titles.length; index++) {
      let icon = getIcon();
      this.jirasObject.push({
        title: this.titles[index],
        link: this.links[index],
        ...icon,
      });
    }
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
        console.log(values);
      });
    });
  }
}

const jiraHandler = new JiraHandler(links, titles);

module.exports = jiraHandler;
