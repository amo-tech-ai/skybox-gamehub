import { Helmet } from "react-helmet-async";

export default function DashboardReservations() {
  return (
    <>
      <Helmet>
        <title>Reservations - Skybox Medellín Admin</title>
      </Helmet>
      
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">Reservations</h1>
        <p className="text-muted-foreground mb-6">View and manage all reservations</p>
        
        <div className="bg-card p-8 rounded-lg border text-center">
          <p className="text-muted-foreground">Reservations management coming soon...</p>
        </div>
      </div>
    </>
  );
}
