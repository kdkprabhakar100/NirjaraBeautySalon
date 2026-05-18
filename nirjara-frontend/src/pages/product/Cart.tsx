import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <section className="py-20 text-center">
        <h1 className="font-serif text-4xl text-[#E75480]">
          Your cart is empty
        </h1>
      </section>
    );
  }

  return (
    <section className="bg-[#FFF5F8] px-6 py-16 md:px-12">
      <div className="mx-auto max-w-5xl">
        
        <h1 className="mb-10 font-serif text-4xl text-[#E75480]">
          Shopping Cart
        </h1>

        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-6 rounded-3xl bg-white p-5 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-28 w-28 rounded-2xl object-cover"
              />

              <div className="flex-1">
                <h2 className="font-serif text-2xl text-[#3A2A2F]">
                  {item.name}
                </h2>

                <p className="mt-2 text-[#E75480]">
                  ${item.price}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() =>
                      decreaseQuantity(item._id)
                    }
                    className="rounded-full bg-[#F8D7E1] px-3 py-1"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQuantity(item._id)
                    }
                    className="rounded-full bg-[#F8D7E1] px-3 py-1"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() =>
                  removeFromCart(item._id)
                }
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-3xl text-[#3A2A2F]">
              Total
            </h2>

            <p className="text-3xl font-semibold text-[#E75480]">
              ${total.toFixed(2)}
            </p>
          </div>

          <Link
            to="/checkout"
            className="mt-8 block rounded-full bg-[#E75480] px-6 py-4 text-center text-white transition hover:bg-[#d63c6d]"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}