import { getProductbySlug } from "@/lib/data/getProducts";
import Topbar from "@/app/components/layout/Topbar";
import Navbar from "@/app/components/layout/Navbar";
import SubNavbar from "@/app/components/layout/SubNavbar";
import Footer from "@/app/components/layout/Footer";
import ProductDetails from "./ProductDetails"; // client
import Reviews from "./Reviews";               // client

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductbySlug(slug);

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
      <Reviews productId={product.id} productName={product.title}  />

      <Footer />
    </div>
  );
}
