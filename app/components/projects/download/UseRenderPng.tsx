import { useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";
import { RenderPNG } from "./RenderPNG";
import { useLatestCallback } from "./use-latest-callback";

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

interface WorkerResponse {
  _id: number;
  blob: Blob;
}

export function useRenderPNG({
  project,
  setIsLoading,
}: {
  project: any;
  setIsLoading: (isLoading: boolean) => void;
}) {
  const fontsRef = useRef<Fonts | undefined>(undefined);

  useEffect(() => {
    const abortController = new AbortController();

    void Promise.all([
      fetch("/fonts/Outfit-Black.ttf", {
        signal: abortController.signal,
      }).then((res) => res.arrayBuffer()),
      fetch("/fonts/Outfit-Bold.ttf", {
        signal: abortController.signal,
      }).then((res) => res.arrayBuffer()),
      fetch("/fonts/Outfit-ExtraBold.ttf", {
        signal: abortController.signal,
      }).then((res) => res.arrayBuffer()),
      fetch("/fonts/Outfit-ExtraLight.ttf", {
        signal: abortController.signal,
      }).then((res) => res.arrayBuffer()),
      fetch("/fonts/Outfit-Light.ttf", {
        signal: abortController.signal,
      }).then((res) => res.arrayBuffer()),
      fetch("/fonts/Outfit-Medium.ttf", {
        signal: abortController.signal,
      }).then((res) => res.arrayBuffer()),
      fetch("/fonts/Outfit-Regular.ttf", {
        signal: abortController.signal,
      }).then((res) => res.arrayBuffer()),
      fetch("/fonts/Outfit-SemiBold.ttf", {
        signal: abortController.signal,
      }).then((res) => res.arrayBuffer()),
      fetch("/fonts/Outfit-Thin.ttf", {
        signal: abortController.signal,
      }).then((res) => res.arrayBuffer()),
      fetch("/fonts/MPLUSRounded1c-Black.ttf", {
        signal: abortController.signal,
      }).then((res) => res.arrayBuffer()),
      fetch("/fonts/MPLUSRounded1c-Bold.ttf", {
        signal: abortController.signal,
      }).then((res) => res.arrayBuffer()),
      fetch("/fonts/MPLUSRounded1c-ExtraBold.ttf", {
        signal: abortController.signal,
      }).then((res) => res.arrayBuffer()),
      fetch("/fonts/MPLUSRounded1c-Light.ttf", {
        signal: abortController.signal,
      }).then((res) => res.arrayBuffer()),
      fetch("/fonts/MPLUSRounded1c-Medium.ttf", {
        signal: abortController.signal,
      }).then((res) => res.arrayBuffer()),
      fetch("/fonts/MPLUSRounded1c-Regular.ttf", {
        signal: abortController.signal,
      }).then((res) => res.arrayBuffer()),
      fetch("/fonts/MPLUSRounded1c-Thin.ttf", {
        signal: abortController.signal,
      }).then((res) => res.arrayBuffer()),
    ]).then(
      ([
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
      ]) => {
        if (abortController.signal.aborted) {
          return;
        }

        fontsRef.current = {
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
        };
      }
    );

    return () => abortController.abort("cleanup");
  }, []);

  const renderPNGToBlob = async () => {
    if (!fontsRef.current) {
      return;
    }

    const { blob } = await RenderPNG({
      fonts: fontsRef.current,
      project,
    });

    return blob;
  };

  const downloadPNG = useLatestCallback(async () => {
    setIsLoading(true);
    toast.info(
      "Téléchargement en cours. cette opération prendra environ 10 secondes."
    );
    const blob = await renderPNGToBlob();
    if (!blob) {
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${project.name}.png`;
    a.click();
    setIsLoading(false);
  });

  return useMemo(() => ({ downloadPNG }), [downloadPNG]);
}
