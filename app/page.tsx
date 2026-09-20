import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Job Board AI Interview Assistant</h1>
      <Link className="bg-blue-500 text-white p-2 rounded-md" href="/jobs">Jobs</Link>
      <Link href="/jobs/123">Job Details 123</Link>
    </div>
  );
}
