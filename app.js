let episodes = [];

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
const threatColors = {
  low: "#38976d",
  medium: "#b88f22",
  high: "#c55e26",
  severe: "#8f2316",
};

let activeId = null;

resultCount.textContent = "Loading episode data...";
initializeApp();

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

async function initializeApp() {
  try {
    const response = await fetch("episodes.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load episodes (${response.status})`);
    }

    episodes = await response.json();
    initializeFilters();
    render();
  } catch (error) {
    console.error(error);
    resultCount.textContent = "Could not load episode data.";
    renderList([]);
  }
}

function initializeFilters() {
  typeFilter.length = 1;
  seasonFilter.length = 1;
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
  const markerPoints = renderMarkers(filtered);

  if (markerPoints.length > 0 && !activeId) {
    map.fitBounds(L.latLngBounds(markerPoints).pad(0.18), { maxZoom: 6 });
  }

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
    empty.textContent = episodes.length
      ? "No episodes match the current filter set."
      : "No episode data loaded.";
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
  const displayCoordinates = buildDisplayCoordinates(entries);
  const markerPoints = [];

  entries.forEach((entry) => {
    const markerLatLng = displayCoordinates.get(entry.id) || [entry.lat, entry.lng];
    markerPoints.push(markerLatLng);

    const marker = L.circleMarker(markerLatLng, {
      radius: 8,
      color: "#ffffff",
      weight: 2,
      fillColor: threatColors[entry.threat] || "#4b4b4b",
      fillOpacity: 0.95,
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

  return markerPoints;
}

function buildDisplayCoordinates(entries) {
  const groupedByCoordinate = new Map();
  const displayCoordinates = new Map();

  entries.forEach((entry) => {
    const key = `${entry.lat.toFixed(6)},${entry.lng.toFixed(6)}`;
    if (!groupedByCoordinate.has(key)) {
      groupedByCoordinate.set(key, []);
    }
    groupedByCoordinate.get(key).push(entry);
  });

  groupedByCoordinate.forEach((group) => {
    if (group.length === 1) {
      const onlyEntry = group[0];
      displayCoordinates.set(onlyEntry.id, [onlyEntry.lat, onlyEntry.lng]);
      return;
    }

    const radius = 0.16;
    const sortedGroup = [...group].sort((a, b) => a.id.localeCompare(b.id));

    sortedGroup.forEach((entry, index) => {
      const angle = (2 * Math.PI * index) / sortedGroup.length;
      const lat = entry.lat + radius * Math.sin(angle);
      const lng = entry.lng + radius * Math.cos(angle);
      displayCoordinates.set(entry.id, [lat, lng]);
    });
  });

  return displayCoordinates;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
