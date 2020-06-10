let listItems = document.getElementsByClassName("student-item cf");
let itemsPerPage = 10;
let pageDiv = document.getElementsByClassName("page")[0];
let searchDiv = document.createElement("div");
searchDiv.className = "student-search";
let searchBar = document.createElement("input");
searchBar.placeholder = "Search for students...";
let searchButton = document.createElement("button");
searchButton.textContent = "Search";
searchDiv.appendChild(searchButton);
searchDiv.insertBefore(searchBar, searchButton);
let headerDiv = document.getElementsByClassName("page-header cf")[0];
headerDiv.appendChild(searchDiv);

/**
 * showPage determines which objects will be visible on a given page provided the page number and an array of objects.
 *
 * @param {array} list - the given array of student objects that is paginated
 * @param {number} page - the given page number
 */

function showPage(list, page) {
  let startIndex = page * itemsPerPage - itemsPerPage;
  let endIndex = page * itemsPerPage;
  for (let i = 0; i < list.length; i += 1) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = "block";
    } else {
      list[i].style.display = "none";
    }
  }
}

/**
 * appendPages creates links to as many pages are necessary to display the objects of a given array across multiple pages, with no more than a certain number of objects per page.
 *
 * @param {array} list - the given array of student objects that is paginated
 */

function appendPages(list) {
  let pageNumbersDiv = document.createElement("div");
  pageNumbersDiv.className = "pagination";
  let ul = document.createElement("ul");

  let pagesNeeded = parseInt(list.length / itemsPerPage);
  if (list.length % itemsPerPage !== 0) {
    pagesNeeded += 1;
  }

  pageDiv.appendChild(pageNumbersDiv);
  pageNumbersDiv.appendChild(ul);

  for (let i = 1; i <= pagesNeeded; i += 1) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    ul.appendChild(li);
    li.appendChild(a);
    a.text = i.toString();
    a.href = "#";

    if (a.textContent === "1") {
      a.className = "active";
    }

    a.addEventListener("click", e => {
      let links = document.getElementsByTagName("a");

      for (i = 0; i < links.length; i += 1) {
        links[i].className = "";
      }

      e.target.className = "active";

      showPage(listItems, parseInt(e.target.textContent));
    });
  }
}

/**
 * searchFunctionality displays results of student objects that include a given string provided by user in the searchbar. If no results are found, an error message is displayed.
 */

function searchFunctionality() {
  let searchInput = searchBar.value;
  let resultsFound = [];
  for (let i = 0; i < listItems.length; i += 1) {
    listItems[i].style.display = "none";
    if (
      searchInput.length !== 0 &&
      listItems[i].textContent.toLowerCase().includes(searchInput.toLowerCase())
    ) {
      listItems[i].style.display = "block";
      resultsFound.push(listItems[i]);
    } else if (searchInput.length === 0) {
      resultsFound.push(listItems[i]);
    }
  }
  let message = document.getElementById("sorry");
  if (message) {
    pageDiv.removeChild(message);
  }
  if (resultsFound.length === 0) {
    let notFoundMessage = document.createElement("p");
    notFoundMessage.textContent = "Sorry, no results found.";
    notFoundMessage.id = "sorry";
    pageDiv.appendChild(notFoundMessage);
  }
  pageDiv.removeChild(document.getElementsByClassName("pagination")[0]);
  showPage(resultsFound, 1);
  appendPages(resultsFound);
}

searchBar.addEventListener("keyup", searchFunctionality);

searchButton.addEventListener("submit", searchFunctionality);

showPage(listItems, 1);
appendPages(listItems);
