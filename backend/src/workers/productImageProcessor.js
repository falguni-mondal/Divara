import sharp from "sharp";
import { parentPort, workerData } from "worker_threads";

(async () => {
  try {
    const { imageBuffer } = workerData;

    // define all target widths
    const sizes = { thumb: 500, sm: 1000, md: 1400, lg: 1800};

    const results = {};

    for (const [key, width] of Object.entries(sizes)) {
      const buffer = await sharp(imageBuffer)
        .resize({
          width: width,
          withoutEnlargement: true
        })
        .withMetadata(false)
        .webp({
          quality: 85,
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