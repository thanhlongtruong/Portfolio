import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold">{"(O_O')"}</h1>
      <p className="mt-3 text-base">
        404 | Trang này không tồn tại. - Sorry, this page does not exist.
      </p>
      <Link
        href="/"
        className="mt-5 text-main text-base hover:underline hover:underline-offset-2 after:content-['_↗']">
        Trang chủ - Homepage
      </Link>
    </div>
  );
}
