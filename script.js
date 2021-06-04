const searchResult = document.querySelector(".search_result");
const searchRequestBtn = document.querySelector("#search_request_btn");
const objectSearchInput = document.querySelector("#object_search_input");
const typeSearchSelect = document.querySelector("#type_search_select");
const personData = document.querySelector(".person_data");

let objArr = [];
const request = new XMLHttpRequest();

searchRequestBtn.addEventListener("click", searchRequest);

function searchRequest(ev) {
  ev.preventDefault();
  const api = "https://swapi.dev/api/";
  let url = api + typeSearchSelect.value + "/?search=";

  if (objectSearchInput.value.trim() === "") {
    alert("Поле поиска не может быть пустым");
  } else {
    url += objectSearchInput.value;
    new Promise(function (resolve, reject) {
      request.open("GET", url);
      request.responseType = "json";
      request.send();
      request.onload = function () {
        if (request.status !== 200) {
          reject(request.response);
        } else {
          resolve(request.response);
        }
      };
      request.onerror = function() {
        reject("Ошибка");
      }
    }).then(function (result) {
      if (result.count > 0) {
        fillFields(result);
      } else {
        alert("По запросу ничего не найдено!");
      }
      
    }).catch(function(err) {
    alert(err);      
    });
  }
}

function fillFields(resp) {
  objArr = resp.results;

  if (searchResult.children.length !== 0) searchResult.textContent = "";
  if (personData.children.length !== 0) personData.textContent = "";

  if (typeSearchSelect.value === "people") {
    resp.results.forEach((elem) => liCreate(elem));

    searchResult.addEventListener("click", function (ev) {
      const target = ev.target;
      const obj = objArr.find((item) => item.name === target.textContent);

      if (target.tagName !== "LI") return;
      if (personData.children.length !== 0) personData.textContent = "";

      const contentPersonData = `<p> Имя: ${obj.name}</p> 
        <p>Рост: ${obj.height}</p>
        <p>Вес: ${obj.mass}</p>
        <p>Год рождения: ${obj.birthYear}</p>
        <p>Количество фильмов: ${obj.films.length}</p>`;

      personData.insertAdjacentHTML("beforeend", contentPersonData);
    });
  } else if (typeSearchSelect.value === "starships") {
    resp.results.forEach((elem) => liCreate(elem));

    searchResult.addEventListener("click", function (ev) {
      const target = ev.target;
      const obj = objArr.find((item) => item.name === target.textContent);

      if (target.tagName !== "LI") return;
      if (personData.children.length !== 0) personData.textContent = "";

      const contentPersonData = `<p> Имя: ${obj.name}</p> 
        <p>Длина: ${obj.length}</p>
        <p>Производитель: ${obj.manufacturer}</p>
        <p>Когда создан: ${obj.created}</p>
        <p>Количество фильмов: ${obj.films.length}</p>`;

      personData.insertAdjacentHTML("beforeend", contentPersonData);
    });
  } else if (typeSearchSelect.value === "planets") {
    resp.results.forEach((elem) => liCreate(elem));

    searchResult.addEventListener("click", function (ev) {
      const target = ev.target;
      const obj = objArr.find((item) => item.name === target.textContent);

      if (target.tagName !== "LI") return;
      if (personData.children.length !== 0) personData.textContent = "";

      const contentPersonData = `<p> Имя: ${obj.name}</p> 
        <p>Диаметр: ${obj.diameter}</p>
        <p>Гравитация: ${obj.gravity}</p>
        <p>Популяция: ${obj.population}</p>
        <p>Количество фильмов: ${obj.films.length}</p>`;

      personData.insertAdjacentHTML("beforeend", contentPersonData);
    });
  }
}

function liCreate(el) {
  const li = document.createElement("li");
  li.textContent = el.name;
  searchResult.append(li);
}
