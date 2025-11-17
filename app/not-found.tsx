export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl">Page non trouvée</p>
      <a href="/" className="mt-4 text-blue-500 hover:underline">
        Retour à l'accueil
      </a>
    </div>
  );
}
