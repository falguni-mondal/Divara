import mongoose from "mongoose";

// Helper function
const formatPriceWithCommas = (price) => {
  if (!price || isNaN(price)) return "0";
  return price.toLocaleString("en-IN");
};

// ImageKit Image Variant Schema
const imageVariantSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "Image URL is required"],
    },
    imageId: {
      type: String,
      required: [true, "ImageKit file ID is required"],
    },
  },
  { _id: false }
);

// Image Schema
const imageSchema = new mongoose.Schema(
  {
    thumb: imageVariantSchema,
    sm: imageVariantSchema,
    md: imageVariantSchema,
    lg: imageVariantSchema,
  },
  { _id: false }
);

// Size Schema
const sizeSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
      enum: ["xs", "s", "m", "l", "xl"],
      lowercase: true,
    },
    available: {
      type: Boolean,
      default: false,
    },
    originalPrice: {
      type: Number,
      required: function() {
        return this.available === true;
      },
      min: [0, "Original price cannot be negative"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
    },
    price: String,
    priceNumeric: Number,
    stock: {
      type: Number,
      required: function() {
        return this.available === true;
      },
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
  },
  { _id: false }
);

// Pre-validate hook for price calculation
sizeSchema.pre("validate", function (next) {
  if (
    this.available &&
    this.originalPrice !== undefined &&
    this.discount !== undefined
  ) {
    const calculatedPrice =
      this.originalPrice - (this.originalPrice * this.discount) / 100;

    this.priceNumeric = Math.round(calculatedPrice * 100) / 100;
    this.price = formatPriceWithCommas(this.priceNumeric);
  }
  next();
});

// Main Product Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [10, "Product name must be at least 10 characters"],
      maxlength: [50, "Product name must not exceed 50 characters"],
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      minlength: [20, "Description must be at least 20 characters"],
      maxlength: [300, "Description must not exceed 300 characters"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: [
          "dresses",
          "knitwear",
          "outerwear",
          "t-shirts",
          "shirts & tops",
          "denim wears",
          "jackets & coats",
          "leather clothing",
        ],
        message: "{VALUE} is not a valid category",
      },
    },

    material: {
      type: String,
      default: ""
    },

    colour:{
      type: {
        name: {
          type: String
        },
        shade: {
          type: String
        }
      },
      required: [true, "A colour must be selected!"]
    },

    images: {
      type: [imageSchema],
      required: [true, "At least one image is required"],
      validate: {
        validator: function(images) {
          return images.length > 0 && images.length <= 5;
        },
        message: "Product must have between 1 and 5 images",
      },
    },

    sizes: {
      type: [sizeSchema],
      required: [true, "At least one size is required"],
      validate: {
        validator: function(sizes) {
          return sizes.length > 0 && sizes.some(size => size.available === true);
        },
        message: "At least one size must be available",
      },
    },

    shippingCost: {
      type: Number,
      default: 0,
      min: [0, "Shipping cost cannot be negative"],
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isNewArrival: {
      type: Boolean,
      default: false,
    },

    totalStock: {
      type: Number,
      default: 0,
    },

    sales: {
      type: Number,
      default: 0
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      sparse: true,
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes
productSchema.index({ slug: 1 });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ createdAt: -1 });

// Virtual: Price Range
productSchema.virtual('priceRange').get(function() {
  const availableSizes = this.sizes.filter(size => size.available);
  if (availableSizes.length === 0) return null;
  
  const prices = availableSizes.map(size => size.priceNumeric);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  return minPrice === maxPrice 
    ? `₹${formatPriceWithCommas(minPrice)}` 
    : `₹${formatPriceWithCommas(minPrice)} - ₹${formatPriceWithCommas(maxPrice)}`;
});

// Pre-save: Generate slug
productSchema.pre("save", function (next) {
  if (this.isModified("name") && this.name) {
    const baseSlug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    this.slug = `${baseSlug}-${this._id}`;
  }
  next();
});

// Pre-save: Calculate total stock
productSchema.pre("save", function (next) {
  this.totalStock = this.sizes
    .filter((size) => size.available)
    .reduce((total, size) => total + (size.stock || 0), 0);
  next();
});

export default mongoose.model("product", productSchema);