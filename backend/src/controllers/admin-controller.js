import mongoose from "mongoose";
import imagekit from "../configs/imagekit/imagekit.js";
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
    const imageResults = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const resized = await processImageInWorker(file.buffer);
      // resized = { thumb: Buffer, sm: Buffer, md: Buffer, lg: Buffer }

      const variants = {};
      for (const [variant, base64Image] of Object.entries(resized)) {
        const uploadResp = await imagekit.upload({
          file: base64Image,
          fileName: `${variant}-${name.replace(/\s+/g, '-')}.webp`,
          folder: `/Divara/products/${productId}/${i}`,
        });

        variants[variant] = {
          url: uploadResp.url,
          imageId: uploadResp.fileId
        };
      }

      imageResults.push(variants);
    }

    const product = await productModel.create({
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
    })

    product._id = productId;
    await product.save();

    res.status(200).json(product);
  } catch (err) {
    console.error("Add product: ", err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export { addProduct };
