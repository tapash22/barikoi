import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { FaGreaterThan,FaLessThan } from "react-icons/fa"
import { BsSearch } from "react-icons/bs"
import { Icon, divIcon, point } from "leaflet";
import { useState } from "react";

const customIcon = new Icon({
  iconUrl: require("./assets/placeholder.png"),
  iconSize: [38, 38] 
});

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

// markers
const markers = [
  {
    id: 1,
    geolocation: [23.830084, 90.418328],
    popup: 'this is new 1'
  },
  {
    id: 2,
    geolocation: [23.829922, 90.417158],
    popup: 'this is new 2'
  },
  {
    id: 3,
    geolocation: [23.831284, 90.418201],
    popup: 'this is new 3'
  },
];

export default function App() {

  const [name, setName] = useState('');
  const [show, setShow] = useState(true);


  const addPosts = (e) => {
    e.preventDefault();
    console.log('Name:', name);
    // Do something with the state
  };
  
  const changeValue = (e) => {
    setName(e.target.value);
  };
  
  const onView = () => {
    setShow(!show);
  };
  
  const hideView = () => {
    setShow(false);
  };

  return (
    <div className="h-screen w-full bg-gray-100 relative flex ">
      {
        show &&
        <div className="flex overflow-hidden">
          <div className="bg-white shadow-xl h-screen w-1/2 px-4 py-5">
          <div className="flex justify-between py-3 px-2 ">
            <h3 className="text-xl font-semibold text-green-400">
              BariKoi
            </h3>
            <FaLessThan className="bg-white flex justify-center align-middle font-normal text-lg" onClick={hideView} />

          </div>
          <div className="py-3">
            <form onSubmit={addPosts}>
              <div className="my-2 flex py-2 shadow-lg rounded-lg shadow-gray-400 px-2">
                <input value={name} onChange={changeValue} placeholder="search" className="text-lg font-medium w-full h-10 px-2 py-1 focus:outline-none" />
                <BsSearch onClick={onView} className="bg-green-500 px-2 font-bold text-3xl my-auto" />

              </div>
            </form>
          </div>
        </div>
        <div className="w-1/2 h-screen ">
        <MapContainer center={[23.829712, 90.419669]} zoom={13}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createClusterCustomIcon}
            >
              {/* Mapping through the markers */}
              {markers.map((marker) => (
                <Marker position={marker.geolocation} icon={customIcon}>
                  <Popup>{marker.popup}</Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
          </div>
        </div>
      }
      {
        !show &&
        <div className="w-full ">
          <FaGreaterThan onClick={onView} className="ml-4" />
          <MapContainer center={[23.829712, 90.419669]} zoom={13}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createClusterCustomIcon}
            >
              {/* Mapping through the markers */}
              {markers.map((marker) => (
                <Marker position={marker.geolocation} icon={customIcon}>
                  <Popup>{marker.popup}</Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      }
    </div>
  );
}



