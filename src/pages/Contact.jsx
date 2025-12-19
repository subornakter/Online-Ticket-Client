import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiYoutube,
  FiCheckCircle,
  FiMessageCircle,
  FiXCircle,
  FiLinkedin,
  FiFacebook,
  FiInstagram,
  FiTwitter,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import LoadingSpinner from "../components/LoadingSpinner";

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapMarker({ searchText, position, setPosition }) {
  const map = useMap();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchText) return;

    const searchLocation = async () => {
      setLoading(true);
      try {
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
          alert("Location not found! Try full name like 'Gazipur, Bangladesh'");
        }
      } catch (err) {
        alert("Search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    searchLocation();
  }, [searchText, map, setPosition]);

  return (
    <>
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-base-100 bg-opacity-70">
          <div className="w-10 h-10 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      )}
      <Marker position={position}>
        <Popup>{searchText || "TicketBari Office - Dhaka"}</Popup>
      </Marker>
    </>
  );
}

export default function ContactPage() {
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [position, setPosition] = useState([23.8103, 90.4125]);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Success (in real app, check response)
    setSubmitStatus("success");
    setSubmitting(false);
    setFormData({ name: "", email: "", message: "" });

    // Auto hide success message after 5s
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  return (
    <div className="px-4 py-10 mx-auto space-y-16 md:px-6 md:py-12 lg:px-12 max-w-7xl">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="mb-4 text-3xl font-extrabold text-transparent md:text-4xl bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text">
          Contact Us
        </h1>
        <p className="max-w-xl mx-auto text-base text-gray-600 md:text-lg">
          We're here to help! Reach out to TicketBari anytime — we respond fast.
        </p>
      </motion.div>

      {/* CONTACT INFO CARDS - Clickable */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
      >
        {[
          {
            icon: <FiPhone className="text-3xl" />,
            title: "Phone",
            text: "+880 1234-567890",
            action: "tel:+8801234567890",
          },
          {
            icon: <FiMail className="text-3xl" />,
            title: "Email",
            text: "support@ticketbari.com",
            action: "mailto:support@ticketbari.com",
          },
          {
            icon: <FiMapPin className="text-3xl" />,
            title: "Location",
            text: "Dhaka, Bangladesh",
          },
        ].map((item, i) => (
          <motion.a
            key={i}
            href={item.action || undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: item.action ? 1.08 : 1.05 }}
            className={`p-6 space-y-3 text-center transition-all duration-300 bg-base-100 shadow-md rounded-xl hover:shadow-2xl ${
              item.action ? "cursor-pointer" : "cursor-default"
            }`}
          >
            <div className="mx-auto text-green-600">{item.icon}</div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-600">{item.text}</p>
          </motion.a>
        ))}
      </motion.div>

      {/* MAP + SEARCH */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold">Find Us on Map</h2>

        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            className="flex-1 px-5 py-3 text-base transition border-2 border-gray-200 outline-none rounded-xl focus:border-green-500"
            placeholder="Search district, e.g., 'Gazipur, Bangladesh'"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setSubmittedSearch(search)}
          />
          <button
            onClick={() => setSubmittedSearch(search)}
            className="flex items-center justify-center gap-2 px-8 py-3 text-white transition shadow-lg bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl hover:from-green-700 hover:to-emerald-600 hover:shadow-xl"
          >
            <FiSend className="text-lg" /> Search
          </button>
        </div>

        <div className="relative w-full overflow-hidden shadow-2xl h-96 md:h-[500px] rounded-2xl">
          <MapContainer
            center={position}
            zoom={12}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
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

      {/* CONTACT FORM - Enhanced */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="p-6 shadow-xl bg-base-100 md:p-10 rounded-2xl"
      >
        <h2 className="mb-8 text-3xl font-bold text-center">
          Send Us a Message
        </h2>

        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 mb-6 text-green-700 rounded-lg bg-green-50"
          >
            <FiCheckCircle className="text-2xl" />
            <span>
              Thank you! Your message has been sent successfully. We'll reply
              soon.
            </span>
          </motion.div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`px-5 py-3 border-2 rounded-xl outline-none transition ${
                errors.name
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-green-500"
              }`}
              placeholder="Your Name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`px-5 py-3 border-2 rounded-xl outline-none transition ${
                errors.email
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-green-500"
              }`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 font-semibold text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className={`px-5 py-3 border-2 rounded-xl outline-none transition resize-none ${
                errors.message
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-200 focus:border-green-500"
              }`}
              placeholder="How can we help you today?"
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message}</p>
            )}
          </div>

          <div className="flex justify-center md:col-span-2 md:justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-3 px-10 py-4 text-lg font-medium text-white transition shadow-lg bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl hover:from-green-700 hover:to-emerald-600 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <LoadingSpinner />
              ) : (
                <>
                  <FiSend /> Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* FOLLOW US SECTION - Real Brand Colors */}
      <div className="py-12 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-6 text-lg text-gray-600"
        >
          Follow us on social media
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {/* Facebook */}
          <motion.a
            href="https://facebook.com/ticketbari" // তোমার লিঙ্ক দাও
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            className="p-5 text-white bg-[#1877F2] rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <FiFacebook className="text-3xl" />
          </motion.a>

          {/* Instagram - Gradient */}
          <motion.a
            href="https://instagram.com/ticketbari"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -5 }}
            className="p-5 text-white transition-all duration-300 rounded-full shadow-lg hover:shadow-2xl"
            style={{
              background:
                "linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)",
            }}
          >
            <FiInstagram className="text-3xl" />
          </motion.a>

          {/* X (Twitter) */}
          <motion.a
            href="https://x.com/ticketbari"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            className="p-5 text-white transition-all duration-300 bg-blue-400 rounded-full shadow-lg hover:shadow-2xl"
          >
            <FiTwitter className="text-3xl" />{" "}
            {/* react-icons-এ FiTwitter এখনো X logo, কিন্তু কালার black */}
          </motion.a>

          {/* YouTube - Bonus */}
          <motion.a
            href="https://youtube.com/@ticketbari"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -5 }}
            className="p-5 text-white bg-[#FF0000] rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <FiYoutube className="text-3xl" />
          </motion.a>

          {/* WhatsApp - Bonus */}
          <motion.a
            href="https://wa.me/8801234567890"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            className="p-5 text-white bg-[#25D366] rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <FiMessageCircle className="text-3xl" />
          </motion.a>
        </div>
      </div>
    </div>
  );
}
