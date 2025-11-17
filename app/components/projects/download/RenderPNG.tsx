import { getUserById } from "@utils/database/user";
import satori from "satori";
import { ProjectPNG } from "./ProjectPNG";
// @ts-ignore - Old file kept for reference, not used in production
import * as resvg from "@resvg/resvg-wasm";

interface Fonts {
  outfitBlack: ArrayBuffer;
  outfitBold: ArrayBuffer;
  outfitExtraBold: ArrayBuffer;
  outfitExtraLight: ArrayBuffer;
  outfitLight: ArrayBuffer;
  outfitMedium: ArrayBuffer;
  outfitRegular: ArrayBuffer;
  outfitSemiBold: ArrayBuffer;
  outfitThin: ArrayBuffer;
  mplusrounded1cBlack: ArrayBuffer;
  mplusrounded1cBold: ArrayBuffer;
  mplusrounded1cExtraBold: ArrayBuffer;
  mplusrounded1cLight: ArrayBuffer;
  mplusrounded1cMedium: ArrayBuffer;
  mplusrounded1cRegular: ArrayBuffer;
  mplusrounded1cThin: ArrayBuffer;
}

interface RenderPNGProps {
  fonts: Fonts;
  project: any;
}

// Initialisation WASM (une seule fois)
let wasmInitialized = false;
let wasmInitPromise: Promise<void> | null = null;

const initWasm = async () => {
  if (wasmInitialized) return;
  if (wasmInitPromise) return wasmInitPromise;

  wasmInitPromise = (async () => {
    try {
      // Importer le fichier WASM
      // @ts-ignore - Old file kept for reference
      const wasmModule = await import("@resvg/resvg-wasm/index_bg.wasm");
      const wasmUrl = wasmModule.default;

      const response = await fetch(wasmUrl);
      await resvg.initWasm(response);
      wasmInitialized = true;
      console.log("✅ WASM initialisé avec succès");
    } catch (error) {
      console.error("❌ Erreur lors de l'initialisation WASM:", error);
      wasmInitPromise = null; // Réinitialiser pour permettre une nouvelle tentative
      throw error;
    }
  })();

  return wasmInitPromise;
};

// Convertir SVG en PNG sans Web Worker
const convertSVGToPNG = async (svg: string, width: number): Promise<Blob> => {
  // S'assurer que WASM est initialisé
  await initWasm();

  const renderer = new resvg.Resvg(svg, {
    fitTo: {
      mode: "width",
      value: width,
    },
  });

  const image = renderer.render();
  const pngBuffer = image.asPng();
  const blob = new Blob([pngBuffer], { type: "image/png" });

  return blob;
};

// Fonction pour convertir les images WebP en PNG/JPEG compatible
async function convertImageToSatoriFormat(imageUrl: string): Promise<string> {
  try {
    // Si c'est déjà un chemin local ou une image supportée, on garde tel quel
    if (imageUrl.startsWith('/') || imageUrl.includes('.png') || imageUrl.includes('.jpg') || imageUrl.includes('.jpeg')) {
      return imageUrl;
    }

    // Si c'est une image WebP externe, on la convertit via canvas
    if (imageUrl.includes('.webp')) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Créer un canvas pour convertir l'image
      const img = await createImageBitmap(blob);
      const canvas = new OffscreenCanvas(img.width, img.height);
      const ctx = canvas.getContext('2d');
      if (!ctx) return imageUrl;

      ctx.drawImage(img, 0, 0);
      const pngBlob = await canvas.convertToBlob({ type: 'image/png' });

      // Convertir en base64
      const arrayBuffer = await pngBlob.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
      return `data:image/png;base64,${base64}`;
    }

    return imageUrl;
  } catch (error) {
    console.error('Erreur conversion image:', error);
    // En cas d'erreur, utiliser un placeholder local
    return '/products/default.png';
  }
}

// Préparer le projet avec images converties
async function prepareProjectForSatori(project: any) {
  const projectCopy = JSON.parse(JSON.stringify(project));

  if (projectCopy.products && Array.isArray(projectCopy.products)) {
    for (const product of projectCopy.products) {
      if (product.product && Array.isArray(product.product)) {
        for (const p of product.product) {
          if (p.image) {
            p.image = await convertImageToSatoriFormat(p.image);
          }
        }
      }
    }
  }

  return projectCopy;
}

export async function RenderPNG({ fonts, project }: RenderPNGProps) {
  const { width, height } = { width: 2480, height: 3508 };

  // Préparer le projet avec images converties
  const preparedProject = await prepareProjectForSatori(project);

  const svg = await satori(
    <ProjectPNG
      width={width}
      project={preparedProject}
      user={await getUserById(project.user_id)}
    />,
    {
      width: 2480,
      fonts: [
        {
          name: "Outfit",
          weight: 900,
          data: fonts.outfitBlack,
        },
        {
          name: "Outfit",
          weight: 700,
          data: fonts.outfitBold,
        },
        {
          name: "Outfit",
          weight: 800,
          data: fonts.outfitExtraBold,
        },
        {
          name: "Outfit",
          weight: 200,
          data: fonts.outfitExtraLight,
        },
        {
          name: "Outfit",
          weight: 300,
          data: fonts.outfitLight,
        },
        {
          name: "Outfit",
          weight: 500,
          data: fonts.outfitMedium,
        },
        {
          name: "Outfit",
          weight: 400,
          data: fonts.outfitRegular,
        },
        {
          name: "Outfit",
          weight: 600,
          data: fonts.outfitSemiBold,
        },
        {
          name: "Outfit",
          weight: 100,
          data: fonts.outfitThin,
        },
        {
          name: "MplusRounded1c",
          weight: 900,
          data: fonts.mplusrounded1cBlack,
        },
        {
          name: "MplusRounded1c",
          weight: 800,
          data: fonts.mplusrounded1cBold,
        },
        {
          name: "MplusRounded1c",
          weight: 900,
          data: fonts.mplusrounded1cExtraBold,
        },
        {
          name: "MplusRounded1c",
          weight: 300,
          data: fonts.mplusrounded1cLight,
        },
        {
          name: "MplusRounded1c",
          weight: 500,
          data: fonts.mplusrounded1cMedium,
        },
        {
          name: "MplusRounded1c",
          weight: 400,
          data: fonts.mplusrounded1cRegular,
        },
        {
          name: "MplusRounded1c",
          weight: 100,
          data: fonts.mplusrounded1cThin,
        },
      ],
    }
  );

  // Convertir le SVG en PNG
  const blob = await convertSVGToPNG(svg, width);

  return { _id: Math.random(), blob };
}
