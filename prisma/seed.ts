// prisma/seed.ts
import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // --------------------
  // Clear existing data
  // --------------------
  console.log("🗑️ Clearing existing data...");
  await prisma.report.deleteMany();
  await prisma.comboItem.deleteMany();
  await prisma.combo.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.admin.deleteMany();

  // --------------------
  // Admin
  // --------------------
  console.log("👑 Creating admin...");
  const admin = await prisma.admin.create({
    data: {
      name: "Store Admin",
      email: "admin@example.com",
      password: "admin123",
      role: "SUPER_ADMIN",
    },
  });

  // --------------------
  // Customer
  // --------------------
  console.log("👤 Creating customer...");
  const customer = await prisma.customer.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password: "user123",
      phone: "0300-1234567",
      defaultAddress: "House 13, Street 4, Karachi",
    },
  });

  // Cart
  await prisma.cart.create({
    data: { customerId: customer.id },
  });

  // --------------------
  // Categories
  // --------------------
  console.log("📁 Creating categories...");
  const [men, women, kids] = await Promise.all([
    prisma.category.create({
      data: {
        name: "Men",
        description: "Men clothing & accessories",
        adminId: admin.id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Women",
        description: "Women clothing & accessories",
        adminId: admin.id,
      },
    }),
    prisma.category.create({
      data: {
        name: "Kids",
        description: "Kids clothing & accessories",
        adminId: admin.id,
      },
    }),
  ]);

  // --------------------
  // Products
  // --------------------
  console.log("📦 Creating products...");
  const products = await Promise.all([
    // MEN
    prisma.product.create({
      data: {
        name: "Men Polo Shirt",
        description: "Classic cotton polo shirt",
        price: new Prisma.Decimal("24.99"),
        stock: 150,
        sku: "MEN-POLO-01",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        categoryId: men.id,
        adminId: admin.id,
      },
    }),
    prisma.product.create({
      data: {
        name: "Men Jeans",
        description: "Slim fit denim jeans",
        price: new Prisma.Decimal("39.99"),
        stock: 120,
        sku: "MEN-JEANS-02",
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d",
        categoryId: men.id,
        adminId: admin.id,
      },
    }),

    // WOMEN
    prisma.product.create({
      data: {
        name: "Women Summer Dress",
        description: "Floral summer dress",
        price: new Prisma.Decimal("49.99"),
        stock: 80,
        sku: "WMN-DRESS-01",
        imageUrl: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43",
        categoryId: women.id,
        adminId: admin.id,
      },
    }),
    prisma.product.create({
      data: {
        name: "Women Handbag",
        description: "Leather-style handbag",
        price: new Prisma.Decimal("59.99"),
        stock: 50,
        sku: "WMN-BAG-02",
        imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
        categoryId: women.id,
        adminId: admin.id,
      },
    }),

    // KIDS
    prisma.product.create({
      data: {
        name: "Kids T-Shirt",
        description: "Cartoon printed t-shirt",
        price: new Prisma.Decimal("14.99"),
        stock: 200,
        sku: "KID-TS-01",
        imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
        categoryId: kids.id,
        adminId: admin.id,
      },
    }),
    prisma.product.create({
      data: {
        name: "Kids School Shoes",
        description: "Comfortable school shoes",
        price: new Prisma.Decimal("29.99"),
        stock: 90,
        sku: "KID-SHOES-01",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
        categoryId: kids.id,
        adminId: admin.id,
      },
    }),
  ]);

  // --------------------
  // Combos (ADMIN CREATED)
  // --------------------
  console.log("🎁 Creating combos...");

  // Combo 1: Men's Outfit
  await prisma.combo.create({
    data: {
      name: "Men's Casual Outfit",
      description: "Polo shirt + jeans combo",
      price: new Prisma.Decimal("59.99"),
      isActive: true,
      adminId: admin.id,
      items: {
        create: [
          { productId: products[0].id, quantity: 1 }, // Polo
          { productId: products[1].id, quantity: 1 }, // Jeans
        ],
      },
    },
  });

  // Combo 2: Women's Summer Combo
  await prisma.combo.create({
    data: {
      name: "Women's Summer Combo",
      description: "Dress + handbag bundle",
      price: new Prisma.Decimal("99.99"),
      isActive: true,
      adminId: admin.id,
      items: {
        create: [
          { productId: products[2].id, quantity: 1 }, // Dress
          { productId: products[3].id, quantity: 1 }, // Bag
        ],
      },
    },
  });

  // Combo 3: Kids Essentials
  await prisma.combo.create({
    data: {
      name: "Kids Essentials Pack",
      description: "T-shirt + school shoes",
      price: new Prisma.Decimal("39.99"),
      isActive: true,
      adminId: admin.id,
      items: {
        create: [
          { productId: products[4].id, quantity: 1 }, // T-shirt
          { productId: products[5].id, quantity: 1 }, // Shoes
        ],
      },
    },
  });

  // --------------------
  // Report
  // --------------------
  await prisma.report.create({
    data: {
      adminId: admin.id,
      reportType: "INITIAL_SEED",
      periodStart: new Date("2024-01-01"),
      periodEnd: new Date("2024-12-31"),
      dataJson: JSON.stringify({ seeded: true }),
    },
  });

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
