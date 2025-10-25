import { Suspense } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import YouTubeStats from "./youtube-stats";
import { isSuperAdmin } from "@/lib/auth/admin-helpers";

export default async function AdminDashboard() {
  const isSuper = await isSuperAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome to the admin dashboard. Manage your YouTube content and
            analytics.
          </p>
        </div>
        {isSuper && (
          <Link href="/admin/users">
            <Button variant="outline">Manage Users</Button>
          </Link>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              YouTube Channel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">InmoInversor</div>
            <p className="text-xs text-muted-foreground">
              Real estate investment channel
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-8 w-16" />}>
              <YouTubeStats />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date().toLocaleDateString()}
            </div>
            <p className="text-xs text-muted-foreground">Dashboard refresh</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from your YouTube channel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    YouTube API Connected
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Channel data synchronized successfully
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                • View YouTube analytics
              </div>
              <div className="text-sm text-muted-foreground">
                • Manage video content
              </div>
              <div className="text-sm text-muted-foreground">
                • Update channel settings
              </div>
              <div className="text-sm text-muted-foreground">
                • Monitor performance metrics
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
