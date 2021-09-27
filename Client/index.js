document.querySelector(".button").addEventListener("click", () => {
  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data["data"]));
});

const path = document.getElementById("path");
const add = document.getElementById("add");

let outputs = [];
//let file = { name: "", type: "" };
path.addEventListener("change", (evt) => {
  // const nameInput = document.querySelector("#folder-name");

  let files = evt.target.files; // FileList object

  for (let i = 0, f; (f = files[i]); i++) {
    outputs.push({ name: f.name, type: f.type });
  }
  console.log(outputs);

  // nameInput.value = "";

  // fetch("http://localhost:5000/insert", {
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  //   method: "POST",
  //   body: JSON.stringify({ name: name, type: type }),
  // })
  //   .then((response) => response.json())
  //   .then((data) => insertRowIntoTable(data["data"]));
});

add.addEventListener("click", () => {
  outputs.forEach((output) => {
    const name = output.name;
    const filetype = output.type;

    fetch("http://localhost:5000/insert", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: name, filetype: filetype }),
    })
      .then((response) => response.json())
      .then((data) => insertRowIntoTable(data["data"]));
  });
});

const searchBtn = document.querySelector("#search-btn");

searchBtn.onclick = function (e) {
  e.preventDefault();
  const searchValue = document.querySelector("#search-input").value;
  console.log("search");

  fetch("http://localhost:5000/search/" + searchValue)
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data["data"]));
};

const insertRowIntoTable = (data) => {
  //   console.log(data);
  //   // const table = document.querySelector("table tbody");
  //   // const isTableData = table.querySelector(".no-data");
  //   // let tableHtml = "<tr>";
  //   // for (var key in data) {
  //   //   if (data.hasOwnProperty(key)) {
  //   //     if (key === "dateAdded") {
  //   //       data[key] = new Date(data[key]).toLocaleString();
  //   //     }
  //   //     tableHtml += `<td>${data[key]}</td>`;
  //   //   }
  //   // }
  //   // tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
  //   // tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;
  //   // tableHtml += "</tr>";
  //   // if (isTableData) {
  //   //   table.innerHTML = tableHtml;
  //   // } else {
  //   //   const newRow = table.insertRow();
  //   //   newRow.innerHTML = tableHtml;
  //   // }
};

const loadHTMLTable = (data) => {
  const table = document.querySelector("table tbody");

  console.log(data);
  if (data.length === 0) {
    table.innerHTML += `<tr><td class="no-data" colspan=5>NO DATA</td></tr>`;
    return;
  }
  let tableHtml = "";

  data.forEach(function ({ id, name, type, date }) {
    tableHtml += "<tr>";
    tableHtml += `<td>${id}</td>`;
    tableHtml += `<td>${name}</td>`;
    tableHtml += `<td>${type}</td>`;
    tableHtml += `<td>${new Date(date).toLocaleString()}</td>`;

    tableHtml += "</tr>";
  });

  table.innerHTML = tableHtml;
};
