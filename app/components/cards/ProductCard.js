"use client";
import Image from "next/image";
import Link from "next/link";
import Radio from "../ui/Radio";
import AddToCartButton from "../AddToCartButton";

export default function ProductCard({ product, comboDetails }) {
  return (
    <Link href={`/Product/${product.id}`}>
      <div className="flex flex-col p-5 border-[1.5px] border-gray-300 rounded-2xl hover:scale-[1.01] duration-200 transition-all ease-in-out">
        <div className="flex items-center justify-center">
          <Image
            width={110}
            height={110}
            src={product.imageUrl}
            alt={product.name}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg px-2 font-bold text-[#1B5A7D]">
            {product.name}
          </h2>
          <p className="font-semibold px-2 ">$ {product.price}</p>
          <div className="mx-auto">
            <Radio rating={4.5} />
          </div>
          <AddToCartButton productId={product.id} comboDetails={comboDetails} />
        </div>
      </div>
    </Link>
  );
}
