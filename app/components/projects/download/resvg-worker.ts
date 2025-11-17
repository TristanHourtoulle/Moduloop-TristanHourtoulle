// @ts-ignore - Old file kept for reference, not used in production
import * as resvg from "@resvg/resvg-wasm";
// @ts-ignore - Old file kept for reference
import wasmUrl from "@resvg/resvg-wasm/index_bg.wasm?url";

// Initialiser WASM de manière synchrone avant de traiter les messages
let wasmInitialized = false;
let wasmInitPromise: Promise<void>;

const initializeWasm = async () => {
  if (!wasmInitialized) {
    try {
      // Charger le WASM avec l'URL importée
      const res = await fetch(wasmUrl);

      if (!res.ok) {
        throw new Error(`Failed to load WASM: ${res.status} ${res.statusText}`);
      }

      await resvg.initWasm(res);
      wasmInitialized = true;
      console.log("WASM initialisé avec succès");
    } catch (error) {
      console.error("Erreur d'initialisation WASM:", error);
      throw error;
    }
  }
};

// Démarrer l'initialisation immédiatement
wasmInitPromise = initializeWasm();

interface Message {
  _id: number;
  svg: string;
  width: number;
}

self.addEventListener("message", async (event: MessageEvent<Message>) => {
  const { _id, svg, width } = event.data;

  try {
    // Attendre que WASM soit initialisé
    await wasmInitPromise;

    const renderer = new resvg.Resvg(svg, {
      fitTo: {
        mode: "width",
        value: width,
      },
    });
    const image = renderer.render();
    const pngBuffer = image.asPng();
    const blob = new Blob([pngBuffer], { type: "image/png" });

    self.postMessage({ _id, blob });
  } catch (error) {
    console.error("Erreur lors du rendu PNG:", error);
    self.postMessage({ _id, error: error instanceof Error ? error.message : String(error) });
  }
});
