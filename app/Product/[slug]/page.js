import { getProductbySlug } from '@/lib/data/getProducts';
export const dynamic = "force-dynamic";
import Image from 'next/image';
import React from 'react';


export default async function Productpage({params}){
          const resolvedParams = await params;
  const { slug } = resolvedParams;

  const product = await getProductbySlug(slug);
        if(!product){
                return <div>Product not Found</div>
        }

        return (
            <div>
                <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <Image src={product.image} height={300} width={300} alt={product.title}/>
            </div>
        )
}
