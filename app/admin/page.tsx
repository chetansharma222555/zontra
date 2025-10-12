"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { MotionConfig, motion } from "framer-motion";
import {
  ShoppingCart,
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// Dummy data
const summary = [
  {
    id: "products",
    title: "Total Products",
    value: 256,
    trend: "+8% vs last month",
    icon: <Package className="w-5 h-5" />,
  },
  {
    id: "sales",
    title: "Total Sales",
    value: "₹1,24,000",
    trend: "+12% vs last month",
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    id: "orders",
    title: "Total Orders",
    value: 982,
    trend: "+6% vs last month",
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    id: "outOfStock",
    title: "Out of Stock",
    value: 14,
    trend: "-3 vs last month",
    icon: <AlertTriangle className="w-5 h-5" />,
  },
  {
    id: "monthlyRevenue",
    title: "Monthly Revenue",
    value: "₹24,500",
    trend: "+5% vs last month",
    icon: <TrendingUp className="w-5 h-5" />,
  },
];

const monthlySales = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4000 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 7000 },
  { month: "Jul", sales: 8000 },
  { month: "Aug", sales: 7500 },
  { month: "Sep", sales: 8200 },
  { month: "Oct", sales: 9000 },
  { month: "Nov", sales: 9400 },
  { month: "Dec", sales: 10000 },
];

const revenueBreakdown = [
  { name: "Online", value: 54000 },
  { name: "In-store", value: 36000 },
  { name: "Wholesale", value: 14000 },
];

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2999,
    units: 420,
    revenue: 1259580,
    stock: 18,
  },
  {
    id: 2,
    name: "Yoga Mat",
    category: "Fitness",
    price: 999,
    units: 310,
    revenue: 309690,
    stock: 6,
  },
  {
    id: 3,
    name: "Coffee Mug",
    category: "Kitchen",
    price: 249,
    units: 520,
    revenue: 129480,
    stock: 2,
  },
  {
    id: 4,
    name: "Desk Lamp",
    category: "Home",
    price: 1299,
    units: 210,
    revenue: 272790,
    stock: 44,
  },
  {
    id: 5,
    name: "Running Shoes",
    category: "Footwear",
    price: 3999,
    units: 150,
    revenue: 599850,
    stock: 9,
  },
  {
    id: 6,
    name: "Sneaker Socks",
    category: "Apparel",
    price: 199,
    units: 800,
    revenue: 159200,
    stock: 120,
  },
];

export default function Page() {
  return (
    <>  <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Welcome, Admin</BreadcrumbPage>
                </BreadcrumbItem>
                 <BreadcrumbSeparator />
                 <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
    <MotionConfig transition={{ duration: 0.45 }}>
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 p-4 md:p-6 lg:p-8"
      >
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {summary.map((s) => (
            <Card
              key={s.id}
              className="rounded-2xl shadow-sm hover:shadow-md p-4 flex items-start gap-4"
            >
              <div className="p-2 rounded-lg bg-muted/40">{s.icon}</div>
              <div className="flex-1">
                <div className="text-sm text-muted-foreground">{s.title}</div>
                <div className="text-xl md:text-2xl font-semibold mt-1">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-2">{s.trend}</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Sales & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="rounded-2xl shadow-sm hover:shadow-md lg:col-span-2">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlySales} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm hover:shadow-md">
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueBreakdown} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" barSize={36} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table + Low Stock */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="rounded-2xl shadow-sm hover:shadow-md lg:col-span-2">
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Units Sold</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell>{p.category}</TableCell>
                        <TableCell>₹{p.price}</TableCell>
                        <TableCell>{p.units}</TableCell>
                        <TableCell>₹{p.revenue.toLocaleString()}</TableCell>
                        <TableCell>{p.stock}</TableCell>
                        <TableCell>
                          {p.stock > 0 ? (
                            <Badge variant="outline" className="rounded-full">Active</Badge>
                          ) : (
                            <Badge variant="destructive" className="rounded-full">Out of stock</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm hover:shadow-md">
            <CardHeader>
              <CardTitle>⚠️ Low Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {products
                  .filter((p) => p.stock < 10)
                  .map((p) => (
                    <div key={p.id} className="flex items-center justify-between gap-4">
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground">Only {p.stock} left</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Restock</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </motion.main>
    </MotionConfig>
    </>

  );
}
