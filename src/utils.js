const list = document.getElementsByClassName("grid-container");

const utils = {
  loadData: async function (callback) {
    const response = await fetch("/getJiraTickets");
    const data = await response.json();
    console.log(data);

    this.renderData(data).then((response) => {
      list[0].innerHTML = response;
      return response;
    });
    callback();
  },
  renderData: function (data) {
    return new Promise((resolve) => {
      let response = "";
      data.jirasObject.forEach((element) => {
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

export default utils;
