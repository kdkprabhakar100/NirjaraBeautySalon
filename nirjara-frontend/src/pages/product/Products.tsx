import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

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

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products`
      );

      const data = await res.json();

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center text-[#8A6F78]">
        Loading products...
      </section>
    );
  }

  return (
    <section className="bg-[#FFF5F8] px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-4xl text-[#E75480]">
            Our Products
          </h1>

          <p className="mt-3 text-[#8A6F78]">
            Discover premium beauty and skincare essentials
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-[#8A6F78]">
            No products available
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}