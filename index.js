const mapApi = async (api) => {
  const res = await fetch(api);

  if (!res.ok) {
    alert("Error: Failed to fetch country information");
  }
  if (res.status !== 200) {
    alert("Error: " + res.status);
  }
  return res.json();
};

let allParameters = document.querySelectorAll(".tracker-info");

const mapped = async (api) => {
  const location = await mapApi(api);

  let param = [
    location.ip,
    `${location.location.region}, ${location.location.country} ${
      location?.as?.asn || "n/a"
    }`,
    `UTC${location.location.timezone}`,
    location.isp,
  ];

  for (let i = 0; i < allParameters.length; i++) {
    allParameters[i].children[1].innerHTML = param[i];
  }
};

mapped(
  "https://geo.ipify.org/api/v2/country?apiKey=at_AJAkKGh5LQcYrCH8OFaXpknr1e9Jx&ipAddress"
);

if (window.location.search) {
  let url = new URL(window.location.href);
  let key = url.searchParams.get("search");
  mapped(
    `https://geo.ipify.org/api/v2/country?apiKey=at_AJAkKGh5LQcYrCH8OFaXpknr1e9Jx&ipAddress=${key}`
  );
}

// The map view
var map = L.map("map").setView([51.505, -0.09], 13);
L.control.locate().addTo(map);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);
var popup = L.popup();

// map.on("click", onMapClick);
