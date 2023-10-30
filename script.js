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
  const uranus = document.querySelector("#mercurius");
  const neptunus = document.querySelector("#neptunus");


  const solen = document.querySelector("#sun")
  const about = document.querySelector("#about-planet");
  const name = document.querySelector("#planet-name");
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

  function createContent(planet) {
    name.textContent = planet.name;
    about.appendChild(name);
  }

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
        solen.style.backgroundColor = "red"
        
      } else {
        console.log("Something went wrong!");
      }
    } catch (error) {
      throw new Error("Something went wrong!", error);
    }
  }

  sun.addEventListener("click", async () => {
    await displayInfoFromPlanet("solen");
  });
  mercurius.addEventListener("click", async () => {
    await displayInfoFromPlanet("merkurius");
  });
  venus.addEventListener("click", async () => {
    await displayInfoFromPlanet("merkurius");
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
