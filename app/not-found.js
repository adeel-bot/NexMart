import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex h-screen gap-7 flex-col items-center justify-center press-start">
      <div className="flex flex-col text-center">
      <h1 className="text-3xl">404</h1>
      <p >Oops! Page Not Found</p>
      </div>
      <Link href="/" className=" bg-[bisque] hover:-translate-y-1 transition-all duration-200 p-3 text-black text-md">
        BACK TO HOME
      </Link>
    </div>
  );
}