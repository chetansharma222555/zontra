import { LoginForm } from "@/components/login-form"
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib/utils";


export default async function Page() {
   // Check if token exists
  const token = (await cookies()).get("token")?.value;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET as string);
      await jwtVerify(token, secret);
      
      // ✅ If valid token, redirect to admin
      redirect("/admin");
    } catch (err) {
      // invalid token, do nothing (stay on login)
      toast.error(getErrorMessage(err))
    }
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
