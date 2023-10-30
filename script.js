const url = "https://majazocom.github.io/Data/solaris.json";

document.addEventListener("DOMContentLoaded", function () {

  const mercurius = document.querySelector("#mercurius");

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
      } else {
        console.log("Something went wrong!");
      }
    } catch (error) {
      throw new Error("Something went wrong!", error);
    }
  }

  mercurius.addEventListener("click", async () => {
    await displayInfoFromPlanet("merkurius");
  });
});
