import { useEffect, useState } from "react";

type Order = {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  totalAmount: number;
  status: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders`
      );

      const data = await res.json();

      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            status,
          }),
        }
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <section className="p-10">
        Loading orders...
      </section>
    );
  }

  return (
    <section className="p-6">
      <div className="mb-8">
        <h1 className="font-serif text-4xl text-[#E75480]">
          Orders
        </h1>

        <p className="mt-2 text-[#8A6F78]">
          Manage ecommerce customer orders
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="rounded-3xl bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              
              <div>
                <h2 className="font-serif text-2xl text-[#3A2A2F]">
                  {order.customerName}
                </h2>

                <p className="mt-2 text-[#8A6F78]">
                  {order.email}
                </p>

                <p className="text-[#8A6F78]">
                  {order.phone}
                </p>

                <p className="mt-2 text-sm text-[#8A6F78]">
                  {order.address}
                </p>
              </div>

              <div>
                <p className="text-3xl font-semibold text-[#E75480]">
                  ${order.totalAmount}
                </p>

                <p className="mt-2 text-sm text-[#8A6F78]">
                  Status: {order.status}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t pt-6">
              <h3 className="mb-4 font-semibold text-[#3A2A2F]">
                Ordered Items
              </h3>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-2xl object-cover"
                    />

                    <div>
                      <p className="font-medium text-[#3A2A2F]">
                        {item.name}
                      </p>

                      <p className="text-sm text-[#8A6F78]">
                        Quantity: {item.quantity}
                      </p>

                      <p className="text-sm text-[#E75480]">
                        ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Processing"
                  )
                }
                className="rounded-full bg-yellow-100 px-5 py-2 text-sm"
              >
                Processing
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Shipped"
                  )
                }
                className="rounded-full bg-blue-100 px-5 py-2 text-sm"
              >
                Shipped
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Delivered"
                  )
                }
                className="rounded-full bg-green-100 px-5 py-2 text-sm"
              >
                Delivered
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}