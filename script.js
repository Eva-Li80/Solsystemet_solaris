const url = "https://majazocom.github.io/Data/solaris.json";

//säkerthetsställer att document laddas innan javascript
document.addEventListener("DOMContentLoaded", function () {
    
    //komma åt planetelementen
  const sun = document.querySelector("#sun");
  const mercurius = document.querySelector("#mercurius");
  const venus = document.querySelector("#venus");
  const earth = document.querySelector("#earth");
  const mars = document.querySelector("#mars");
  const jupiter = document.querySelector("#jupiter");
  const saturnus = document.querySelector("#saturnus");
  const uranus = document.querySelector("#uranus");
  const neptunus = document.querySelector("#neptunus");

  // för att få in data till modulens element
  const aboutPlanet = document.querySelector("#about-planet");
  const planetName = document.getElementById("planet-name");
  const latinName = document.getElementById("latin-name");
  const description = document.getElementById("description");
  const moreInfo = document.querySelector("#more-info");
  const circumference = document.getElementById("circumference");
  const distance = document.getElementById("distance");
  const maxTemp = document.getElementById("max-temp");
  const minTemp = document.getElementById("min-temp");
  const moonsInfo = document.querySelector("#moons-info");
  const moons = document.getElementById("moons");

  //modulens conatiner element och stänga X elementet
  const module = document.getElementById("module");
  const closeModule = document.createElement("div");
  closeModule.classList.add("close");
  closeModule.innerHTML = "&times;";
  module.appendChild(closeModule);

  //heading element
  const heading = document.querySelector("#heading");
  const subHeading = document.querySelector("#subheading");

  let currentPlanet;

  //hämtar api
  async function fetchApi(apiUrl) {
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      throw new Error("Something went wrong!", error);
    }
  }

  const stars = document.querySelector(".stars");

  //för att skapa stjärnor och göra så att dem visas random och med olika färger
  function createStars() {
    const numsOfStars = 40;
    stars.innerHTML = ""
    for (let i = 0; i < numsOfStars; i++) {
      const star = document.createElement("div");
      star.classList.add("star");

      if (i % 2 === 0) {
        star.style.color = "rgb(42, 45, 62)"
      }
      else if(i % 2 === 1){
        star.style.color = "rgb(61, 68, 108)";
      }
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.position="absolute"
      stars.appendChild(star);
    }
  }

  //stänger modulen
  function closeModuleWithX() {
    closeModule.addEventListener("click", () => {
      module.style.display = "none";
      heading.classList.remove("active");
      subHeading.classList.remove("active");
      sun.classList.remove("active");
      mercurius.classList.remove("active");
      venus.classList.remove("active");
      earth.classList.remove("active");
      mars.classList.remove("active");
      jupiter.classList.remove("active");
      saturnus.classList.remove("active");
      uranus.classList.remove("active");
      neptunus.classList.remove("active");
      stars.classList.remove("active");
      closeModule.classList.remove("active");
      currentPlanet = "";
    });
  }

  //för att månarna ska visas på ett bra sätt och lägga sig på rader under varandra.
  function moonsStyle(planet) {
    const moonsArray = [];
    const moonRow = 6;

    for (let i = 0; i < planet.moons.length; i += moonRow) {
      const row = planet.moons.slice(i, i + moonRow);
      moonsArray.push(row.join(",  "));
    }

    return moonsArray.join("<br>");
  }

  //skapar och lägger in innehållet om planeterna
  function createContent(planet) {
    if (aboutPlanet) {
      planetName.textContent = planet.name.toUpperCase();
      latinName.textContent = planet.latinName.toUpperCase();
      description.textContent = planet.desc;
      aboutPlanet.appendChild(planetName);
      aboutPlanet.appendChild(latinName);
      aboutPlanet.appendChild(description);

      circumference.innerHTML = `<h3>OMKRETS</h3> <p>${planet.circumference} km</p>`;
      distance.innerHTML = `<h3>KM FRÅN SOLEN</h3> <p>${planet.distance} km</p>`;
      maxTemp.innerHTML = `<h3>MAX TEMPERATUR</h3> <p>${planet.temp.day}C</p>`;
      minTemp.innerHTML = `<h3>MIN TEMPERATUR</h3> <p>${planet.temp.night}C</p>`;
      moreInfo.append(circumference);
      moreInfo.append(distance);
      moreInfo.append(maxTemp);
      moreInfo.append(minTemp);

      moons.innerHTML = `<h3>MÅNAR</h3> <p>${
        planet.moons ? moonsStyle(planet) : ""
      }</p>`;
      moonsInfo.append(moons);
    } else {
      console.error("element is null");
    }
  }

  /* använder hämta api funktionen och  visar info om de olika planeterna,
  då createContent anropas. Även closeModule och createStars amropas i denna function  */
  async function displayInfoFromPlanet(infoPlanet) {
    try {
      const api = await fetchApi(url);
      const data = await api;
      const planet = data.find(
        (p) => p.name.trim().toLowerCase() === infoPlanet.trim().toLowerCase()
      );
      if (planet) {
        createContent(planet);
        currentPlanet = infoPlanet;
        module.style.display = "block";
        heading.classList.add("active");
        subHeading.classList.add("active");
        sun.classList.add("active");
        mercurius.classList.add("active");
        venus.classList.add("active");
        earth.classList.add("active");
        mars.classList.add("active");
        jupiter.classList.add("active");
        saturnus.classList.add("active");
        uranus.classList.add("active");
        neptunus.classList.add("active");
        stars.classList.add("active");
        closeModule.style.display ="block"
      } else {
        console.log("Something went wrong!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Something went wrong!", error);
    }

    closeModuleWithX();
    createStars();
  }

  //För att kunna trycka på och öppna de olika planeterna
  sun.addEventListener("click", async () => {
    await displayInfoFromPlanet("solen");
  });
  mercurius.addEventListener("click", async () => {
    await displayInfoFromPlanet("merkurius");
  });
  venus.addEventListener("click", async () => {
    await displayInfoFromPlanet("venus");
  });
  earth.addEventListener("click", async () => {
    await displayInfoFromPlanet("jorden");
  });
  mars.addEventListener("click", async () => {
    await displayInfoFromPlanet("mars");
  });
  jupiter.addEventListener("click", async () => {
    await displayInfoFromPlanet("jupiter");
  });
  saturnus.addEventListener("click", async () => {
    await displayInfoFromPlanet("saturnus");
  });

  uranus.addEventListener("click", async () => {
    await displayInfoFromPlanet("uranus");
  });
  neptunus.addEventListener("click", async () => {
    await displayInfoFromPlanet("neptunus");
  });
});
