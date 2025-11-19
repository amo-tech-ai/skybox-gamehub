import { Helmet } from "react-helmet-async";

export default function DashboardWhatsApp() {
  return (
    <>
      <Helmet>
        <title>WhatsApp - Skybox Medellín Admin</title>
      </Helmet>
      
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2">WhatsApp Messages</h1>
        <p className="text-muted-foreground mb-6">View message history and send broadcasts</p>
        
        <div className="bg-card p-8 rounded-lg border text-center">
          <p className="text-muted-foreground">WhatsApp management coming soon...</p>
        </div>
      </div>
    </>
  );
}
