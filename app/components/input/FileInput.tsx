import { Button } from "@components/button/Button";
import { toast } from "sonner";

export type FileInputProps = {
  size: "small" | "medium" | "large";
  onSubmit: (file: File) => void;
};

export const FileInput = (props: FileInputProps) => {
  const { size, onSubmit } = props;

  const handleFileInputSubmit = () => {
    const fileInput = document.getElementById(
      size + "_size"
    ) as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      onSubmit(file);
    } else {
      toast.warning("Veuillez sélectionner un fichier");
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        {size === "small" && (
          <input
            className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="small_size"
            type="file"
          ></input>
        )}
        {size === "medium" && (
          <input
            className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="medium_size"
            type="file"
          ></input>
        )}
        {size === "large" && (
          <input
            className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="large_size"
            type="file"
          ></input>
        )}
        <Button
          size="medium"
          onClick={handleFileInputSubmit}
          variant="secondary"
          content="Valider"
          disabled={false}
          image={null}
        />
      </div>
    </>
  );
};
