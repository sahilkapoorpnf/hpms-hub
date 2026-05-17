import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export function ProfilePage() {
  const { user } = useAuth();
  const initials = (user?.name || "U").split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your personal information and password.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
            <Avatar className="h-20 w-20"><AvatarFallback className="bg-primary text-2xl text-primary-foreground">{initials}</AvatarFallback></Avatar>
            <div>
              <div className="text-lg font-semibold">{user?.name}</div>
              <div className="text-xs text-muted-foreground">{user?.email}</div>
              <div className="mt-1 inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium capitalize text-primary">{user?.role}</div>
            </div>
            <Button variant="outline" size="sm" className="w-full">Upload Photo</Button>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader><CardTitle className="text-base">Personal Information</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              ["Full Name", user?.name ?? ""],
              ["Email", user?.email ?? ""],
              ["Phone", "+91 98765 43210"],
              ["Designation", "Senior Officer"],
              ["Department", "PWD"],
              ["Region", "Mumbai"],
            ].map(([l, v]) => (
              <div key={l} className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">{l}</Label>
                <Input defaultValue={v} />
              </div>
            ))}
            <div className="md:col-span-2">
              <Button onClick={() => toast.success("Profile updated")}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Change Password</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-1.5"><Label>Current Password</Label><Input type="password" /></div>
          <div className="space-y-1.5"><Label>New Password</Label><Input type="password" /></div>
          <div className="space-y-1.5"><Label>Confirm Password</Label><Input type="password" /></div>
          <div className="md:col-span-3">
            <Button onClick={() => toast.success("Password updated")}>Update Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
