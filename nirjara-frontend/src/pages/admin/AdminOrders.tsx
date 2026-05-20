import { useEffect, useState } from "react";

type OrderItem = {
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type Order = {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
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
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update order");
      }

      fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Failed to update order");
    }
  };

  const deleteOrder = async (id: string) => {
    const confirmDelete = window.confirm(
      "Delete this order?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete order");
      }

      fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Failed to delete order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center">
        Loading orders...
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#FFF5F8] p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        
        <div className="mb-10 text-center">
          <h1 className="font-serif text-5xl text-[#E75480]">
            Orders
          </h1>

          <p className="mt-3 text-lg text-[#8A6F78]">
            View and manage ecommerce customer orders
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
            <p className="text-lg text-[#8A6F78]">
              No orders found
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
            
            <table className="min-w-full">
              
              <thead className="bg-[#FCE7EF]">
                <tr>
                  <th className="px-6 py-5 text-left text-sm text-[#E75480]">
                    Customer
                  </th>

                  <th className="px-6 py-5 text-left text-sm text-[#E75480]">
                    Phone
                  </th>

                  <th className="px-6 py-5 text-left text-sm text-[#E75480]">
                    Email
                  </th>

                  <th className="px-6 py-5 text-left text-sm text-[#E75480]">
                    Address
                  </th>

                  <th className="px-6 py-5 text-left text-sm text-[#E75480]">
                    Items
                  </th>

                  <th className="px-6 py-5 text-left text-sm text-[#E75480]">
                    Total
                  </th>

                  <th className="px-6 py-5 text-left text-sm text-[#E75480]">
                    Status
                  </th>

                  <th className="px-6 py-5 text-left text-sm text-[#E75480]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-[#FCE7EF]"
                  >
                    <td className="px-6 py-6 font-semibold">
                      {order.customerName}
                    </td>

                    <td className="px-6 py-6">
                      {order.phone}
                    </td>

                    <td className="px-6 py-6">
                      {order.email}
                    </td>

                    <td className="px-6 py-6 max-w-[220px]">
                      {order.address}
                    </td>

                    <td className="px-6 py-6">
                      <div className="space-y-4">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-16 w-16 rounded-2xl object-cover"
                            />

                            <div>
                              <h3 className="font-semibold">
                                {item.name}
                              </h3>

                              <p className="text-sm text-[#8A6F78]">
                                Qty: {item.quantity}
                              </p>

                              <p className="text-[#E75480]">
                                ${item.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-6 text-2xl font-bold text-[#E75480]">
                      ${order.totalAmount?.toFixed(2)}
                    </td>

                    <td className="px-6 py-6">
                      <span className="rounded-full bg-[#FCE7EF] px-4 py-2 text-sm text-[#E75480]">
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-3">
                        
                        <button
                          onClick={() =>
                            updateStatus(
                              order._id,
                              "Processing"
                            )
                          }
                          className="rounded-full bg-yellow-200 px-5 py-2"
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
                          className="rounded-full bg-blue-200 px-5 py-2"
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
                          className="rounded-full bg-green-200 px-5 py-2"
                        >
                          Delivered
                        </button>

                        <button
                          onClick={() =>
                            deleteOrder(order._id)
                          }
                          className="rounded-full bg-red-100 px-5 py-2 text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}
      </div>
    </section>
  );
}