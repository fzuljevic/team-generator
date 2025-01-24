import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm">
        <h1 className="text-4xl font-bold mb-8">Team Shuffler</h1>
        <div>
          <Link
            href="/shuffle"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start Shuffling
          </Link>
        </div>
      </div>
    </main>
  );
}
