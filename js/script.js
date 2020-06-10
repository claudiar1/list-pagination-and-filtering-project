let listItems = document.getElementsByClassName("student-item cf");
let itemsPerPage = 10;

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

function createSearch() {
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
}

function appendPages(list) {
  let pageDiv = document.getElementsByClassName("page")[0];
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

createSearch();
showPage(listItems, 1);
appendPages(listItems);
