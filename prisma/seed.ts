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

  // Clear existing data (optional)
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

  // 1. Admin Seed
  console.log("👑 Creating admin...");
  const admin = await prisma.admin.create({
    data: {
      name: "Store Admin",
      email: "admin@example.com",
      password: "admin123",
      role: "SUPER_ADMIN",
    },
  });

  // 2. Customer Seed (first create customer, then cart)
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

  // 3. Create cart for the customer
  console.log("🛒 Creating cart...");
  const cart = await prisma.cart.create({
    data: {
      customerId: customer.id,
    },
  });

  // 3. Categories Seed
  console.log("📁 Creating categories...");
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
  console.log("📦 Creating products...");
  const productsData = [
    // MEN
    {
      name: "Men's Classic Polo Shirt",
      description: "Soft cotton polo shirt for everyday wear",
      price: new Prisma.Decimal("24.99"),
      stock: 150,
      categoryId: men.id,
      adminId: admin.id,
      sku: "MEN-POLO-001",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    },
    {
      name: "Men's Slim Fit Jeans",
      description: "Dark blue slim fit denim jeans",
      price: new Prisma.Decimal("39.99"),
      stock: 120,
      categoryId: men.id,
      adminId: admin.id,
      sku: "MEN-JEANS-002",
      imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
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
      imageUrl: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w-400&h=400&fit=crop",
    },
    {
      name: "Women's Handbag",
      description: "Premium faux-leather handbag",
      price: new Prisma.Decimal("59.99"),
      stock: 50,
      categoryId: women.id,
      adminId: admin.id,
      sku: "WMN-HB-011",
      imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
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
      imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
    },
    {
      name: "Kids' School Shoes",
      description: "Comfortable school shoes for kids",
      price: new Prisma.Decimal("29.99"),
      stock: 90,
      categoryId: kids.id,
      adminId: admin.id,
      sku: "KID-SHOES-200",
      imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    },
  ];

  const products = await Promise.all(
    productsData.map((productData) => prisma.product.create({ data: productData }))
  );

  console.log("✨ Products seeded:", products.length);

  // 5. Add a Cart Item
  console.log("➕ Adding item to cart...");
  await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId: products[0].id,
      quantity: 2,
    },
  });

  // 6. Create sample order
  console.log("📋 Creating sample order...");
  const order = await prisma.order.create({
    data: {
      customerId: customer.id,
      status: "PENDING",
      totalAmount: new Prisma.Decimal("74.97"),
      shippingAddress: customer.defaultAddress!,
      billingAddress: customer.defaultAddress!,
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 2,
            unitPrice: products[0].price,
            lineTotal: new Prisma.Decimal("49.98"),
          },
          {
            productId: products[1].id,
            quantity: 1,
            unitPrice: products[1].price,
            lineTotal: products[1].price,
          },
        ],
      },
      payment: {
        create: {
          amount: new Prisma.Decimal("74.97"),
          method: "CREDIT_CARD",
          status: "PAID",
          transactionId: "TXN_" + Date.now(),
          paidAt: new Date(),
        },
      },
    },
  });

  // 7. Create sample report
  console.log("📊 Creating sample report...");
  const reportData = {
    totalSales: 149.94,
    totalOrders: 2,
    topSelling: ["Men's Classic Polo Shirt", "Men's Slim Fit Jeans"],
    inventoryStatus: {
      inStock: 690,
      lowStock: 10,
      outOfStock: 0,
    },
  };

  await prisma.report.create({
    data: {
      adminId: admin.id,
      reportType: "SALES_SUMMARY",
      periodStart: new Date("2024-01-01"),
      periodEnd: new Date("2024-12-31"),
      dataJson: JSON.stringify(reportData),
    },
  });

  // 8. Create sample combo
  console.log("🎁 Creating sample combo...");
  const combo = await prisma.combo.create({
    data: {
      customerId: customer.id,
      name: "Summer Outfit Combo",
      description: "Perfect summer outfit combination",
      totalPrice: new Prisma.Decimal("64.98"),
      isSaved: true,
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            unitPrice: products[0].price,
          },
          {
            productId: products[2].id,
            quantity: 1,
            unitPrice: products[2].price,
          },
        ],
      },
    },
  });

  console.log("✅ Seeding complete!");
  console.log("📊 Summary:");
  console.log(`  👑 Admin: 1`);
  console.log(`  👤 Customer: 1`);
  console.log(`  📁 Categories: 3`);
  console.log(`  📦 Products: ${products.length}`);
  console.log(`  🛒 Cart items: 1`);
  console.log(`  📋 Orders: 1`);
  console.log(`  📊 Reports: 1`);
  console.log(`  🎁 Combos: 1`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });