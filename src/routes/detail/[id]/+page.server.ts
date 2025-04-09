import { PUBLIC_API_URL_BE } from '$env/static/public';

export async function load({ params, fetch }) {
    try {
        const res = await fetch(`${PUBLIC_API_URL_BE}/product/${params.id}`);
        const product = await res.json();
        console.log('Product:', product);
        
        const resProd = await fetch(`${PUBLIC_API_URL_BE}/category/${product.data.category.category_name}`);
        const category = await resProd.json();
        console.log('Category:', category);
        return{ product, category };
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}