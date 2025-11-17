import { NextRequest, NextResponse } from "next/server";
import satori from "satori";
import path from "path";
import fs from "fs/promises";
import PDFDocument from "pdfkit";
import SVGtoPDF from "svg-to-pdfkit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60; // Timeout de 60 secondes

interface ProjectData {
  id: number;
  name: string;
  user_id: number;
  products: any[];
  // ... autres champs
}

export async function POST(req: NextRequest) {
  try {
    console.log("🚀 [PNG API] Début de la génération du PNG");
    const body = await req.json();
    const { projectId } = body;
    console.log("📝 [PNG API] Project ID reçu:", projectId);

    if (!projectId) {
      console.log("❌ [PNG API] Pas de Project ID fourni");
      return NextResponse.json(
        { success: false, error: "Project ID requis" },
        { status: 400 }
      );
    }

    // Récupérer les données du projet directement depuis la base de données
    console.log("🔍 [PNG API] Récupération du projet depuis la DB...");
    const pool = (await import("@/lib/database")).default;
    const result = await pool.query("SELECT * FROM projects WHERE id = $1;", [
      projectId,
    ]);
    console.log("✅ [PNG API] Projet récupéré, nombre de lignes:", result.rowCount);

    if (result.rowCount !== 1) {
      return NextResponse.json(
        { success: false, error: "Projet introuvable" },
        { status: 404 }
      );
    }

    const projectData = result.rows[0];
    console.log("📦 [PNG API] Données du projet:", { id: projectData.id, name: projectData.name });

    // Convertir les dates en strings ISO
    console.log("📅 [PNG API] Conversion des dates...");
    if (projectData.created_at instanceof Date) {
      projectData.created_at = projectData.created_at.toISOString();
    }
    if (projectData.updated_at instanceof Date) {
      projectData.updated_at = projectData.updated_at.toISOString();
    }
    console.log("✅ [PNG API] Dates converties");

    // Récupérer l'utilisateur depuis la base de données
    console.log("👤 [PNG API] Récupération de l'utilisateur...");
    const userResult = await pool.query("SELECT * FROM users WHERE id = $1;", [
      projectData.user_id,
    ]);

    const user = userResult.rowCount === 1 ? userResult.rows[0] : null;
    console.log("✅ [PNG API] Utilisateur récupéré:", user ? user.email : "null");

    // Charger les fonts et les icônes
    console.log("🔤 [PNG API] Chargement des fonts et icônes...");
    const fontsDir = path.join(process.cwd(), "public", "fonts");
    const iconsDir = path.join(process.cwd(), "public", "icons");

    // Liste de toutes les icônes utilisées dans ProjectPNG
    const iconNames = [
      "logo.png",
      "avion.png",
      "personnes.png",
      "suv.png",
      "pétrol.png",
      "ecologie.png",
      "feuille.png",
      "rc.png",
      "erf.png",
      "maison.png",
      "no-ase.png",
      "ase.png",
      "no-em.png",
      "em.png",
    ];
    console.log("📋 [PNG API] Nombre d'icônes à charger:", iconNames.length);

    const [
      outfitBlack,
      outfitBold,
      outfitExtraBold,
      outfitExtraLight,
      outfitLight,
      outfitMedium,
      outfitRegular,
      outfitSemiBold,
      outfitThin,
      mplusrounded1cBlack,
      mplusrounded1cBold,
      mplusrounded1cExtraBold,
      mplusrounded1cLight,
      mplusrounded1cMedium,
      mplusrounded1cRegular,
      mplusrounded1cThin,
      ...iconBuffers
    ] = await Promise.all([
      fs.readFile(path.join(fontsDir, "Outfit-Black.ttf")),
      fs.readFile(path.join(fontsDir, "Outfit-Bold.ttf")),
      fs.readFile(path.join(fontsDir, "Outfit-ExtraBold.ttf")),
      fs.readFile(path.join(fontsDir, "Outfit-ExtraLight.ttf")),
      fs.readFile(path.join(fontsDir, "Outfit-Light.ttf")),
      fs.readFile(path.join(fontsDir, "Outfit-Medium.ttf")),
      fs.readFile(path.join(fontsDir, "Outfit-Regular.ttf")),
      fs.readFile(path.join(fontsDir, "Outfit-SemiBold.ttf")),
      fs.readFile(path.join(fontsDir, "Outfit-Thin.ttf")),
      fs.readFile(path.join(fontsDir, "MPLUSRounded1c-Black.ttf")),
      fs.readFile(path.join(fontsDir, "MPLUSRounded1c-Bold.ttf")),
      fs.readFile(path.join(fontsDir, "MPLUSRounded1c-ExtraBold.ttf")),
      fs.readFile(path.join(fontsDir, "MPLUSRounded1c-Light.ttf")),
      fs.readFile(path.join(fontsDir, "MPLUSRounded1c-Medium.ttf")),
      fs.readFile(path.join(fontsDir, "MPLUSRounded1c-Regular.ttf")),
      fs.readFile(path.join(fontsDir, "MPLUSRounded1c-Thin.ttf")),
      ...iconNames.map((icon) => fs.readFile(path.join(iconsDir, icon))),
    ]);
    console.log("✅ [PNG API] Fonts et icônes chargés");

    // Convertir les icônes en data URLs
    console.log("🖼️ [PNG API] Conversion des icônes en base64...");
    const iconsDataUrls: Record<string, string> = {};
    iconNames.forEach((iconName, index) => {
      iconsDataUrls[iconName] = `data:image/png;base64,${iconBuffers[index].toString("base64")}`;
    });
    console.log("✅ [PNG API] Icônes converties en base64");

    // Convertir les images des produits en data URLs
    console.log("🖼️ [PNG API] Conversion des images de produits...");
    if (projectData.products && Array.isArray(projectData.products)) {
      for (const productEntry of projectData.products) {
        if (productEntry.product && Array.isArray(productEntry.product)) {
          for (const product of productEntry.product) {
            if (product.image && typeof product.image === "string") {
              // Si c'est un chemin local (commence par /)
              if (product.image.startsWith("/")) {
                try {
                  console.log("  🖼️ [PNG API] Conversion image produit:", product.image);
                  const imagePath = path.join(
                    process.cwd(),
                    "public",
                    product.image
                  );
                  const imageBuffer = await fs.readFile(imagePath);

                  // Déterminer le type MIME basé sur l'extension
                  const ext = path.extname(product.image).toLowerCase();
                  const mimeType =
                    ext === ".png"
                      ? "image/png"
                      : ext === ".jpg" || ext === ".jpeg"
                      ? "image/jpeg"
                      : ext === ".webp"
                      ? "image/webp"
                      : "image/png";

                  product.image = `data:${mimeType};base64,${imageBuffer.toString("base64")}`;
                  console.log("  ✅ [PNG API] Image convertie");
                } catch (error) {
                  console.error(
                    `  ❌ [PNG API] Erreur lors du chargement de l'image ${product.image}:`,
                    error
                  );
                  // Garder l'URL d'origine en cas d'erreur
                }
              }
            }
          }
        }
      }
    }
    console.log("✅ [PNG API] Images de produits converties");

    // Générer le SVG avec satori
    console.log("🎨 [PNG API] Import du composant ProjectPNG...");
    const { ProjectPNG } = await import(
      "@/components/projects/download/ProjectPNG"
    );
    console.log("✅ [PNG API] Composant importé");

    const width = 800; // Réduit pour améliorer les performances (800px = A4 width à 96 DPI)

    console.log("🎨 [PNG API] Génération du SVG avec Satori...");
    const svg = await satori(
      ProjectPNG({
        width,
        project: projectData,
        user,
        iconsDataUrls,
      }) as any,
      {
        width,
        fonts: [
          { name: "Outfit", weight: 900, data: outfitBlack },
          { name: "Outfit", weight: 700, data: outfitBold },
          { name: "Outfit", weight: 800, data: outfitExtraBold },
          { name: "Outfit", weight: 200, data: outfitExtraLight },
          { name: "Outfit", weight: 300, data: outfitLight },
          { name: "Outfit", weight: 500, data: outfitMedium },
          { name: "Outfit", weight: 400, data: outfitRegular },
          { name: "Outfit", weight: 600, data: outfitSemiBold },
          { name: "Outfit", weight: 100, data: outfitThin },
          { name: "MplusRounded1c", weight: 900, data: mplusrounded1cBlack },
          { name: "MplusRounded1c", weight: 800, data: mplusrounded1cBold },
          { name: "MplusRounded1c", weight: 900, data: mplusrounded1cExtraBold },
          { name: "MplusRounded1c", weight: 300, data: mplusrounded1cLight },
          { name: "MplusRounded1c", weight: 500, data: mplusrounded1cMedium },
          { name: "MplusRounded1c", weight: 400, data: mplusrounded1cRegular },
          { name: "MplusRounded1c", weight: 100, data: mplusrounded1cThin },
        ],
      }
    );
    console.log("✅ [PNG API] SVG généré, taille:", svg.length, "caractères");

    // Convertir SVG en PDF avec PDFKit (beaucoup plus rapide que Puppeteer)
    console.log("📄 [PNG API] Conversion SVG vers PDF avec PDFKit...");
    const startTime = Date.now();

    // Créer un document PDF
    const doc = new PDFDocument({
      size: 'A4',
      compress: true,
    });

    // Collecter les chunks du PDF dans un buffer
    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));

    // Promesse qui se résout quand le PDF est terminé
    const pdfPromise = new Promise<Buffer>((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
    });

    // Convertir le SVG en PDF
    console.log("🎨 [PNG API] Conversion du SVG...");
    SVGtoPDF(doc, svg, 0, 0, {
      width: 595.28, // Largeur A4 en points (210mm)
      preserveAspectRatio: 'xMidYMid meet',
    });

    // Finaliser le document
    console.log("✅ [PNG API] Finalisation du PDF...");
    doc.end();

    // Attendre que le PDF soit généré
    const pdfBuffer = await pdfPromise;

    const endTime = Date.now();
    console.log("✅ [PNG API] PDF généré en", (endTime - startTime) / 1000, "secondes");
    console.log("✅ [PNG API] Taille du PDF:", pdfBuffer.length, "bytes");

    console.log("📤 [PNG API] Envoi du PDF au client...");
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${projectData.name}.pdf"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("❌ [PNG API] Erreur lors de la génération du PNG:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de la génération du PNG",
      },
      { status: 500 }
    );
  }
}
