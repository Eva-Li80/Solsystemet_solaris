const url = "https://majazocom.github.io/Data/solaris.json";

//säkerthetsställer att document laddas innan javascript
document.addEventListener("DOMContentLoaded", function () {

  const sun = document.querySelector("#sun");
  const mercurius = document.querySelector("#mercurius");
  const venus = document.querySelector("#venus");
  const earth = document.querySelector("#earth");
  const mars = document.querySelector("#mars");
  const jupiter = document.querySelector("#jupiter");
  const saturnus = document.querySelector("#saturnus");
  const uranus = document.querySelector("#uranus");
  const neptunus = document.querySelector("#neptunus");

//   const solen = document.querySelector("#sun")

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

  const module = document.getElementById("module");
  const closeModule = document.createElement("div");
  closeModule.classList.add("close")
  closeModule.innerHTML = "&times;";
  module.appendChild(closeModule);

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

  //stänger modulen
  function closeModuleWithX() {
    closeModule.addEventListener("click" ,() => {
       module.style.display = "none"
       currentPlanet = "";
    })
  }

  //för att månarna ska visas på ett bra sätt
  function moonsStyle(planet){
    const moonsArray = [];
    const moonRow = 6;

    for(let i = 0; i < planet.moons.length; i += moonRow){
        const row = planet.moons.slice(i, i + moonRow);
        moonsArray.push(row.join(",  "))
    }

    return moonsArray.join("<br>")
  }

  //skapar och lägger in innehållet om planeterna
  function createContent(planet) {
    if (aboutPlanet) {
      planetName.textContent = planet.name;
      latinName.textContent = planet.latinName;
      description.textContent = planet.desc;
      aboutPlanet.appendChild(planetName);
      aboutPlanet.appendChild(latinName);
      aboutPlanet.appendChild(description);

      circumference.innerHTML = `<h3>OMKRETS</h3> <p>${planet.circumference}</p>`;
      distance.innerHTML = `<h3>KM FRÅN SOLEN</h3> <p>${planet.distance}</p>`;
      maxTemp.innerHTML = `<h3>MAX TEMPERATUR</h3> <p>${planet.temp.day}</p>`;
      minTemp.innerHTML = `<h3>MIN TEMPERATUR</h3> <p>${planet.temp.night}</p>`;
      moreInfo.append(circumference);
      moreInfo.append(distance);
      moreInfo.append(maxTemp);
      moreInfo.append(minTemp);

      moons.innerHTML = `<h3>MÅNAR</h3> <p>${planet.moons ? moonsStyle(planet) : ""}</p>`;
      moonsInfo.append(moons);
    } else {
      console.error("element is null");
    }
  }

  // visar info om de olika planeterna
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
     
        module.style.display ="block"
      } else {
        console.log("Something went wrong!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Something went wrong!", error);
    }

    closeModuleWithX()
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
    console.log(mars)
  });
  jupiter.addEventListener("click", async () => {
    await displayInfoFromPlanet("jupiter");
    console.log(jupiter)
  });
  saturnus.addEventListener("click", async () => {
    await displayInfoFromPlanet("saturnus");
    console.log(saturnus)
  });

  uranus.addEventListener("click", async () => {
    await displayInfoFromPlanet("uranus");
  });
  neptunus.addEventListener("click", async () => {
    await displayInfoFromPlanet("neptunus");
  });
});