import { Helmet } from "react-helmet-async";

export default function DashboardSettings() {
  return (
    <>
      <Helmet>
        <title>Settings - Skybox Medellín Admin</title>
      </Helmet>
      
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-6">Configure system settings and preferences</p>
        
        <div className="bg-card p-8 rounded-lg border text-center">
          <p className="text-muted-foreground">Settings panel coming soon...</p>
        </div>
      </div>
    </>
  );
}
