import { getSession } from "@lib/session";
import { SessionType } from "@models/Session";

export default async function Home() {
  const session: SessionType = await getSession();
  const username = " " + session?.user?.name || "";
  const firstName = " " + session?.user?.firstName || "";
  const initials = firstName + " " + (username.substring(0, 2) || "");
  console.log("Session: ", session);

  return (
    <div>
      <h1>Bonjour {initials}, Bienvenue sur l'outil Moduloop !</h1>
    </div>
  );
}
