import sharp from "sharp";
import { parentPort, workerData } from "worker_threads";

(async () => {
  try {
    const { imageBuffer } = workerData;

    // define all target widths
    const sizes = { thumb: 150, sm: 300, md: 600, lg: 1200 };

    const results = {};

    for (const [key, width] of Object.entries(sizes)) {
      const buffer = await sharp(imageBuffer)
        .resize({
          width: width,
          withoutEnlargement: true
        })
        .withMetadata(false)
        .webp({
          quality: 80,
          lossless: false,
          nearLossless: false,
          smartSubsample: true
        })
        .toBuffer();

      results[key] = buffer.toString('base64');
    }

    parentPort.postMessage({ success: true, results });
  } catch (error) {
    parentPort.postMessage({ success: false, error: error.message });
  }
})();