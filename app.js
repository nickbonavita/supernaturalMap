const episodes = [
  {
    id: "s01e01",
    season: 1,
    episode: 1,
    title: "Pilot",
    creature: "Woman in White",
    threat: "high",
    location: "Lawrence, Kansas",
    lat: 38.9717,
    lng: -95.2353,
    note: "Sam rejoins Dean when a case mirrors their mother’s death.",
  },
  {
    id: "s02e01",
    season: 2,
    episode: 1,
    title: "In My Time of Dying",
    creature: "Reaper",
    threat: "high",
    location: "Sioux Falls, South Dakota",
    lat: 43.5446,
    lng: -96.7311,
    note: "Dean hovers near death while a reaper stalks the hospital.",
  },
  {
    id: "s03e01",
    season: 3,
    episode: 1,
    title: "The Magnificent Seven",
    creature: "Seven Deadly Sins Demons",
    threat: "severe",
    location: "Lincoln, Nebraska",
    lat: 40.8136,
    lng: -96.7026,
    note: "Seven demons escape Hell’s Gate and spread chaos across town.",
  },
  {
    id: "s04e01",
    season: 4,
    episode: 1,
    title: "Lazarus Rising",
    creature: "Angels and Demons",
    threat: "severe",
    location: "Pittsburgh, Pennsylvania",
    lat: 40.4406,
    lng: -79.9959,
    note: "Dean returns from Hell and Castiel enters the hunt.",
  },
  {
    id: "s05e01",
    season: 5,
    episode: 1,
    title: "Sympathy for the Devil",
    creature: "Lucifer",
    threat: "severe",
    location: "Detroit, Michigan",
    lat: 42.3314,
    lng: -83.0458,
    note: "Lucifer is free, escalating the apocalypse-level hunt.",
  },
  {
    id: "s06e01",
    season: 6,
    episode: 1,
    title: "Exile on Main St.",
    creature: "Djinn",
    threat: "medium",
    location: "Lawrence, Kansas",
    lat: 38.9717,
    lng: -95.2353,
    note: "Dean is pulled back into hunting after a string of attacks.",
  },
  {
    id: "s07e01",
    season: 7,
    episode: 1,
    title: "Meet the New Boss",
    creature: "Leviathans",
    threat: "severe",
    location: "Cheyenne, Wyoming",
    lat: 41.14,
    lng: -104.8202,
    note: "Leviathans emerge as a dominant threat after Castiel breaks.",
  },
  {
    id: "s08e01",
    season: 8,
    episode: 1,
    title: "We Need to Talk About Kevin",
    creature: "Demons",
    threat: "high",
    location: "Grand Junction, Colorado",
    lat: 39.0639,
    lng: -108.5506,
    note: "Sam returns to hunting while Kevin deciphers the demon tablet.",
  },
  {
    id: "s09e01",
    season: 9,
    episode: 1,
    title: "I Think I’m Gonna Like It Here",
    creature: "Fallen Angels",
    threat: "high",
    location: "Des Moines, Iowa",
    lat: 41.5868,
    lng: -93.625,
    note: "The angel fall reshapes the supernatural battlefield.",
  },
  {
    id: "s10e01",
    season: 10,
    episode: 1,
    title: "Black",
    creature: "Demon Dean",
    threat: "severe",
    location: "Atlanta, Georgia",
    lat: 33.749,
    lng: -84.388,
    note: "Dean embraces the Mark’s corruption while Sam searches for a cure.",
  },
  {
    id: "s11e01",
    season: 11,
    episode: 1,
    title: "Out of the Darkness, Into the Fire",
    creature: "The Darkness",
    threat: "severe",
    location: "Lebanon, Kansas",
    lat: 39.8097,
    lng: -98.5556,
    note: "The release of Amara creates a world-level threat.",
  },
  {
    id: "s12e01",
    season: 12,
    episode: 1,
    title: "Keep Calm and Carry On",
    creature: "Lady Toni / BMOL",
    threat: "medium",
    location: "Lawrence, Kansas",
    lat: 38.9717,
    lng: -95.2353,
    note: "Mary returns as the British Men of Letters arrive in force.",
  },
  {
    id: "s13e01",
    season: 13,
    episode: 1,
    title: "Lost and Found",
    creature: "Asmodeus",
    threat: "high",
    location: "Paterson, New Jersey",
    lat: 40.9168,
    lng: -74.1718,
    note: "Jack’s emergence collides with escalating prince-of-hell politics.",
  },
  {
    id: "s14e01",
    season: 14,
    episode: 1,
    title: "Stranger in a Strange Land",
    creature: "Michael (Alt)",
    threat: "severe",
    location: "Duluth, Minnesota",
    lat: 46.7867,
    lng: -92.1005,
    note: "Michael controls Dean and builds an enhanced-monster agenda.",
  },
  {
    id: "s15e01",
    season: 15,
    episode: 1,
    title: "Back and to the Future",
    creature: "Ghosts from Hell",
    threat: "high",
    location: "Harlan, Kansas",
    lat: 39.3542,
    lng: -99.1498,
    note: "The final season opens with Hell’s souls flooding Earth.",
  },
  {
    id: "s01e12",
    season: 1,
    episode: 12,
    title: "Faith",
    creature: "Reaper",
    threat: "medium",
    location: "Glenwood Springs, Colorado",
    lat: 39.5505,
    lng: -107.3248,
    note: "A faith healer’s miracles hide a dangerous reaper pact.",
  },
  {
    id: "s05e08",
    season: 5,
    episode: 8,
    title: "Changing Channels",
    creature: "Trickster / Gabriel",
    threat: "high",
    location: "Boulder, Colorado",
    lat: 40.01499,
    lng: -105.2705,
    note: "Reality-bending TV worlds trap Sam and Dean in a warning.",
  },
  {
    id: "s11e20",
    season: 11,
    episode: 20,
    title: "Don’t Call Me Shurley",
    creature: "God / Chuck",
    threat: "severe",
    location: "Topeka, Kansas",
    lat: 39.0473,
    lng: -95.6752,
    note: "Chuck reveals himself as cosmic stakes spiral toward collapse.",
  },
  {
    id: "s13e16",
    season: 13,
    episode: 16,
    title: "Scoobynatural",
    creature: "Animated Ghost",
    threat: "low",
    location: "Coolsville (fictional)",
    lat: 39.7392,
    lng: -104.9903,
    note: "The Winchesters team with Scooby-Doo in a cursed cartoon world.",
  },
  {
    id: "s15e20",
    season: 15,
    episode: 20,
    title: "Carry On",
    creature: "Vampire Nest",
    threat: "medium",
    location: "Akron, Ohio",
    lat: 41.0814,
    lng: -81.519,
    note: "One final hunt closes out the Winchester story.",
  },
];

