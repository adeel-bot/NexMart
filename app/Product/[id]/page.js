import Topbar from "../../components/layout/Topbar";
import Navbar from "../../components/layout/Navbar";
import SubNavbar from "../../components/layout/SubNavbar";
import Footer from "../../components/layout/Footer";
import ProductDetails from "./ProductDetails"; // client
import Reviews from "./Reviews";               // client
import { notFound } from 'next/navigation';    // Optional: for clean 404s

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }) {
  const { id } = await params;
  
  if (!id) {
    notFound();  // Bail early if no ID
  }

  // Build full absolute URL using server-safe env var
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';  // Fallback for safety
  const apiUrl = `${baseUrl}/api/products?id=${id}`;

  const res = await fetch(apiUrl, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.error(`API Error for ID ${id}: ${res.status} - ${res.statusText}`);
    // Optional: Use notFound() for a proper 404 page instead of manual div
    // notFound();
    return (
      <div className="text-center mt-20 text-red-500 text-xl">
        Product Not Found (Error: {res.status})
      </div>
    );
  }

  const product = await res.json();  // Parse JSON

  if (!product) {
    return (
      <div className="text-center mt-20 text-red-500 text-xl">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Topbar />
      <Navbar />
      <SubNavbar />

      {/* Product Section */}
      <ProductDetails product={product} />

      {/* Reviews / Description Section */}
      <Reviews 
       product={product}  
      />

      <Footer />
    </div>
  );
}