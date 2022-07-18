(async function () {
  console.log("Engineering Training!");

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
      this.createJiraObject();
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
  }

  const jiraHandler = new JiraHandler(links, titles);

  function initModalButton() {
    return new Promise((resolve) => {
    var dataLoaded = false;
    const modalButton = document.getElementById("modalButton");
    modalButton.addEventListener("click", () => {
      if (dataLoaded === false) {
        utils.loadData(() => {
          resolve();
              dataLoaded = true;
            })
      }
    });
    })
  }

  const utils = {
    loadData: async function (callback) {
      const response = await fetch("/getJiraTickets");
      const data = await response.json();
      console.log(data);
      setTimeout(whenCloseClicked, 1000);

      setTimeout(() => {
        this.renderData().then((response) => {
          list[0].innerHTML = response;
          return response;
        });
      }, 2000);
      callback();

      setTimeout(() => {
        let modalContainer = document.getElementById("modal");
        modalContainer.classList.add("hidden");
      }, 2000);
    },
    renderData: function () {
      return new Promise((resolve) => {
        let response = "";
        jiraHandler.jirasObject.forEach((element) => {
          let { link, title, icon } = element;
          response += `<li class="item"><a href= ${link}> 
        <i class="${icon}">
        </i> ${title} 
        </a></li>`;
        });
        resolve(response);
      });
    },
  };

  function whenCloseClicked() {
    console.log("Clicked Close!");
    let modalContainer = document.getElementById("modal");
    modalContainer.classList.toggle("hidden");
  }

  const closeModalButton = document.getElementsByClassName("closeModal");

  closeModalButton[0].addEventListener("click", whenCloseClicked);

  const list = document.getElementsByClassName("grid-container");

  console.log("BEFORE initModalButton is called");
  await initModalButton();
  console.log("AFTER initModalButton is called");

})();
