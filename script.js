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
  const latinName = document.getElementById("latin-name")
  const description = document.getElementById("description")

  const moreInfo = document.querySelector("#more-info");
  const circumference = document.getElementById("circumference")
  const distance = document.getElementById("distance")
  const maxTemp = document.getElementById("max-temp")
  const minTemp = document.getElementById("min-temp")

  const moonsInfo = document.querySelector("#moons-info")
  const moons = document.getElementById("moons")

  let currentPlanet;

  async function fetchApi(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      throw new Error("Something went wrong!", error);
    }
  }


  //skapar och lägger in innehållet om planeterna
  function createContent(planet) {
    if(aboutPlanet){
        planetName.textContent = planet.name;
        latinName.textContent = planet.latinName
        description.textContent = planet.desc
        aboutPlanet.appendChild(planetName);
        aboutPlanet.appendChild(latinName)
        aboutPlanet.appendChild(description)

        circumference.textContent = planet.circumference
        distance.textContent = planet.distance
        maxTemp.textContent = planet.temp.day
        minTemp.textContent = planet.temp.night
        moreInfo.append(circumference)
        moreInfo.append(distance)
        moreInfo.append(maxTemp)
        moreInfo.append(minTemp)

        moons.textContent = planet.moons || ""
        moonsInfo.append(moons)
    }else {
        console.error("element is null")
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
        // solen.style.backgroundColor = "red"
        
      } else {
        console.log("Something went wrong!");
      }
    } catch (error) {
        console.error("Error fetching data:", error);
      throw new Error("Something went wrong!", error);
    }
  }


  //eventlistener till de olika planeterna
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
