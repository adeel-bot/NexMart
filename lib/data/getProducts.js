import products from './data/products.json';

    export async function getProductbySlug(slug){
            return products.find((product)=> product.slug === slug) || null;
    }

    export async function getAllProducts(){
            return products;
    }