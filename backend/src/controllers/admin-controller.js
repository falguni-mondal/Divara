import mongoose from "mongoose";
import pLimit from "p-limit";
import { uploadWithRetry } from "../configs/imagekit/imagekit.js";
import { processImageInWorker } from "../utils/imageWorker.js";
import productModel from "../models/product-model.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      material,
      colour,
      sizes,
      isFeatured,
      isNewArrival,
      shippingCost,
      status,
    } = req.body;

    const productId = new mongoose.Types.ObjectId();
    
    // ✅ Limit concurrent ImageKit uploads to 3
    const uploadLimit = pLimit(3);

    // Process all images
    const imageResults = await Promise.all(
      req.files.map(async (file, index) => {
        // Process image in worker thread
        const resized = await processImageInWorker(file.buffer);
        // resized = { thumb: Buffer, sm: Buffer, md: Buffer, lg: Buffer }
        
        // Upload all variants with concurrency control
        const variantEntries = Object.entries(resized);
        const uploadPromises = variantEntries.map(([variant, imageBuffer]) =>
          uploadLimit(() => 
            uploadWithRetry({
              file: imageBuffer, // Now it's a Buffer (not base64)
              fileName: `${variant}-${name.replace(/\s+/g, '-')}-${Date.now()}.webp`,
              folder: `/Divara/products/${productId}/${index}`,
            }).then(uploadResp => [variant, {
              url: uploadResp.url,
              imageId: uploadResp.fileId
            }])
          )
        );

        const uploadedVariants = await Promise.all(uploadPromises);
        return Object.fromEntries(uploadedVariants);
      })
    );

    const product = await productModel.create({
      _id: productId,
      images: imageResults,
      name,
      description,
      category,
      material,
      colour,
      sizes,
      isFeatured,
      isNewArrival,
      shippingCost,
      status
    });

    res.status(200).json(product);
  } catch (err) {
    console.error("Add product error:", err);
    
    // Better error response
    const statusCode = err.response?.status || 500;
    const errorMessage = err.message || "Internal server error";
    
    res.status(statusCode).json({ 
      message: "Failed to add product",
      error: errorMessage 
    });
  }
};

export { addProduct };