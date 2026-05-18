import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty");
      navigate("/products");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            items: cart,
            totalAmount: total,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to place order");
      }

      clearCart();
      alert("Order placed successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#FFF5F8] px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-sm">
        <h1 className="mb-10 font-serif text-4xl text-[#E75480]">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={form.customerName}
            onChange={(e) =>
              setForm({ ...form, customerName: e.target.value })
            }
            className="w-full rounded-2xl border border-[#F3D3DC] p-4 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full rounded-2xl border border-[#F3D3DC] p-4 outline-none"
          />

          <input
            type="text"
            placeholder="Phone"
            required
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            className="w-full rounded-2xl border border-[#F3D3DC] p-4 outline-none"
          />

          <textarea
            placeholder="Delivery Address"
            required
            rows={5}
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            className="w-full rounded-2xl border border-[#F3D3DC] p-4 outline-none"
          />

          <div className="rounded-2xl bg-[#FFF5F8] p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-[#3A2A2F]">
                Total
              </h2>

              <p className="text-3xl font-semibold text-[#E75480]">
                ${total.toFixed(2)}
              </p>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full rounded-full bg-[#E75480] px-6 py-4 text-white transition hover:bg-[#d63c6d] disabled:opacity-60"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </section>
  );
}