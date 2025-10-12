import { NextRequest, NextResponse } from 'next/server';
import { ProductService } from '@/lib/services/product-service';

import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only
);


// GET all products
export async function GET(request: NextRequest) {
  try {
    // const searchParams = request.nextUrl.searchParams;
    // const page = parseInt(searchParams.get('page') || '1');
    // const limit = parseInt(searchParams.get('limit') || '10');
    // const search = searchParams.get('search');

    // if (search) {
    //   const products = await ProductService.searchProducts(search);
    //   return NextResponse.json({ products });
    // }

    const result = await ProductService.getAllProducts();

    // const result = await ProductService.getProductsPaginated(page, limit);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
// /app/api/products/route.ts



export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { images, name, description, originalPrice, category, is_on_sale, discountPercent, discountedPrice, quantity } = body;

    // images is expected to be an array of { name: string, base64: string } or File-like objects
    const uploadedUrls: string[] = [];

    if (images && images.length > 0) {
      for (const imageObj of images) {
        const fileName = imageObj.name;
        // const fileBuffer = Buffer.from(imageObj.base64, 'base64'); // convert base64 to buffer if coming from frontend
        
        const { data, error } = await supabaseAdmin.storage
          .from('product-images')
          .upload(fileName, imageObj.file);

        if (error) throw new Error(`Failed to upload ${fileName}: ${error.message}`);

        const { data: publicUrlData } = supabaseAdmin.storage
          .from('product-images')
          .getPublicUrl(fileName);

        if (!publicUrlData?.publicUrl) throw new Error(`Failed to get public URL for ${fileName}`);

        uploadedUrls.push(publicUrlData.publicUrl);
      }
    }

    // Create product in DB
    const product = await ProductService.createProduct({
      name,
      description: description,
      originalPrice,
      category,
      imageUrls: uploadedUrls,
      is_on_sale: is_on_sale,
      discountPercent: discountPercent,
      discountedPrice,
      quantity
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}
