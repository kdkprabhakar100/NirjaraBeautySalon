import { useEffect, useState } from "react";

type Booking = {
  _id: string;
  name: string;
  phone: string;
  service: string;
  branch: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Cancelled";
};

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchBookings = async () => {
    const res = await fetch("http://localhost:5000/api/bookings", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: string, status: Booking["status"]) => {
    await fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });

    fetchBookings();
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Delete this booking?")) return;

    await fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });

    fetchBookings();
  };

  return (
    <div>
      <h1 className="font-serif text-5xl text-[#E75480]">Bookings</h1>

      <p className="mt-2 text-[#8A6F78]">
        View, confirm, cancel, or delete customer bookings.
      </p>

      <div className="mt-10 overflow-x-auto rounded-3xl bg-white shadow-sm">
        <table className="w-full min-w-[950px] border-collapse">
          <thead className="bg-[#FCE7EF] text-left text-sm text-[#E75480]">
            <tr>
              <th className="p-5">Customer</th>
              <th className="p-5">Phone</th>
              <th className="p-5">Service</th>
              <th className="p-5">Branch</th>
              <th className="p-5">Date</th>
              <th className="p-5">Time</th>
              <th className="p-5">Status</th>
              <th className="p-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-t border-[#E75480]/10">
                <td className="p-5 text-sm font-medium text-[#3A2A2F]">
                  {booking.name}
                </td>

                <td className="p-5 text-sm text-[#8A6F78]">
                  {booking.phone}
                </td>

                <td className="p-5 text-sm text-[#8A6F78]">
                  {booking.service}
                </td>

                <td className="p-5 text-sm text-[#8A6F78]">
                  {booking.branch}
                </td>

                <td className="p-5 text-sm text-[#8A6F78]">
                  {booking.date}
                </td>

                <td className="p-5 text-sm text-[#8A6F78]">
                  {booking.time}
                </td>

                <td className="p-5">
                  <span
                    className={`rounded-full px-4 py-1 text-xs ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-[#FCE7EF] text-[#E75480]"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td className="p-5">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateStatus(booking._id, "Confirmed")}
                      className="rounded-full bg-green-100 px-4 py-2 text-xs text-green-700"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() => updateStatus(booking._id, "Cancelled")}
                      className="rounded-full bg-red-100 px-4 py-2 text-xs text-red-700"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => deleteBooking(booking._id)}
                      className="rounded-full bg-[#FCE7EF] px-4 py-2 text-xs text-[#E75480]"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td colSpan={8} className="p-8 text-center text-[#8A6F78]">
                  No bookings available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}