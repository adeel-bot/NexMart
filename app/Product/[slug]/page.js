import { getProductbySlug } from '@/lib/data/getProducts';
export const dynamic = "force-dynamic";
import Image from 'next/image';
import React from 'react';

// async function getProduct (slug) {
//         const res = await fetch(`https://localhost:3000/Products/${slug}`,{
//             cache: "no-store"
//         })
//             if(!res.ok){
//                 return null;
//             }
//         return res.json();
// }

export default async function Productpage({params}){
            const {slug} = params;
            const product = await getProductbySlug(slug);
        if(!product){
                return <div>Product not Found</div>
        }

        return (
            <div>
                <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <Image src={product.image} width={300} alt={product.title}/>
            </div>
        )
}
