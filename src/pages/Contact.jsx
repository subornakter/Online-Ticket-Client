import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";

// ✅ Fix marker using CDN icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Map marker + search component
function MapMarker({ searchText, position, setPosition }) {
  const map = useMap();

  useEffect(() => {
    if (!searchText) return;

    const searchLocation = async () => {
      const provider = new OpenStreetMapProvider({
        params: { countrycodes: "bd" },
      });
      const results = await provider.search({ query: searchText });

      if (results.length > 0) {
        const { x, y } = results[0];
        const newPos = [y, x];
        setPosition(newPos);
        map.flyTo(newPos, 14);
      } else {
        alert(
          "Location not found! Use full district name, e.g., 'Gazipur, Bangladesh'"
        );
      }
    };

    searchLocation();
  }, [searchText, map, setPosition]);

  return (
    <Marker position={position}>
      <Popup>{searchText || "Dhaka"}</Popup>
    </Marker>
  );
}

export default function ContactPage() {
  const [search, setSearch] = useState(""); // input text
  const [submittedSearch, setSubmittedSearch] = useState(""); // search to run
  const [position, setPosition] = useState([23.8103, 90.4125]); // Dhaka default

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          We're here to help! Reach out to TicketBari anytime — we respond fast.
        </p>
      </motion.div>

      {/* CONTACT INFO */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          {
            icon: <FiPhone className="text-3xl" />,
            title: "Phone",
            text: "+880 1234-567890",
          },
          {
            icon: <FiMail className="text-3xl" />,
            title: "Email",
            text: "support@ticketbari.com",
          },
          {
            icon: <FiMapPin className="text-3xl" />,
            title: "Location",
            text: "Dhaka, Bangladesh",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-6 bg-base-100 rounded-xl shadow hover:shadow-lg transition cursor-pointer text-center space-y-3"
          >
            <div className="text-green-600 mx-auto">{item.icon}</div>
            <h3 className="font-bold text-xl">{item.title}</h3>
            <p className="text-gray-600">{item.text}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* MAP + SEARCH */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="space-y-5"
      >
        <h2 className="text-2xl font-bold">Find Us on Map</h2>

        {/* Search Bar */}
        <div className="flex gap-3">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Search district, e.g., 'Gazipur, Bangladesh'"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => setSubmittedSearch(search)}
            className="px-6 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2"
          >
            <FiSend /> Search
          </button>
        </div>

        {/* Map Embed */}
        <div className="w-full h-96 rounded-xl shadow overflow-hidden">
          <MapContainer
            center={position}
            zoom={12}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapMarker
              searchText={submittedSearch}
              position={position}
              setPosition={setPosition}
            />
          </MapContainer>
        </div>
      </motion.div>

      {/* CONTACT FORM */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-base-100 p-8 rounded-xl shadow"
      >
        <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

        <form className="space-y-5">
          <div>
            <label>Name</label>
            <input
              type="text"
              className="w-full border mt-1 px-4 py-2 rounded-lg"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              className="w-full border mt-1 px-4 py-2 rounded-lg"
              placeholder="Your Email"
            />
          </div>

          <div>
            <label>Message</label>
            <textarea
              className="w-full border mt-1 px-4 py-2 rounded-lg"
              rows="4"
              placeholder="How can we help you?"
            ></textarea>
          </div>

          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
}
