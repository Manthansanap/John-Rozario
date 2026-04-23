const mongoose = require("mongoose");
const fs = require("fs");

const envLines = fs.readFileSync(".env.local", "utf8").split("\n");
let MONGODB_URI = "";
for (const line of envLines) {
  if (line.startsWith("MONGODB_URI=")) {
    MONGODB_URI = line.replace("MONGODB_URI=", "").trim();
  }
}

if (!MONGODB_URI) {
  console.error("MONGODB_URI not found");
  process.exit(1);
}

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String },
    slug: { type: String, required: true, unique: true },
    category: { type: String, default: "Legal News" },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

const sampleBlogs = [
  {
    title: "Understanding the Transfer of Property Act, 1882",
    content: "The Transfer of Property Act of 1882 forms the bedrock of real estate transactions in India. Whether you are buying land, a residential flat, or a commercial space, understanding the nuances of sale deeds, mortgages, and lease agreements is critical to preventing protracted disputes. A clear title is the first step towards a successful property investment.",
    author: "Adv. Rozario John",
    slug: "understanding-transfer-of-property-act-1882",
    category: "Property Law",
    published: true,
  },
  {
    title: "Navigating RERA: A Guide for Homebuyers",
    content: "The Real Estate (Regulation and Development) Act (RERA) has fundamentally transformed the property market in India. For buyers, the Act brings necessary transparency and holds developers accountable for delays or deviations from the original plan. Before investing your hard-earned money, ensuring the project is RERA registered and compliant is absolutely essential.",
    author: "Adv. Rozario John",
    slug: "navigating-rera-guide-for-homebuyers",
    category: "Real Estate",
    published: true,
  },
  {
    title: "Why Clear Property Titles Matter",
    content: "One of the most common reasons for real estate litigation is the absence of a clear and marketable title. Conducting thorough due diligence, including a title search report covering at least the past 30 years, can save buyers from significant financial losses and legal headaches in the future. Always engage a legal expert to vet property documents before signing any agreement.",
    author: "Adv. Rozario John",
    slug: "why-clear-property-titles-matter",
    category: "Land Updates",
    published: true,
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB!");

    for (const blog of sampleBlogs) {
      await Blog.replaceOne({ slug: blog.slug }, blog, { upsert: true });
      console.log(`Upserted: ${blog.title}`);
    }

    console.log("Blogs seeded successfully!");
  } catch (error) {
    console.error("Error seeding blogs:", error);
  } finally {
    mongoose.connection.close();
  }
}

seed();
