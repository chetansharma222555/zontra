import { NextRequest, NextResponse } from 'next/server';
import { ProductService } from '@/lib/services/product-service';

import { createClient } from '@supabase/supabase-js';
import { getErrorMessage } from '@/lib/utils';

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only
);


// GET all products
export async function GET() {
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
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
// /app/api/products/route.ts



export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const originalPrice = Number(formData.get("originalPrice"));
    const category = formData.get("category") as string;
    const is_on_sale = formData.get("is_on_sale") === "true";
    const discountPercent = Number(formData.get("discountPercent"));
    const discountedPrice = Number(formData.get("discountedPrice"));
    const quantity = Number(formData.get("quantity"));

    const uploadedUrls: string[] = [];

    const images = formData.getAll("images") as File[];

    for (const file of images) {
      const fileName = `${Date.now()}-${file.name}`;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error } = await supabaseAdmin.storage
        .from("product-images")
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (error) throw new Error(error.message);

      const { data: publicUrlData } = supabaseAdmin.storage
        .from("product-images")
        .getPublicUrl(fileName);

      uploadedUrls.push(publicUrlData.publicUrl);
    }

    const product = await ProductService.createProduct({
      name,
      description,
      originalPrice,
      category,
      imageUrls: uploadedUrls,
      is_on_sale,
      discountPercent,
      discountedPrice,
      quantity,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}

