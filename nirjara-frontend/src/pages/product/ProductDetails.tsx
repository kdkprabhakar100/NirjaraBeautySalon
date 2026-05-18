import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  featured: boolean;
  brand: string;
};

export default function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`
      );

      const data = await res.json();

      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <section className="py-20 text-center">
        Loading product...
      </section>
    );
  }

  if (!product) {
    return (
      <section className="py-20 text-center">
        Product not found
      </section>
    );
  }

  return (
    <section className="bg-[#FFF5F8] px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        
        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-[#C77A95]">
            {product.category}
          </p>

          <h1 className="mt-3 font-serif text-5xl text-[#3A2A2F]">
            {product.name}
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#8A6F78]">
            {product.description}
          </p>

          <p className="mt-8 text-3xl font-semibold text-[#E75480]">
            ${product.price}
          </p>

          <p className="mt-3 text-sm text-[#8A6F78]">
            Stock: {product.stock}
          </p>

          <button
            onClick={() =>
              addToCart({
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.images?.[0],
                quantity: 1,
              })
            }
            className="mt-10 rounded-full bg-[#E75480] px-8 py-4 text-white transition hover:bg-[#d63c6d]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}