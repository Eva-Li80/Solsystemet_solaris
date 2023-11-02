const url = "https://majazocom.github.io/Data/solaris.json";

//säkerthetsställer att document laddas innan javascript
document.addEventListener("DOMContentLoaded", function () {
  //planetelementen hämtas och läggs in i varabler
  const sun = document.querySelector("#sun");
  const mercurius = document.querySelector("#mercurius");
  const venus = document.querySelector("#venus");
  const earth = document.querySelector("#earth");
  const mars = document.querySelector("#mars");
  const jupiter = document.querySelector("#jupiter");
  const saturnus = document.querySelector("#saturnus");
  const uranus = document.querySelector("#uranus");
  const neptunus = document.querySelector("#neptunus");

  // Modul elementen hämtas och läggs in i variable
  const aboutPlanet = document.querySelector("#about-planet");
  const planetName = document.getElementById("planet-name");
  const latinName = document.getElementById("latin-name");
  const description = document.getElementById("description");
  const planetDetails = document.querySelector("#planet-details");
  const circumference = document.getElementById("circumference");
  const distance = document.getElementById("distance");
  const maxTemp = document.getElementById("max-temp");
  const minTemp = document.getElementById("min-temp");
  const planetMoons = document.querySelector("#planet-moons");
  const moons = document.getElementById("moons");

  //Modulens conatiner och stängnings knapp X skapas
  const module = document.getElementById("module");
  const closeModule = document.createElement("div");
  closeModule.classList.add("close");
  closeModule.innerHTML = "&times;";
  module.appendChild(closeModule);

  //Heading
  const heading = document.querySelector("#heading");
  const subHeading = document.querySelector("#subheading");

  //Hålla reda på den aktuella planeten
  let currentPlanet;

  //Hämtar api
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

  //Skapar stjärnor och gör så att dem visas random och med olika färger
  function createStars() {
    const numsOfStars = 40;
    stars.innerHTML = "";
    for (let i = 0; i < numsOfStars; i++) {
      const star = document.createElement("div");
      star.classList.add("star");

      if (i % 2 === 0) {
        star.style.color = "rgb(42, 45, 62)";
      } else if (i % 2 === 1) {
        star.style.color = "rgb(61, 68, 108)";
      }
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.position = "absolute";
      stars.appendChild(star);
    }
  }

  /*Stänger modulen. Denna fanns inte med på skissen men jag valde att lägga till den. 
   Jag ansåg att det blev mer tydligt, då man kan se var man stänger modulen.
   Den  återställer vissa element  */
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

  //Månarna visas på ett bra sätt och lägger sig på rader under varandra.
  function moonsStyle(planet) {
    const moonsArray = [];
    const moonRow = 6;

    for (let i = 0; i < planet.moons.length; i += moonRow) {
      const row = planet.moons.slice(i, i + moonRow);
      moonsArray.push(row.join(",  "));
    }
    return moonsArray.join("<br>");
  }

  /* Kunde använt slice och join mm i nån function, men för att testa något annat lånade jag denna function addSpacesToNumber() 
  från nätet för att formatera siffrona (vilket jag hoppas är ok om man säger 
    att man just lånat den :) )
  Förklaring:
   \B matchar den exakta positionen där man vill ha mellanslag.
    (?=(\d{3})+(?!\d)) matchar ett mönster 3 siffror som är följt utan 3 siffror sätter mellanslaget där emellan
    g gör så att det regulära uttrycket letar upp förekomster av mönstret i hela strängen */
  function addSpacesToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  //skapar och lägger in innehållet om planeterna. Här i anropas addspaceToNumber och moonsStyle functionen
  function createContent(planet) {
    if (aboutPlanet) {
      planetName.textContent = planet.name.toUpperCase();
      latinName.textContent = planet.latinName.toUpperCase();
      description.textContent = planet.desc;
      aboutPlanet.appendChild(planetName);
      aboutPlanet.appendChild(latinName);
      aboutPlanet.appendChild(description);

      circumference.innerHTML = `<h3>OMKRETS</h3> <p>${addSpacesToNumber(
        planet.circumference
      )} km</p>`;
      distance.innerHTML = `<h3>KM FRÅN SOLEN</h3> <p>${addSpacesToNumber(
        planet.distance
      )} km</p>`;
      maxTemp.innerHTML = `<h3>MAX TEMPERATUR</h3> <p>${addSpacesToNumber(
        planet.temp.day
      )}C</p>`;
      minTemp.innerHTML = `<h3>MIN TEMPERATUR</h3> <p>${addSpacesToNumber(
        planet.temp.night
      )}C</p>`;
      planetDetails.append(circumference);
      planetDetails.append(distance);
      planetDetails.append(maxTemp);
      planetDetails.append(minTemp);

      moons.innerHTML = `<h3>MÅNAR</h3> <p>${
        planet.moons ? moonsStyle(planet) : ""
      }</p>`;
      planetMoons.append(moons);
    } else {
      alert("element is null");
    }
  }

  /* Här i hämtas api med funktionen fetchApi och visar info om de olika planeterna,
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
        closeModule.style.display = "block";
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Something went wrong!", error);
    }

    closeModuleWithX();
    createStars();
  }

  /*För att kunna trycka på läggs det till en eventlistener och öppnar de olika planeterna anropas displayInfoFromPlanet 
  som visar modulen med info */
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

/*Jag funderade på att bryta ut koden mer i olika filer men landade i att det inte är
 ett jätte stort projekt. Så jag delade bara upp stylingen så att modulen med den nya bakgrunden har en css fil och
den övriga stylingen till planeterna i en annan css fil.
Förövrigt har jag försökt att bryta ut koden till egna funktioner, beroende på vad dem har för uppgift
*/

