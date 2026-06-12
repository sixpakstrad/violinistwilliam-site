import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Sign In | William Samorey",
};

export default function SignInPage() {
  redirect("/admin/sign-in");
}
