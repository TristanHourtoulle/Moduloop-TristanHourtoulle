import { getUserById } from "@utils/database/user";
import satori from "satori";
import { ProjectPNG } from "./ProjectPNG";

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

interface Message {
  _id: number;
  svg: string;
  width: number;
}

interface WorkerResponse {
  _id: number;
  blob: Blob;
}

interface RenderPNGProps {
  fonts: Fonts;
  project: any;
}

const convertSVGToPNG = (() => {
  if (typeof window === "undefined") {
    return;
  }

  const worker = new Worker(new URL("./resvg-worker.ts", import.meta.url));

  const pending = new Map<number, (messageData: WorkerResponse) => void>();

  worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
    const resolve = pending.get(e.data._id);

    if (resolve) {
      resolve(e.data);
      pending.delete(e.data._id);
    }
  };

  return async ({ svg, width }: Pick<Message, "svg" | "width">) => {
    const message: Message = {
      _id: Math.random(),
      svg,
      width,
    };

    worker.postMessage(message);

    return new Promise<WorkerResponse>((resolve) => {
      pending.set(message._id, resolve);
    });
  };
})();

export async function RenderPNG({ fonts, project }: RenderPNGProps) {
  const { width, height } = { width: 2480, height: 3508 };

  const svg = await satori(
    <ProjectPNG
      width={width}
      project={project}
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

  const messageData = (await convertSVGToPNG?.({
    svg,
    width: width,
  }))!;

  return messageData;
}