const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const seasonFilter = document.getElementById("seasonFilter");
const threatFilter = document.getElementById("threatFilter");
const resetFilters = document.getElementById("resetFilters");
const resultCount = document.getElementById("resultCount");
const sightingList = document.getElementById("sightingList");
const sightingTemplate = document.getElementById("sightingTemplate");

const map = L.map("map", {
  zoomControl: true,
  attributionControl: true,
}).setView([39.5, -98.35], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

const markerLayer = L.layerGroup().addTo(map);
const markerById = new Map();

let activeId = null;

initializeFilters();
render();

searchInput.addEventListener("input", render);
typeFilter.addEventListener("change", render);
seasonFilter.addEventListener("change", render);
threatFilter.addEventListener("change", render);

resetFilters.addEventListener("click", () => {
  searchInput.value = "";
  typeFilter.value = "all";
  seasonFilter.value = "all";
  threatFilter.value = "all";
  activeId = null;
  render();
  map.setView([39.5, -98.35], 4);
});

function initializeFilters() {
  populateSelect(typeFilter, uniqueValues("creature"));
  populateSelect(
    seasonFilter,
    uniqueValues("season").map((season) => `Season ${season}`)
  );
}

function uniqueValues(key) {
  return [...new Set(episodes.map((entry) => entry[key]))].sort((a, b) => {
    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }
    return String(a).localeCompare(String(b));
  });
}

function populateSelect(selectNode, values) {
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    selectNode.append(option);
  });
}

function render() {
  const filtered = filterEpisodes();

  if (activeId && !filtered.some((item) => item.id === activeId)) {
    activeId = null;
  }

  renderList(filtered);
  renderMarkers(filtered);
  resultCount.textContent = `${filtered.length} episode cases found.`;
}

function filterEpisodes() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedCreature = typeFilter.value;
  const selectedSeason = seasonFilter.value;
  const selectedThreat = threatFilter.value;

  return episodes.filter((entry) => {
    const matchCreature = selectedCreature === "all" || entry.creature === selectedCreature;
    const matchSeason = selectedSeason === "all" || `Season ${entry.season}` === selectedSeason;
    const matchThreat = selectedThreat === "all" || entry.threat === selectedThreat;
    const text = `${entry.title} ${entry.location} ${entry.creature} ${entry.note}`.toLowerCase();
    const matchQuery = query.length === 0 || text.includes(query);
    return matchCreature && matchSeason && matchThreat && matchQuery;
  });
}

function renderList(entries) {
  sightingList.textContent = "";

  if (entries.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No episodes match the current filter set.";
    empty.className = "sighting-item";
    sightingList.append(empty);
    return;
  }

  const fragment = document.createDocumentFragment();

  entries.forEach((entry) => {
    const node = sightingTemplate.content.cloneNode(true);
    const button = node.querySelector(".sighting-button");

    node.querySelector(
      ".sighting-title"
    ).textContent = `S${String(entry.season).padStart(2, "0")}E${String(entry.episode).padStart(2, "0")} - ${entry.title}`;
    node.querySelector(
      ".sighting-meta"
    ).innerHTML = `${entry.location} | ${entry.creature} | <span class="threat threat-${entry.threat}">${capitalize(
      entry.threat
    )}</span>`;
    node.querySelector(".sighting-note").textContent = entry.note;

    if (activeId === entry.id) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      activeId = entry.id;
      render();
      const marker = markerById.get(entry.id);
      if (marker) {
        map.flyTo(marker.getLatLng(), 7, { duration: 0.8 });
        marker.openPopup();
      }
    });

    fragment.append(node);
  });

  sightingList.append(fragment);
}

function renderMarkers(entries) {
  markerLayer.clearLayers();
  markerById.clear();

  entries.forEach((entry) => {
    const marker = L.marker([entry.lat, entry.lng], {
      icon: L.divIcon({
        className: "",
        html: `<div class="marker marker-${entry.threat}" title="${entry.title}"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      }),
    }).bindPopup(
      `<strong>S${String(entry.season).padStart(2, "0")}E${String(entry.episode).padStart(2, "0")} - ${entry.title}</strong><br/>${
        entry.location
      }<br/>${entry.creature}<br/>Threat: ${capitalize(entry.threat)}<br/><em>${entry.note}</em>`
    );

    marker.on("click", () => {
      activeId = entry.id;
      render();
    });

    marker.addTo(markerLayer);
    markerById.set(entry.id, marker);
  });
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
