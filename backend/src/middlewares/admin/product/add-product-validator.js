const validateImages = (images, errors) => {
  if (!images || images.length === 0) {
    errors.images.push("Please upload at least one image!");
  } else if (images.length > 5) {
    errors.images.push("Maximum 5 images allowed!");
  } else {
    images.forEach((image, index) => {
      if (image.size > 5 * 1024 * 1024) {
        errors.images.push(`Image ${index + 1} exceeds 5MB!`);
      }
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/avif",
      ];
      if (!allowedTypes.includes(image.mimetype)) {
        errors.images.push(
          `Image ${index + 1} must be JPEG, PNG, WebP, or AVIF!`
        );
      }
    });
  }
};

const validateGeneralInfo = ({ name, description, category }, errors) => {
  if (!name || name.trim() === "") {
    errors.general.push("Product name is required!");
  } else if (name.length < 10) {
    errors.general.push("Product name must be at least 10 characters!");
  } else if (name.length > 50) {
    errors.general.push("Product name must not exceed 50 characters!");
  }

  if (!description || description.trim() === "") {
    errors.general.push("Product description is required!");
  } else if (description.length < 20) {
    errors.general.push("Description must be at least 20 characters!");
  } else if (description.length > 300) {
    errors.general.push("Description must not exceed 300 characters!");
  }

  const allowedCategories = [
    "dresses",
    "knitwear",
    "outerwear",
    "t-shirts",
    "shirts & tops",
    "denim wears",
    "jackets & coats",
    "leather clothing",
  ];
  if (!category || !allowedCategories.includes(category.toLowerCase())) {
    errors.general.push("Invalid category!");
  }
};

const validateSizes = (sizes, errors) => {
  let parsedSizes;

  if (typeof sizes === "string") {
    try {
      parsedSizes = JSON.parse(sizes);
    } catch (error) {
      errors.size.push("Invalid sizes format!");
      return null;
    }
  } else {
    parsedSizes = sizes;
  }

  if (!parsedSizes || !Array.isArray(parsedSizes) || parsedSizes.length === 0) {
    errors.size.push("Please add at least one size!");
    return null;
  }

  let validSizesCount = 0;

  parsedSizes.forEach((size) => {
    const sizeValue = size.value;

    const hasOriginalPrice =
      size.originalPrice !== undefined &&
      size.originalPrice !== null &&
      size.originalPrice !== "";

    const hasStock =
      size.stock !== undefined &&
      size.stock !== null &&
      size.stock !== "";
      
    const hasDiscount =
      size.discount !== undefined &&
      size.discount !== null &&
      size.discount !== "";

    const anyFieldFilled = hasOriginalPrice || hasStock || hasDiscount;

    if (anyFieldFilled) {
      if (!hasOriginalPrice) {
        errors.sizes[sizeValue].push(
          "Original price is required when size data is provided!"
        );
      } else if (isNaN(size.originalPrice) || Number(size.originalPrice) <= 0) {
        errors.sizes[sizeValue].push("Original price must be greater than 0!");
      }

      if (!hasStock) {
        errors.sizes[sizeValue].push(
          "Stock is required when size data is provided!"
        );
      } else if (isNaN(size.stock) || Number(size.stock) <= 0) {
        errors.sizes[sizeValue].push("Stock must be greater than 0!");
      }

      if (hasDiscount) {
        if (
          isNaN(size.discount) ||
          Number(size.discount) < 0 ||
          Number(size.discount) > 100
        ) {
          errors.sizes[sizeValue].push("Discount must be between 0 and 100!");
        }
      }

      if (
        hasOriginalPrice &&
        !isNaN(size.originalPrice) &&
        size.originalPrice > 0
      ) {
        const discount =
          hasDiscount && !isNaN(size.discount) ? Number(size.discount) : 0;
        const finalPrice =
          Number(size.originalPrice) -
          (Number(size.originalPrice) * discount) / 100;

        if (finalPrice <= 0) {
          errors.sizes[sizeValue].push(
            "Price must be more than 0 after discount!"
          );
        }
      }

      if (errors.sizes[sizeValue].length === 0) {
        validSizesCount++;
        size.available = true;
      } else {
        size.available = false;
      }
    } else {
      size.available = false;
    }
  });

  if (validSizesCount === 0) {
    errors.size.push(
      "At least one size must have complete pricing information!"
    );
  }

  return parsedSizes;
};

const validateOtherFields = (
  { shippingCost, status, isFeatured, isNewArrival },
  errors
) => {
  if (
    shippingCost === undefined ||
    shippingCost === null ||
    shippingCost === ""
  ) {
    errors.other.push("Shipping cost is required!");
  } else if (isNaN(shippingCost) || Number(shippingCost) < 0) {
    errors.other.push("Shipping cost must be a number (0 or greater)!");
  }

  const allowedStatuses = ["draft", "published"];
  if (!status || !allowedStatuses.includes(status.toLowerCase())) {
    errors.other.push("Invalid product status!");
  }

  if (
    isFeatured !== undefined &&
    isFeatured !== "true" &&
    isFeatured !== "false" &&
    typeof isFeatured !== "boolean"
  ) {
    errors.other.push("isFeatured must be true or false!");
  }

  if (
    isNewArrival !== undefined &&
    isNewArrival !== "true" &&
    isNewArrival !== "false" &&
    typeof isNewArrival !== "boolean"
  ) {
    errors.other.push("isNewArrival must be true or false!");
  }
};

const hasErrors = (errors) => {
  return (
    errors.images.length > 0 ||
    errors.general.length > 0 ||
    errors.size.length > 0 ||
    Object.values(errors.sizes).some((arr) => arr.length > 0) ||
    errors.other.length > 0
  );
};

const isValidProduct = (req, res, next) => {
  const {
    name,
    description,
    category,
    sizes,
    isFeatured,
    isNewArrival,
    shippingCost,
    status,
  } = req.body;
  const images = req.files;

  const errors = {
    images: [],
    general: [],
    size: [],
    sizes: { xs: [], s: [], m: [], l: [], xl: [] },
    other: [],
  };

  validateImages(images, errors);

  validateGeneralInfo({ name, description, category }, errors);

  const parsedSizes = validateSizes(sizes, errors);
  if (parsedSizes) {
    req.body.sizes = parsedSizes;
  }

  validateOtherFields(
    { shippingCost, status, isFeatured, isNewArrival },
    errors
  );

  if (hasErrors(errors)) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};

export default isValidProduct;
