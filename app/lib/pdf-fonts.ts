/**
 * PDF Fonts Configuration
 * Registers custom fonts for @react-pdf/renderer
 * Fonts are registered once and cached for performance
 */

import { Font } from "@react-pdf/renderer";
import path from "path";
import fs from "fs";

let fontsRegistered = false;

export function registerPDFFonts() {
  // Only register fonts once
  if (fontsRegistered) {
    return;
  }

  // Use HTTP URLs for fonts (works better with @react-pdf/renderer in Next.js)
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  const outfitFonts = [
    { file: "Outfit-Thin.ttf", weight: 100 },
    { file: "Outfit-ExtraLight.ttf", weight: 200 },
    { file: "Outfit-Light.ttf", weight: 300 },
    { file: "Outfit-Regular.ttf", weight: 400 },
    { file: "Outfit-Medium.ttf", weight: 500 },
    { file: "Outfit-SemiBold.ttf", weight: 600 },
    { file: "Outfit-Bold.ttf", weight: 700 },
    { file: "Outfit-ExtraBold.ttf", weight: 800 },
    { file: "Outfit-Black.ttf", weight: 900 },
  ];

  const mplusFonts = [
    { file: "MPLUSRounded1c-Thin.ttf", weight: 100 },
    { file: "MPLUSRounded1c-Light.ttf", weight: 300 },
    { file: "MPLUSRounded1c-Regular.ttf", weight: 400 },
    { file: "MPLUSRounded1c-Medium.ttf", weight: 500 },
    { file: "MPLUSRounded1c-Bold.ttf", weight: 700 },
    { file: "MPLUSRounded1c-ExtraBold.ttf", weight: 800 },
    { file: "MPLUSRounded1c-Black.ttf", weight: 900 },
  ];

  try {
    // Register Outfit font family with HTTP URLs
    Font.register({
      family: "Outfit",
      fonts: outfitFonts.map(font => ({
        src: `${baseUrl}/fonts/${font.file}`,
        fontWeight: font.weight,
      })),
    });

    // Register M PLUS Rounded 1c font family with HTTP URLs
    Font.register({
      family: "MplusRounded1c",
      fonts: mplusFonts.map(font => ({
        src: `${baseUrl}/fonts/${font.file}`,
        fontWeight: font.weight,
      })),
    });

    fontsRegistered = true;
    console.log("✅ [PDF Fonts] Fonts registered successfully");
  } catch (error) {
    console.error("❌ [PDF Fonts] Error registering fonts:", error);
    throw error;
  }
}
