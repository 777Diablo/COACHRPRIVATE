import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@hidstech/common_components/components/ui/card.js";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@hidstech/common_components/components/ui/tabs.js";
import { Overview } from "./overview";
import { RecentOrders } from "./recent-orders";
import { DashboardHeader } from "./header";
import { DashboardShell } from "./shell";
import { StatsCards } from "./stats-cards";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin dashboard for your app",
};

export default function DashboardPage() {
  return (
    <div className="container pt-6">
      <DashboardShell>
      {/* <DashboardHeader
        heading="Dashboard"
        text="Overview of your app's performance and recent activities."
      /> */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <StatsCards />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentOrders />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
    </div>
  );
}
