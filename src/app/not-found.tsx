import { RedirectType, redirect } from "next/navigation";

export default function NotFoundPage() {
  redirect("/", RedirectType.replace);
}
