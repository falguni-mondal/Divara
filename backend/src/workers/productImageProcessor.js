import sharp from "sharp";
import { parentPort, workerData } from "worker_threads";

(async () => {
  try {
    const { imageBuffer } = workerData;

    const sizes = { thumb: 500, sm: 1000, md: 1400, lg: 1800 };

    const processPromises = Object.entries(sizes).map(async ([key, width]) => {
      const buffer = await sharp(imageBuffer)
        .resize({
          width: width,
          withoutEnlargement: true
        })
        .withMetadata(false)
        .webp({
          quality: 80,
          effort: 4,
          smartSubsample: true
        })
        .toBuffer();

      return [key, buffer.toString('base64')];
    });

    const processedVariants = await Promise.all(processPromises);
    const results = Object.fromEntries(processedVariants);

    parentPort.postMessage({ success: true, results });
  } catch (error) {
    parentPort.postMessage({ success: false, error: error.message });
  }
})();