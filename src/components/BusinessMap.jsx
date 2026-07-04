import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { business } from '../content/content.js'
import { Tape } from './Paper.jsx'
import './map.css'

/* Branded pin: warm paper drop with the SolBeat sun-and-beat mark. */
const pinIcon = L.divIcon({
  className: 'sb-pin',
  iconSize: [46, 58],
  iconAnchor: [23, 56],
  popupAnchor: [0, -50],
  html: `
    <svg width="46" height="58" viewBox="0 0 46 58" aria-hidden="true">
      <path d="M23 57 C13 42 3 33 3 21 A20 20 0 0 1 43 21 C43 33 33 42 23 57 Z"
            fill="#bd5c31" stroke="#2e2418" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="23" cy="21" r="12.5" fill="#f6efe1"/>
      <path d="M14 22 L18.5 22 L20.5 16.5 L24 27.5 L26 21 L27.5 22 L32 22"
            fill="none" stroke="#2e2418" stroke-width="2.4"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
})

export default function BusinessMap() {
  return (
    <div className="sb-map-frame">
      <Tape tone="gold" angle={-42} style={{ top: -13, left: -20 }} />
      <Tape tone="terra" angle={40} style={{ top: -12, right: -20 }} />
      <MapContainer
        center={business.mapCenter}
        zoom={15}
        scrollWheelZoom={false}
        className="sb-map"
        aria-label="Map showing SolBeat Cleaning at 300 First St, Steinbach"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={business.mapCenter} icon={pinIcon}>
          <Popup>
            <div className="sb-popup">
              <p className="sb-popup-name">{business.name}</p>
              <p className="sb-popup-addr">{business.address}</p>
              <p className="sb-popup-hours">Open {business.hours}</p>
              <a
                className="sb-popup-directions"
                href={business.directionsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Get directions ↗
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      <p className="sb-map-caption hand">Find us on First Street, Steinbach</p>
    </div>
  )
}
