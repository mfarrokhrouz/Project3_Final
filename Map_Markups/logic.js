// Create a map object.
let myMap = L.map("map", {
  center: [-25.27, 133.77],
  zoom: 5
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// An array containing each city's name, location, and population
let cities = [{
  location: [-36.0806, 146.9158],
  name: "Albury",
  population: 47974
},
{
  location: [-34.9289, 138.6011],
  name: "Adelaide",
  population: 1345777
},
{
  location: [-35.0228, 117.8814],
  name: "Albany",
  population: 34205
},
{
  location: [-37.55, 143.85],
  name: "Ballarat",
  population: 105471
},
{
  location: [-36.75, 144.2667],
  name: "Bendigo",
  population: 99122
},
{
  location: [-27.4678, 153.0281],
  name: "Brisbane",
  population: 2514184
},{
  location: [-16.9303, 145.7703],
  name: "Cairns",
  population: 152729
},{
  location: [-35.2931, 149.1269],
  name: "Canberra",
  population: 426704
},{
  location: [-31.4997, 145.8319],
  name: "Cobar",
  population: 3990
},{
  location: [-12.4381, 130.8411],
  name: "Darwin",
  population: 136828
},{
  location: [-42.8806, 147.325],
  name: "Hobart",
  population: 240342
},{
  location: [-41.4419, 147.145],
  name: "Launceston",
  population: 87328
},{
  location: [-37.8136, 144.9631],
  name: "Melbourne",
  population: 5078193
},{
  location: [-34.1889, 142.1583],
  name: "Mildura",
  population: 32738
},{
  location: [-29.465, 149.8344],
  name: "Moree",
  population: 9311
},
{
  location: [-32.9167, 151.75],
  name: "Newcastle",
  population: 322278
},
{
  location: [-34.4667, 138.9833],
  name: "Nuriootpa",
  population: 6314
},
{
  location: [-33.7511, 150.6942],
  name: "Penrith",
  population: 13295
},
{
  location: [-31.9522, 115.8589],
  name: "Perth",
  population: 2059484
},
{
  location: [-38.3333, 141.600],
  name: "Portland",
  population: 10900
},
{
  location: [-33.5983, 150.7511],
  name: "Richmond",
  population: 5482
},
{
  location: [-38.1, 147.0667],
  name: "Sale",
  population: 15135
},
{
  location: [-33.865, 151.2094],
  name: "Sydney",
  population: 5312163
},
{
  location: [-19.2564, 146.8183],
  name: "Townsville",
  population: 180820
},
{
  location: [-34.4331, 150.8831],
  name: "Wollongong",
  population: 302739
},
{
  location: [-23.697, 133.884],
  name: "Alice Springs",
  population: 25912
},
{ location: [-17.533, 145.833],
  name: "Badgery Creek",
  population: 225
},
{ location: [-30.296276, 153.114136],
  name: "Coffs Harbour",
  population: 45000
},
{ location: [-37.9143894, 141.2730001],
  name: "Dartmoor",
  population: 322
},
{ location: [-27.9833, 153.333],
  name: "Gold Coast",
  population: 591473
},
{ location: [-14.300, 132.467],
  name: "Katherine",
  population: 18646
},
{ location: [-37.832, 140.779],
  name: "Mount Gambier",
  population: 25591
},
{ location: [-35.533, 148.783],
  name: "Mount Ginini",
  population: 0
},
{ location: [-36.333, 141.667],
  name: "Nhil",
  population: 1749
},
{ location: [-33.283, 151.583],
  name: "Norah Head",
  population: 4173
},
{ location: [-29.033, 167.950],
  name: "Norfolk Island",
  population: 1828
},
{ location: [-31.66833, 116.015],
  name: "PearceRAAF",
  population: 2511
},
{ location: [-32.98207, 121.6441696],
  name: "Salmon Gums",
  population: 146
},
{ location: [-35.433, 149.117],
  name: "Tuggeranong",
  population: 89461
},
{ location: [-25.34449, 131.035431],
  name: "Uluru",
  population: 300
},
{ location: [-35.117275, 147.356522],
  name: "Wagga Wagga",
  population: 57003
},
{ location: [-34.967, 116.733],
  name: "Walpole",
  population: 429
},
{ location: [-37.708, 145.083],
  name: "Watsonia",
  population: 5352
},
{ location: [-32.80798, 151.85092],
  name: "Williamtown",
  population: 762
},
{ location: [-34.02493, 115.09989],
  name: "Witchcliffe",
  population: 484
},
{ location: [-31.2007, 136.8259],
  name: "Woomera",
  population: 136
},

];

// Looping through the cities array, create one marker for each city, bind a popup containing its name and population, and add it to the map.
for (let i = 0; i < cities.length; i++) {
  let city = cities[i];
  L.marker(city.location)
    .bindPopup(`<h1>${city.name}</h1> <hr> <h3>Population: ${city.population.toLocaleString()}</h3>`)
    .addTo(myMap);
}
