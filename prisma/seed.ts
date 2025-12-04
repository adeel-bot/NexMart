import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Admin Seed
  const admin = await prisma.admin.create({
    data: {
      name: "Store Admin",
      email: "admin@example.com",
      password: "admin123",
      role: "SUPER_ADMIN",
    },
  });

  // 2. Customer Seed (WITH CART INCLUDED)
  const customer = await prisma.customer.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password: "user123",
      phone: "0300-1234567",
      defaultAddress: "House 13, Street 4, Karachi",
      cart: { create: {} }, // creates an empty cart
    },
    include: { cart: true }, // IMPORTANT → fixes the error
  });

  // 3. Categories Seed
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Men",
        description: "Men's clothing, footwear, and accessories",
        adminId: admin.id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Women",
        description: "Women's clothing, footwear, and accessories",
        adminId: admin.id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Kids",
        description: "Kids apparel and school wear",
        adminId: admin.id,
      },
    }),
  ]);

  const men = categories[0];
  const women = categories[1];
  const kids = categories[2];

  // 4. Clothing Products Seed
  const products = await prisma.product.createMany({
    data: [
      // MEN
      {
        name: "Men's Classic Polo Shirt",
        description: "Soft cotton polo shirt for everyday wear",
        price: new Prisma.Decimal("24.99"),
        stock: 150,
        categoryId: men.id,
        adminId: admin.id,
        sku: "MEN-POLO-001",
        imageUrl: "/products/mens-polo.jpg",
      },
      {
        name: "Men's Slim Fit Jeans",
        description: "Dark blue slim fit denim jeans",
        price: new Prisma.Decimal("39.99"),
        stock: 120,
        categoryId: men.id,
        adminId: admin.id,
        sku: "MEN-JEANS-002",
        imageUrl: "/products/mens-jeans.jpg",
      },

      // WOMEN
      {
        name: "Women's Floral Dress",
        description: "Elegant floral printed summer dress",
        price: new Prisma.Decimal("49.99"),
        stock: 80,
        categoryId: women.id,
        adminId: admin.id,
        sku: "WMN-DRS-010",
        imageUrl: "/products/women-dress.jpg",
      },
      {
        name: "Women's Handbag",
        description: "Premium faux-leather handbag",
        price: new Prisma.Decimal("59.99"),
        stock: 50,
        categoryId: women.id,
        adminId: admin.id,
        sku: "WMN-HB-011",
        imageUrl: "/products/women-handbag.jpg",
      },

      // KIDS
      {
        name: "Kids' Cartoon T-Shirt",
        description: "Colorful cartoon character t-shirt",
        price: new Prisma.Decimal("14.99"),
        stock: 200,
        categoryId: kids.id,
        adminId: admin.id,
        sku: "KID-TS-100",
        imageUrl: "/products/kids-tshirt.jpg",
      },
      {
        name: "Kids' School Shoes",
        description: "Comfortable school shoes for kids",
        price: new Prisma.Decimal("29.99"),
        stock: 90,
        categoryId: kids.id,
        adminId: admin.id,
        sku: "KID-SHOES-200",
        imageUrl: "/products/kids-shoes.jpg",
      },
    ],
  });

  console.log("✨ Products seeded:", products.count);

  // 5. Add a Cart Item (example)
  const allProducts = await prisma.product.findMany();

  await prisma.cartItem.create({
    data: {
      cartId: customer.cart!.id,
      productId: allProducts[0].id,
      quantity: 2,
      unitPrice: allProducts[0].price,
    },
  });

  console.log("🛒 Cart item added for John Doe");
  console.log("🌱 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
