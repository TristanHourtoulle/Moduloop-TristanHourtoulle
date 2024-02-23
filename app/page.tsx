import { getSession } from "@lib/session";

export default async function Home() {

  const session = await getSession();
  const username = " " + session?.user?.name || '';

  return (
    <div>
      <h1>Bonjour{username}, Bienvenue sur l'outil Moduloop !</h1>
    </div>
  );
}
