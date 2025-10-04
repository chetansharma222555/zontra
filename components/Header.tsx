import Link from "next/link";

export default function Header(){
    return (
         <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <Link href="/" className="text-2xl md:text-4xl font-bold text-foreground">
              TechStore
            </Link>
          </div>
        </div>
      </header>
    )
}