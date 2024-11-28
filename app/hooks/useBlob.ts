import { useState } from "react";

export function useBlob() {
  const [image, setImage] = useState<string | null>(null);
}
