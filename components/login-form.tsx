"use client"
import { cn, getErrorMessage } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 


  
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // ✅ very important
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message || "Login successful");
      router.push("/admin"); // redirect on success
    } else {
      toast.error(data.message || "Invalid credentials...");
    }
  } catch (error) {
    toast.error(getErrorMessage(error));
  } finally {
    setLoading(false);
  }
}
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Enter your email and password to login into Admin Dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" type="password" placeholder="*******"  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required />
              </Field>
              <Field>
                <Button type="submit" disabled={loading} onClick={handleSubmit}> {loading ? "Logging in..." : "Login"}</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
