import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface EventType {
  _id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  time: string;
  buttonText: string;
  buttonLink: string;
  featured: boolean;
}

const Events = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  // =============================
  // FETCH EVENTS
  // =============================
  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/events`
      );

      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // =============================
  // FEATURED EVENT
  // =============================
  const featuredEvent = events.find(
    (event) => event.featured
  );

  return (
    <div className="bg-pink-50 min-h-screen">
      {/* ============================= */}
      {/* HERO SECTION */}
      {/* ============================= */}

      <div className="relative h-[400px] flex items-center justify-center bg-gradient-to-r from-pink-100 to-pink-200">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-pink-700 mb-4">
            Nirjara Events
          </h1>

          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Discover exclusive beauty masterclasses,
            bridal workshops, academy events, and
            premium salon experiences.
          </p>
        </div>
      </div>

      {/* ============================= */}
      {/* FEATURED EVENT */}
      {/* ============================= */}

      {featuredEvent && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="mb-8">
            <span className="bg-pink-600 text-white px-5 py-2 rounded-full text-sm">
              Featured Event
            </span>
          </div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="grid lg:grid-cols-2 gap-10 bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            {/* IMAGE */}
              <img
                src={featuredEvent.image}
                alt={featuredEvent.title}
                className="w-full h-full object-cover"
              />

            {/* CONTENT */}
            <div className="p-10 flex flex-col justify-center">
              <h2 className="text-4xl font-serif font-bold text-pink-700 mb-5">
                {featuredEvent.title}
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6">
                {featuredEvent.description}
              </p>

              <div className="space-y-2 text-gray-700 mb-8">
                <p>
                  📍 {featuredEvent.location}
                </p>

                <p>
                  📅{" "}
                  {new Date(
                    featuredEvent.date
                  ).toLocaleDateString()}
                </p>

                <p>
                  ⏰ {featuredEvent.time}
                </p>
              </div>

              <Link
                to={`/events/${featuredEvent._id}`}
                className="bg-pink-600 hover:bg-pink-700 transition text-white px-8 py-4 rounded-xl w-fit"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      {/* ============================= */}
      {/* ALL EVENTS */}
      {/* ============================= */}

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-4xl font-serif font-bold text-center text-pink-700 mb-14">
          Upcoming Events
        </h2>

        {events.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No events available.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <motion.div
                key={event._id}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg"
              >
                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-72 object-cover"
                  />

                  <div className="absolute top-4 left-4 bg-pink-600 text-white px-4 py-2 rounded-xl text-sm shadow-lg">
                    {new Date(
                      event.date
                    ).toLocaleDateString()}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold text-pink-700 mb-3">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 mb-5 line-clamp-3">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-gray-500 mb-6">
                    <p>
                      📍 {event.location}
                    </p>

                    <p>
                      ⏰ {event.time}
                    </p>
                  </div>

                  <Link
                    to={`/events/${event._id}`}
                    className="inline-block bg-pink-600 hover:bg-pink-700 transition text-white px-6 py-3 rounded-xl"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Events;