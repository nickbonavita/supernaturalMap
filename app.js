const sightings = [
  {
    id: "s01",
    name: "Lantern Bride",
    type: "Ghost",
    era: "Victorian",
    threat: "medium",
    location: "Whitby, England",
    lat: 54.4863,
    lng: -0.6133,
    note: "Appears near cliff paths after sea fog rolls in.",
  },
  {
    id: "s02",
    name: "Howling Chapel",
    type: "Cursed Site",
    era: "Medieval",
    threat: "high",
    location: "Prague, Czechia",
    lat: 50.0755,
    lng: 14.4378,
    note: "Choir voices reported from a sealed crypt with no access points.",
  },
  {
    id: "s03",
    name: "Riverbone Wisp",
    type: "Spirit",
    era: "Ancient",
    threat: "low",
    location: "Kyoto, Japan",
    lat: 35.0116,
    lng: 135.7681,
    note: "Blue lights drift low above flood banks before disappearing at dawn.",
  },
  {
    id: "s04",
    name: "Ashfield Doppelganger",
    type: "Entity",
    era: "Modern",
    threat: "severe",
    location: "Toronto, Canada",
    lat: 43.6532,
    lng: -79.3832,
    note: "Witnesses claim to see their own reflection moving independently.",
  },
  {
    id: "s05",
    name: "Silent Bell Tower",
    type: "Haunting",
    era: "Renaissance",
    threat: "medium",
    location: "Florence, Italy",
    lat: 43.7696,
    lng: 11.2558,
    note: "Bells vibrate with no audible ring and trigger memory loss episodes.",
  },
  {
    id: "s06",
    name: "Sandstep Revenant",
    type: "Ghost",
    era: "Colonial",
    threat: "high",
    location: "Lisbon, Portugal",
    lat: 38.7223,
    lng: -9.1393,
    note: "Footprints appear ahead of travelers and never behind.",
  },
  {
    id: "s07",
    name: "Mirewatch Choir",
    type: "Spirit",
    era: "Ancient",
    threat: "medium",
    location: "Novi Sad, Serbia",
    lat: 45.2671,
    lng: 19.8335,
    note: "Layered harmonics detected over wetlands with no visible source.",
  },
  {
    id: "s08",
    name: "Glass Orchard",
    type: "Anomaly",
    era: "Modern",
    threat: "high",
    location: "Seoul, South Korea",
    lat: 37.5665,
    lng: 126.978,
    note: "Tree bark calcifies overnight and shatters on contact.",
  },
  {
    id: "s09",
    name: "Marrow Tunnel",
    type: "Cursed Site",
    era: "Industrial",
    threat: "severe",
    location: "Chicago, USA",
    lat: 41.8781,
    lng: -87.6298,
    note: "Repeated reports of missing time and mirrored architecture.",
  },
  {
    id: "s10",
    name: "Eel Crown",
    type: "Entity",
    era: "Ancient",
    threat: "high",
    location: "Cork, Ireland",
    lat: 51.8985,
    lng: -8.4756,
    note: "Luminous shape circles old harbor walls during storms.",
  },
  {
    id: "s11",
    name: "Whisper Tram",
    type: "Haunting",
    era: "Modern",
    threat: "low",
    location: "Melbourne, Australia",
    lat: -37.8136,
    lng: 144.9631,
    note: "An extra tram appears on route maps but never on schedules.",
  },
  {
    id: "s12",
    name: "Lantern Fen",
    type: "Spirit",
    era: "Medieval",
    threat: "medium",
    location: "York, England",
    lat: 53.959,
    lng: -1.0815,
    note: "Pilgrims recorded phantom processions before dawn.",
  },
];

const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const eraFilter = document.getElementById("eraFilter");
const threatFilter = document.getElementById("threatFilter");
const resetFilters = document.getElementById("resetFilters");
const resultCount = document.getElementById("resultCount");
const sightingList = document.getElementById("sightingList");
const sightingTemplate = document.getElementById("sightingTemplate");

const map = L.map("map", {
  zoomControl: true,
  attributionControl: true,
}).setView([35, 12], 2);

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
eraFilter.addEventListener("change", render);
threatFilter.addEventListener("change", render);

resetFilters.addEventListener("click", () => {
  searchInput.value = "";
  typeFilter.value = "all";
  eraFilter.value = "all";
  threatFilter.value = "all";
  activeId = null;
  render();
  map.setView([35, 12], 2);
});

function initializeFilters() {
  populateSelect(typeFilter, uniqueValues("type"), "All Entities");
  populateSelect(eraFilter, uniqueValues("era"), "All Eras");
}

function uniqueValues(key) {
  return [...new Set(sightings.map((entry) => entry[key]))].sort((a, b) => a.localeCompare(b));
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
  const filtered = filterSightings();

  if (activeId && !filtered.some((item) => item.id === activeId)) {
    activeId = null;
  }

  renderList(filtered);
  renderMarkers(filtered);
  resultCount.textContent = `${filtered.length} sightings in current scan.`;
}

function filterSightings() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedType = typeFilter.value;
  const selectedEra = eraFilter.value;
  const selectedThreat = threatFilter.value;

  return sightings.filter((entry) => {
    const matchType = selectedType === "all" || entry.type === selectedType;
    const matchEra = selectedEra === "all" || entry.era === selectedEra;
    const matchThreat = selectedThreat === "all" || entry.threat === selectedThreat;
    const text = `${entry.name} ${entry.location} ${entry.note}`.toLowerCase();
    const matchQuery = query.length === 0 || text.includes(query);
    return matchType && matchEra && matchThreat && matchQuery;
  });
}

function renderList(entries) {
  sightingList.textContent = "";

  if (entries.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No sightings match the current scan profile.";
    empty.className = "sighting-item";
    sightingList.append(empty);
    return;
  }

  const fragment = document.createDocumentFragment();

  entries.forEach((entry) => {
    const node = sightingTemplate.content.cloneNode(true);
    const button = node.querySelector(".sighting-button");

    node.querySelector(".sighting-title").textContent = entry.name;
    node.querySelector(
      ".sighting-meta"
    ).innerHTML = `${entry.location} | ${entry.type} | <span class="threat threat-${entry.threat}">${capitalize(
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
        map.flyTo(marker.getLatLng(), 6, { duration: 0.8 });
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
        html: `<div class="marker marker-${entry.threat}" title="${entry.name}"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      }),
    }).bindPopup(
      `<strong>${entry.name}</strong><br/>${entry.location}<br/>${entry.type} | ${entry.era}<br/>Threat: ${capitalize(
        entry.threat
      )}<br/><em>${entry.note}</em>`
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