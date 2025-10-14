# Shop Admin Dashboard

A modern **Admin Dashboard** for Indian shops to manage their stock and inventory efficiently. Upload product images and details, which are then displayed on the shop's website. Built with **Next.js**, **TailwindCSS**, **Shadcn/ui**, **Supabase**, and **Recharts**.

---

## 🛠 Tech Stack

- **Frontend:** Next.js, React  
- **Styling:** TailwindCSS, Shadcn/ui  
- **Backend / Storage:** Supabase (for storing product images)  
- **Charts:** Recharts  
- **Icons:** Lucide-react  
- **Authentication:** JWT-based simple admin login  

---

## 🚀 Features

- **Admin Authentication** – Secure login for shop admins.  
- **Product Management** – Add, edit, and remove products.  
- **Image Uploads** – Upload multiple images per product with automatic resizing.  
- **Responsive Design** – Works on all screen sizes (mobile, tablet, desktop).  
- **Dashboard Analytics** – View sales overview and top product summaries with charts.  
- **Placeholder Handling** – Shows placeholder images if a product has no image.  

---

## 📂 Project Structure

/components -> Reusable UI components
/pages -> Next.js pages
/lib -> Supabase utils and API functions
/styles -> Tailwind / global CSS


---

## ⚡ Installation & Setup

1. **Clone the repo**

```bash
git clone <your-repo-url>
cd shop-admin-dashboard


npm install
# or
yarn install


**.env**

DATABASE_URL=<your-database-url>
DIRECT_URL=<your-direct-url>
SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>


**.env.local**

ADMIN_USEREMAIL=<your-admin-email>
ADMIN_PASSWORD=<your-admin-password>
JWT_SECRET=<your-jwt-secret>
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>


