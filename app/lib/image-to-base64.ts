/**
 * Image to Base64 Utility
 * Convertit les images (locales ou distantes) en data URLs base64
 * pour une utilisation fiable dans @react-pdf/renderer
 */

import fs from "fs/promises";
import path from "path";

/**
 * Détermine le type MIME d'une image à partir de son extension
 */
function getMimeType(imagePath: string): string {
  const ext = path.extname(imagePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
  };
  return mimeTypes[ext] || "image/png";
}

/**
 * Télécharge une image depuis une URL externe et la convertit en base64
 */
async function fetchImageAsBase64(url: string): Promise<string> {
  try {
    console.log(`  📥 Téléchargement de l'image: ${url}`);
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0", // Certains serveurs requièrent un User-Agent
      },
    });

    if (!response.ok) {
      throw new Error(
        `Échec du téléchargement: ${response.status} ${response.statusText}`
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const mimeType = getMimeType(url);

    console.log(`  ✅ Image téléchargée: ${buffer.length} bytes`);
    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error(`  ❌ Erreur lors du téléchargement de ${url}:`, error);
    throw error;
  }
}

/**
 * Lit un fichier image local et le convertit en base64
 */
async function readLocalImageAsBase64(imagePath: string): Promise<string> {
  try {
    // Convertir le chemin relatif en chemin absolu
    let absolutePath: string;

    if (imagePath.startsWith("/")) {
      // Chemin absolu depuis le dossier public
      absolutePath = path.join(process.cwd(), "public", imagePath);
    } else {
      absolutePath = imagePath;
    }

    console.log(`  📂 Lecture du fichier local: ${absolutePath}`);
    const buffer = await fs.readFile(absolutePath);
    const base64 = buffer.toString("base64");
    const mimeType = getMimeType(imagePath);

    console.log(`  ✅ Fichier lu: ${buffer.length} bytes`);
    return `data:${mimeType};base64,${base64}`;
  } catch (error) {
    console.error(`  ❌ Erreur lors de la lecture de ${imagePath}:`, error);
    throw error;
  }
}

/**
 * Convertit une image (URL ou chemin local) en data URL base64
 *
 * @param imagePath - URL HTTP(S) ou chemin local (ex: /icons/logo.png)
 * @returns Data URL au format base64
 */
export async function convertImageToBase64(
  imagePath: string
): Promise<string> {
  try {
    if (!imagePath || typeof imagePath !== "string") {
      throw new Error("Chemin d'image invalide");
    }

    // Si c'est une URL HTTP(S), télécharger l'image
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return await fetchImageAsBase64(imagePath);
    }

    // Sinon, lire le fichier local
    return await readLocalImageAsBase64(imagePath);
  } catch (error) {
    console.error(
      `❌ Impossible de convertir l'image ${imagePath} en base64:`,
      error
    );
    // Retourner une image transparente par défaut en cas d'erreur
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  }
}

/**
 * Convertit plusieurs images en base64 en parallèle
 *
 * @param imagePaths - Tableau de chemins d'images
 * @returns Objet avec les chemins originaux comme clés et les data URLs comme valeurs
 */
export async function convertImagesToBase64(
  imagePaths: string[]
): Promise<Record<string, string>> {
  console.log(`🖼️  Conversion de ${imagePaths.length} images en base64...`);

  const results = await Promise.allSettled(
    imagePaths.map(async (imagePath) => ({
      path: imagePath,
      dataUrl: await convertImageToBase64(imagePath),
    }))
  );

  const imageMap: Record<string, string> = {};

  for (const result of results) {
    if (result.status === "fulfilled") {
      imageMap[result.value.path] = result.value.dataUrl;
    } else {
      console.error(
        `❌ Échec de la conversion d'une image:`,
        result.reason
      );
    }
  }

  console.log(`✅ ${Object.keys(imageMap).length} images converties`);
  return imageMap;
}
