// import { useEffect, useRef, useState } from "react";
// import { useMap } from "react-leaflet";
// import 'leaflet-routing-machine'
// // import "leaflet-routing-machine";
// import L from "leaflet";
// // import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// const Map = () => {
//   const [center, setCenter] = useState<[number, number]>([23, 72]);
//   const mapRef = useRef<L.Map | null>(null);
//   const [lats, setLats] = useState("");
//   const [longs, setLongs] = useState("");

//   // const map = useMap();
//   useEffect(() => {
//     const map = L.map("map").setView(center, 7);
//     mapRef.current = map;

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     map.on("click", function (e: any) {
//       const lat = e.latlng.lat;
//       const lng = e.latlng.lng;
//       console.log(`Latitude: ${lat}, Longitude: ${lng}`);
//     });
//     const startIcon = L.icon({
//       iconUrl: "https://placehold.co/1000x400",
//       iconSize: [60, 60], // size of the icon
//       iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
//       popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
//     });

//     const endIcon = L.icon({
//       iconUrl: "https://placehold.co/1000x400",
//       iconSize: [60, 60],
//       iconAnchor: [16, 32],
//       popupAnchor: [0, -32],
//     });

//     const startPoint = L.latLng(23.238, 72.9956);
//     const endPoint = L.latLng(24.238, 72.9956);
//     // const polyline = L.polyline([startPoint, endPoint], {
//     //   color: "black",
//     // }).addTo(map);
//     // Add markers with custom icons to the map
//     // map.fitBounds(polyline.getBounds());
//     L.marker(startPoint, { icon: startIcon })
//       .addTo(map)
//       .bindPopup("Start Point");
//     L.marker(endPoint, { icon: endIcon }).addTo(map).bindPopup("End Point");
//     const waypoints = [startPoint, endPoint];
//     L.Routing?.control({
//       waypoints: [L.latLng(23.238, 72.9956), L.latLng(24.238, 72.9956)],
//       routeWhileDragging: true,
//       // lineOptions: {
//       //   styles: [
//       //     {
//       //       color: "blue",
//       //     },
//       //   ],
//       // },
//     }).addTo(map);
//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//       }
//     };
//   }, [center, lats, longs]);

//   // useEffect(() => {
//   //     const map = L.map('map').setView([28.2380, 83.9956], 11);
//   //     const mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
//   //     L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: `Leaflet &copy; ${mapLink}, contribution`, maxZoom: 18 }).addTo(map);

//   //     const taxiIcon = L.icon({
//   //       iconUrl: 'img/taxi.png',
//   //       iconSize: [70, 70]
//   //     });

//   //     const marker = L.marker([28.2380, 83.9956], { icon: taxiIcon }).addTo(map);

//   //     map.on('click', function (e) {
//   //       console.log(e);
//   //       const newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
//   //       L.Routing.control({
//   //         waypoints: [
//   //           L.latLng(28.2380, 83.9956),
//   //           L.latLng(e.latlng.lat, e.latlng.lng)
//   //         ]
//   //       }).on('routesfound', function (e) {
//   //         const routes = e.routes;
//   //         console.log(routes);

//   //         e.routes[0].coordinates.forEach(function (coord, index) {
//   //           setTimeout(function () {
//   //             marker.setLatLng([coord.lat, coord.lng]);
//   //           }, 100 * index);
//   //         });
//   //       }).addTo(map);
//   //     });
//   //   }, []);

//   const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(lats, longs);
//     const lat = parseFloat(lats);
//     const lng = parseFloat(longs);
//     setCenter([lat, lng]);
//   };

//   return (
//     <div>
//       <div id="map" style={{ height: "400px" }}></div>
//       <form onSubmit={handleFormSubmit}>
//         <label htmlFor="latitude">Latitude:</label>
//         <input
//           type="text"
//           step="any"
//           id="latitude"
//           name="latitude"
//           onChange={(e) => setLats(e.target.value)}
//         />
//         <label htmlFor="longitude">Longitude:</label>
//         <input
//           type="text"
//           step="any"
//           id="longitude"
//           name="longitude"
//           onChange={(e) => setLongs(e.target.value)}
//         />
//         <button type="submit">Set Map Center</button>
//       </form>
//     </div>
//   );
// };

// export default Map;
// // components/GoogleMap.js
// // import React, { useEffect, useState } from "react";
// // import GoogleMapReact from "google-map-react";

// // const Map = () => {
// //   // Center coordinates for the map
// //   const center = { lat: 23.0225, lng: 72.5714 };

// //   // State variables for 'from' and 'at' locations
// //   const [fromLocation, setFromLocation] = useState({
// //     lat: 25.0225,
// //     lng: 72.5714,
// //   });
// //   const [atLocation, setAtLocation] = useState({ lat: 28.0225, lng: 72.5714 });
// //   const pathCoordinates = [
// //     { lat: fromLocation.lat, lng: fromLocation.lng },
// //     { lat: atLocation.lat, lng: atLocation.lng },
// //   ];

// //   return (
// //     <div style={{ height: "400px", width: "100%" }}>
// //       <GoogleMapReact
// //         bootstrapURLKeys={{ key: "AIzaSyD1Gq1NfPk_vqFT1cGTJq1Uf2d6s1_GNrY" }}
// //         defaultCenter={center}
// //         defaultZoom={10}
// //       >
// //         <Marker
// //           key="from"
// //           lat={fromLocation.lat}
// //           lng={fromLocation.lng}
// //           text="From"
// //         />
// //         <Marker key="to" lat={atLocation.lat} lng={atLocation.lng} text="To" />
// //         {/* <Polyline
// //           path={pathCoordinates}
// //           options={{
// //             strokeColor: "#FF0000",
// //             strokeOpacity: 0.8,
// //             strokeWeight: 2,
// //           }}
// //         /> */}
// //       </GoogleMapReact>
// //     </div>
// //   );
// // };
// // const Marker = ({ text }: any) => (
// //   <div className="w-[50px] rounded-lg text-center text-white text-md font-semibold bg-black">
// //     {text}
// //   </div>
// // );

// // const Polyline = ({ path, options }: any) => {
// //   const [polyline, setPolyline] = useState(null);

// //   useEffect(() => {
// //     if (window.google && window.google.maps) {
// //       const polyline = new window.google.maps.Polyline({
// //         path: path,
// //         geodesic: true,
// //         strokeColor: options.strokeColor,
// //         strokeOpacity: options.strokeOpacity,
// //         strokeWeight: options.strokeWeight,
// //       });

// //       polyline.setMap(window.map);

// //       setPolyline(polyline);
// //     }
// //   }, [path, options]);

// //   return null;
// // };

// // export default Map;

// // import React, { useRef, useState } from "react";
// // import {
// //   useJsApiLoader,
// //   GoogleMap,
// //   Marker,
// //   Autocomplete,
// //   DirectionsRenderer,
// // } from "@react-google-maps/api";

// // export default function Map() {
// //   const [map, setMap] = useState(null);
// //   const [directionsResponse, setDirectionsResponse] = useState(null);

// //   const originRef = useRef();

// //   const destiantionRef = useRef();
// //   const center_coordinates = { lat: 23.0225, lng: 72.5714 };
// //   const { isLoaded } = useJsApiLoader({
// //     googleMapsApiKey: "AIzaSyBRM7YL2r8EMEEq0kENcCBm243Cby51_mY",
// //     libraries: ["places"],
// //   });
// //   async function calculateRoute() {
// //     const directionsService = new google.maps.DirectionsService();
// //     const results = await directionsService.route({
// //       origin: originRef.current.value,
// //       destination: destiantionRef.current.value,
// //       travelMode: google.maps.TravelMode.DRIVING,
// //     });
// //     setDirectionsResponse(results);
// //   }

// //   return isLoaded ? (
// //     <div style={{ height: "100vh", width: "100%" }}>
// //       <GoogleMap
// //         center={center_coordinates}
// //         zoom={15}
// //         mapContainerStyle={{ height: "100%", width: "100%" }}
// //         options={{
// //           zoomControl: false,

// //           mapTypeControl: false,
// //           fullscreenControl: false,
// //         }}
// //       >
// //         <Marker position={center_coordinates}></Marker>
// //         {directionsResponse && (
// //           <DirectionsRenderer directions={directionsResponse} />
// //         )}
// //       </GoogleMap>
// //       <div className="flex">
// //         <div>
// //           <Autocomplete>
// //             <input type="text" placeholder="From" ref={originRef}></input>
// //           </Autocomplete>
// //         </div>
// //         <div>
// //           <Autocomplete>
// //             <input type="text" placeholder="To" ref={destiantionRef}></input>
// //           </Autocomplete>
// //         </div>
// //         <button className="bg-white text-black" onClick={calculateRoute}>
// //           calc
// //         </button>
// //         <button
// //         className="bg-white text-black"
// //         onClick={() => {
// //             console.log("clicked")
// //           map?.panTo(center_coordinates);
// //           map?.setZoom(15);
// //         }}
// //       >
// //         center
// //         </button>
// //       </div>
// //     </div>
// //   ) : (
// //     <></>
// //   );
// // }
