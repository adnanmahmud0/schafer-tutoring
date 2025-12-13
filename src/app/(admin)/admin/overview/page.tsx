"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Users,
  TrendingUp,
  DollarSign,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface StatCard {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  bgColor: string;
}

interface Activity {
  id: number;
  title: string;
  description: string;
  date: string;
  status: "success" | "pending" | "warning";
}

const Overview = () => {
  const [timeRange, setTimeRange] = useState("monthly");

  const stats: StatCard[] = [
    {
      label: "Total Revenue",
      value: "$124,563",
      change: "+12.5%",
      icon: <DollarSign className="text-green-600" size={24} />,
      bgColor: "bg-green-50",
    },
    {
      label: "Total Students",
      value: "8,642",
      change: "+8.3%",
      icon: <Users className="text-blue-600" size={24} />,
      bgColor: "bg-blue-50",
    },
    {
      label: "Total Tutors",
      value: "15,842",
      change: "+12.5%",
      icon: <BarChart3 className="text-purple-600" size={24} />,
      bgColor: "bg-purple-50",
    },
    
  ];

  const activities: Activity[] = [
    {
      id: 1,
      title: "New Student Registered",
      description: "A new student joined the platform",
      date: "Nov 6, 2025",
      status: "success",
    },
    {
      id: 2,
      title: "Tutor Verified",
      description: "Mr. Ahmed has been verified as a tutor",
      date: "Nov 5, 2025",
      status: "success",
    },
    {
      id: 3,
      title: "Payment Processing",
      description: "Payment transaction is being processed",
      date: "Nov 5, 2025",
      status: "pending",
    },
    {
      id: 4,
      title: "Session Cancelled",
      description: "A scheduled session was cancelled",
      date: "Nov 4, 2025",
      status: "warning",
    },
    {
      id: 5,
      title: "New Course Added",
      description: "Advanced Python Programming course added",
      date: "Nov 3, 2025",
      status: "success",
    },
  ];

  const revenueData = [
    { month: "JAN", revenue: 4000 },
    { month: "FEB", revenue: 5000 },
    { month: "MAR", revenue: 6500 },
    { month: "APR", revenue: 4500 },
    { month: "MAY", revenue: 7000 },
    { month: "JUN", revenue: 6000 },
    { month: "JUL", revenue: 7500 },
    { month: "AUG", revenue: 5500 },
    { month: "SEP", revenue: 8000 },
    { month: "OCT", revenue: 6500 },
    { month: "NOV", revenue: 8500 },
    { month: "DEC", revenue: 7000 },
  ];

  const userDistribution = [
    { name: "Students", value: 5610, color: "#002AC8" },
    { name: "Tutors", value: 3032, color: "#e5e7eb" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "warning":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-gray-200 hover:shadow-md transition-shadow"
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div
                    className={`${stat.bgColor} p-2 rounded-full w-fit mb-2`}
                  >
                    {stat.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="space-y-6">
        {/* Revenue Area Chart */}
        <Card className="border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue performance</CardDescription>
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#002AC8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#002AC8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => `$${value}`}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#002AC8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="flex gap-6">
          {/* Left Section - Recent Activity & User Distribution (2/3 width) */}
          <div className="w-2/3">
            <div className="grid gap-6">
              {/* Recent Activity */}
              <Card className="border-gray-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>
                        Latest platform activities
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">
                            {activity.title}
                          </p>
                          <p className="text-gray-600 text-xs mt-1">
                            {activity.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <Badge
                            variant="outline"
                            className={`text-xs ${getStatusColor(
                              activity.status
                            )}`}
                          >
                            {activity.status.charAt(0).toUpperCase() +
                              activity.status.slice(1)}
                          </Badge>
                          <span className="text-gray-500 text-xs whitespace-nowrap">
                            {activity.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Section - Users Distribution (1/3 width) */}
          <Card className="border-gray-200 w-1/3">
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>Platform users breakdown</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={userDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {userDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="mt-6 space-y-3 w-full">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-[#002AC8] rounded-full"></span>
                    Students
                  </span>
                  <span className="font-semibold text-gray-900">5,610</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                    Tutors
                  </span>
                  <span className="font-semibold text-gray-900">3,032</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;
