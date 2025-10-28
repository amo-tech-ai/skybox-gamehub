import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Reserve from "./pages/Reserve";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Sports from "./pages/Sports";
import LeagueDetail from "./pages/LeagueDetail";
import WorldSeries from "./pages/WorldSeries";
import SportsSchedule from "./pages/SportsSchedule";
import TopTeams from "./pages/TopTeams";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/world-series" element={<WorldSeries />} />
            <Route path="/sports-schedule" element={<SportsSchedule />} />
            <Route path="/top-teams" element={<TopTeams />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/reserve" element={<Reserve />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/sports/:slug" element={<LeagueDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
