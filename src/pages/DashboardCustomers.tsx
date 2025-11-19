import { Helmet } from "react-helmet-async";

export default function DashboardCustomers() {
  return (
    <>
      <Helmet>
        <title>Customers - Skybox Medellín Admin</title>
      </Helmet>
      
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">Customers</h1>
        <p className="text-muted-foreground mb-6">Manage customer profiles and loyalty points</p>
        
        <div className="bg-card p-8 rounded-lg border text-center">
          <p className="text-muted-foreground">Customer management coming soon...</p>
        </div>
      </div>
    </>
  );
}
