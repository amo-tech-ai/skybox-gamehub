import { Helmet } from "react-helmet-async";

export default function DashboardEvents() {
  return (
    <>
      <Helmet>
        <title>Events - Skybox Medellín Admin</title>
      </Helmet>
      
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">Events Management</h1>
        <p className="text-muted-foreground mb-6">Manage all events and schedules</p>
        
        <div className="bg-card p-8 rounded-lg border text-center">
          <p className="text-muted-foreground">Events management coming soon...</p>
        </div>
      </div>
    </>
  );
}
