import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Sign Up | William Samorey",
};

export default function SignUpPage() {
  redirect("/admin/sign-up");
}
