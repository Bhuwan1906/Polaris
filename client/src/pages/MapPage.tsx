import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Compass, ChevronRight } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useLocations, useExpeditions } from '@/hooks/useApi';
import { REGION_LABELS, formatDate } from '@/lib/utils';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in webpack/vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const stationIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapPage() {
  const { data: locations } = useLocations();
  const { data: expeditionData } = useExpeditions({ limit: 50 });
  const expeditions = expeditionData?.data || [];
  const [selectedRegion, setSelectedRegion] = useState('ALL');

  const filteredLocations = selectedRegion === 'ALL'
    ? (locations || [])
    : (locations || []).filter((l: any) => l.region === selectedRegion);

  // Group by region for map view
  const antarcticLocations = filteredLocations.filter((l: any) => l.region === 'ANTARCTIC');
  const arcticLocations = filteredLocations.filter((l: any) => l.region === 'ARCTIC');

  // Default center: show both poles perspective
  const center: [number, number] = selectedRegion === 'ARCTIC'
    ? [78.9, 11.9]
    : selectedRegion === 'ANTARCTIC'
    ? [-70.5, 30]
    : [-20, 30];

  return (
    <div className="py-12">
      <div className="container-wide">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice-500/10">
            <MapPin className="h-6 w-6 text-ice-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Interactive Map</h1>
            <p className="text-surface-400">Explore Indian polar research stations and locations</p>
          </div>
        </div>

        {/* Region filter */}
        <div className="mt-6 flex gap-2">
          {[
            { value: 'ALL', label: 'All Regions' },
            { value: 'ANTARCTIC', label: 'Antarctic' },
            { value: 'ARCTIC', label: 'Arctic' },
          ].map((r) => (
            <button
              key={r.value}
              onClick={() => setSelectedRegion(r.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedRegion === r.value
                  ? 'bg-polar-500 text-white'
                  : 'border border-surface-700 bg-surface-800 text-surface-400 hover:text-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="card overflow-hidden" style={{ height: '600px' }}>
              <MapContainer
                center={center}
                zoom={selectedRegion === 'ALL' ? 2 : 5}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredLocations.map((loc: any) => (
                  <Marker
                    key={loc.id}
                    position={[loc.latitude, loc.longitude]}
                    icon={stationIcon}
                  >
                    <Popup>
                      <div className="min-w-[200px]">
                        <div className="font-semibold text-white">{loc.name}</div>
                        <div className="mt-1 text-xs text-surface-400">{loc.type} • {loc.region}</div>
                        {loc.description && (
                          <p className="mt-2 text-xs text-surface-300 line-clamp-3">{loc.description}</p>
                        )}
                        <div className="mt-2 text-xs text-surface-500">
                          {loc.latitude.toFixed(4)}°, {loc.longitude.toFixed(4)}°
                        </div>
                        {loc._count?.expeditions > 0 && (
                          <div className="mt-2 text-xs text-polar-400">
                            {loc._count.expeditions} expedition(s)
                          </div>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Sidebar: Locations list */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            <h3 className="font-semibold text-white">Research Locations</h3>
            {filteredLocations.map((loc: any) => (
              <div key={loc.id} className="card p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-white">{loc.name}</h4>
                    <p className="text-xs text-surface-400">{loc.type} • {REGION_LABELS[loc.region] || loc.region}</p>
                  </div>
                  <span className="text-xs text-surface-500">{loc._count?.expeditions || 0} exp.</span>
                </div>
                {loc.description && (
                  <p className="mt-2 text-xs text-surface-400 line-clamp-2">{loc.description}</p>
                )}
                <div className="mt-2 font-mono text-xs text-surface-500">
                  {loc.latitude.toFixed(4)}°, {loc.longitude.toFixed(4)}°
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
