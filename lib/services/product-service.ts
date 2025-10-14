import { prisma } from '@/lib/prisma';
import {  Product } from '@prisma/client';

export type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProductInput = Partial<CreateProductInput>;

export class ProductService {
  /**
   * Fetch all products
   */
  static async getAllProducts(): Promise<Product[]> {
    try {
      return await prisma.product.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  /**
   * Fetch products with pagination
   */
//   static async getProductsPaginated(page: number = 1, limit: number = 10) {
//     try {
//       const skip = (page - 1) * limit;

//       const [products, total] = await Promise.all([
//         prisma.product.findMany({
//           skip,
//           take: limit,
//           orderBy: {
//             createdAt: 'desc',
//           },
//         }),
//         prisma.product.count(),
//       ]);

//       return {
//         products,
//         pagination: {
//           total,
//           page,
//           limit,
//           totalPages: Math.ceil(total / limit),
//         },
//       };
//     } catch (error) {
//       console.error('Error fetching paginated products:', error);
//       throw new Error('Failed to fetch products');
//     }
//   }

  /**
   * Fetch single product by ID
   */
  static async getProductById(id: string): Promise<Product | null> {
    try {
      return await prisma.product.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  }

  /**
   * Create a new product
   */
  static async createProduct(data: CreateProductInput): Promise<Product> {
    try {
      return await prisma.product.create({
        data: {
          name: data.name,
          description: data.description,
          originalPrice: data.originalPrice,
          discountedPrice:data.discountedPrice,
          category:data.category,
          imageUrls: data.imageUrls,
          is_on_sale: data.is_on_sale,
          discountPercent: data.discountPercent,
          quantity:data.quantity,
        },
      });
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  }

  /**
   * Update an existing product
   */
  static async updateProduct(id: string, data: UpdateProductInput): Promise<Product> {
    try {
      return await prisma.product.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Failed to update product');
    }
  }

  /**
   * Delete a product
   */
  static async deleteProduct(id: string): Promise<Product> {
    try {
      return await prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to delete product');
    }
  }

  /**
   * Toggle sale status
   */
  static async toggleSaleStatus(
    id: string,
    isOnSale: boolean,
    discountPercentage?: number
  ): Promise<Product> {
    try {
      return await prisma.product.update({
        where: { id },
        data: {
          is_on_sale:isOnSale,
          discountPercent: isOnSale ? (discountPercentage ?? 0) : 0,
        },
      });
    } catch (error) {
      console.error('Error toggling sale status:', error);
      throw new Error('Failed to update sale status');
    }
  }

  /**
   * Get products on sale
   */
  static async getProductsOnSale(): Promise<Product[]> {
    try {
      return await prisma.product.findMany({
        where: {
          is_on_sale: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      console.error('Error fetching sale products:', error);
      throw new Error('Failed to fetch sale products');
    }
  }

  /**
   * Search products
   */
  static async searchProducts(query: string): Promise<Product[]> {
    try {
      return await prisma.product.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      console.error('Error searching products:', error);
      throw new Error('Failed to search products');
    }
  }

  /**
   * Calculate final price after discount
   */
  static calculateFinalPrice(price: number, discountPercentage: number): number {
    return price - (price * discountPercentage) / 100;
  }

  /**
   * Get product statistics
   */
//   static async getProductStats() {
//     try {
//       const [total, onSale, avgPrice] = await Promise.all([
//         prisma.product.count(),
//         prisma.product.count({
//           where: { isOnSale: true },
//         }),
//         prisma.product.aggregate({
//           _avg: {
//             price: true,
//           },
//         }),
//       ]);

//       return {
//         total,
//         onSale,
//         regular: total - onSale,
//         avgPrice: avgPrice._avg.price || 0,
//       };
//     } catch (error) {
//       console.error('Error fetching product stats:', error);
//       throw new Error('Failed to fetch product statistics');
//     }
//   }
}