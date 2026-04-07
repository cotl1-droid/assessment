import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Welcome to Stripe Chat App</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        A SaaS-style application with Stripe subscriptions and real-time chat.
        Free users can read messages, Pro users can chat in real time.
      </p>

      <div className="flex gap-4">
        <Link href="/login">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Register
          </button>
        </Link>
      </div>

      <div className="mt-8 flex gap-4">
        <Link href="/chat">
          <button className="bg-purple-500 text-white px-4 py-2 rounded">
            Enter Chat
          </button>
        </Link>
        <Link href="/billing">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded">
            Manage Subscription
          </button>
        </Link>
      </div>
    </div>
  );
}
