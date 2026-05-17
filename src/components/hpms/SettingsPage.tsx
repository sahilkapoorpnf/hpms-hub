import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export function SettingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure portal-wide preferences, theme and role permissions.</p>
      </div>
      <Tabs defaultValue="portal">
        <TabsList>
          <TabsTrigger value="portal">Portal</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="permissions">Role Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="portal" className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Portal Configuration</CardTitle></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5"><Label>Portal Name</Label><Input defaultValue="HPMS" /></div>
              <div className="space-y-1.5"><Label>Tagline</Label><Input defaultValue="Highly Professional Management System" /></div>
              <div className="space-y-1.5"><Label>Support Email</Label><Input defaultValue="support@hpms.gov" /></div>
              <div className="space-y-1.5"><Label>Helpline</Label><Input defaultValue="1800-123-4567" /></div>
              <div className="md:col-span-2"><Button onClick={() => toast.success("Saved")}>Save</Button></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme" className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Appearance</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[["Compact density","Reduce spacing across the portal"],["Sidebar auto-collapse","Collapse sidebar on smaller screens"],["High contrast","Improve text legibility"]].map(([t, d]) => (
                <div key={t} className="flex items-center justify-between rounded-md border p-3">
                  <div><div className="font-medium">{t}</div><div className="text-sm text-muted-foreground">{d}</div></div>
                  <Switch />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Notification Channels</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[["Email alerts","Send system alerts to your email"],["SMS alerts","Send urgent alerts via SMS"],["In-app notifications","Show notifications inside the portal"],["Daily digest","Daily summary at 9:00 AM"]].map(([t, d]) => (
                <div key={t} className="flex items-center justify-between rounded-md border p-3">
                  <div><div className="font-medium">{t}</div><div className="text-sm text-muted-foreground">{d}</div></div>
                  <Switch defaultChecked />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Role Permissions Matrix</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="py-2">Module</th><th>SuperAdmin</th><th>Admin</th><th>Engineer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {["Users","Projects","Engineers","Contractors","Work Orders","Tenders","Measurement Book","Billing","Reports","Audit Logs"].map((m) => (
                      <tr key={m} className="border-b">
                        <td className="py-2 font-medium">{m}</td>
                        <td><Switch defaultChecked /></td>
                        <td><Switch defaultChecked={!["Users","Audit Logs","Tenders"].includes(m)} /></td>
                        <td><Switch defaultChecked={["Projects","Measurement Book","Billing","Reports"].includes(m)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
