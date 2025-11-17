import { useMemo } from "react";
import { toast } from "sonner";
import { useLatestCallback } from "./use-latest-callback";

export function useRenderPNG({
  project,
  setIsLoading,
}: {
  project: any;
  setIsLoading: (isLoading: boolean) => void;
}) {
  const downloadPNG = useLatestCallback(async () => {
    try {
      console.log("🎬 [CLIENT] Début du téléchargement SVG pour projet:", project.id);
      setIsLoading(true);
      toast.info(
        "Génération du récapitulatif en cours..."
      );

      // Appeler l'API pour générer le PDF côté serveur (optimisé avec @react-pdf/renderer)
      console.log("📡 [CLIENT] Appel API /api/project/download-pdf...");
      const response = await fetch("/api/project/download-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId: project.id }),
      });
      console.log("📡 [CLIENT] Réponse reçue, status:", response.status);

      if (!response.ok) {
        console.log("❌ [CLIENT] Erreur HTTP:", response.status);
        const error = await response.json();
        throw new Error(error.error || "Erreur lors de la génération du récapitulatif");
      }

      // Récupérer le blob PDF
      console.log("📦 [CLIENT] Récupération du blob PDF...");
      const blob = await response.blob();
      console.log("📦 [CLIENT] Blob PDF reçu, taille:", blob.size, "bytes");

      if (!blob || blob.size === 0) {
        console.log("❌ [CLIENT] Blob vide ou invalide");
        toast.error("Impossible de générer le récapitulatif. Veuillez réessayer.");
        setIsLoading(false);
        return;
      }

      // Créer un lien de téléchargement
      console.log("💾 [CLIENT] Création du lien de téléchargement...");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${project.name}.pdf`; // Téléchargement PDF
      a.click();
      console.log("✅ [CLIENT] Téléchargement déclenché");

      // Nettoyer l'URL après téléchargement
      setTimeout(() => URL.revokeObjectURL(url), 100);

      toast.success("Téléchargement terminé avec succès !");
      setIsLoading(false);
      console.log("🎉 [CLIENT] Téléchargement terminé avec succès");
    } catch (error) {
      console.error("❌ [CLIENT] Erreur lors du téléchargement:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Une erreur s'est produite lors de la génération du récapitulatif. Veuillez réessayer."
      );
      setIsLoading(false);
    }
  });

  return useMemo(() => ({ downloadPNG }), [downloadPNG]);
}
