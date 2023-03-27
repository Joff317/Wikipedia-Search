// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error-msg");
const results = document.querySelector(".results-display");
const loader = document.querySelector(".loader");

form.addEventListener("submit", handleform);

function handleform(e) {
  e.preventDefault();
  if (input.value == "") {
    errorMsg.textContent = "Aie aie quelques chose s'est mal passé";
    return;
  } else {
    errorMsg.textContent = "";
    loader.style.display = "flex";
    results.textContent = "";
    apiCall(input.value);
  }
}

async function apiCall(searchInput) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
    );
    const result = await response.json();

    console.log(result.query.search);
    createContent(result.query.search);
  } catch (error) {
    errorMsg.textContent = `${error}`;
    loader.style.display = "none";
  }
}

function createContent(data) {
  if (!data.length) {
    errorMsg.textContent = "Aucune recherche trouvé";
  } else {
    data.forEach((x) => {
      const url = `https://en.wikipedia.org/?curid=${x.pageid}`;
      const content = document.createElement("div");
      content.className = "results-item";
      content.innerHTML = `
         <h3 class="result-title"> 
            <a href=${url}>${x.title}</a>
         </h3> 
         <a href=${url} class="result-link">${url}</a>
         <span class="result-snippet">${x.snippet}</span>
       `;
      results.appendChild(content);
    });
    loader.style.display = "none";
  }
}
