import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Tv } from "lucide-react";
import { leagues } from "@/data/leagues";
import { useToast } from "@/hooks/use-toast";

const LeagueDetail = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const league = leagues.find((l) => l.slug === slug);

  if (!league) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">League Not Found</h1>
          <Link to="/sports">
            <Button>Back to Sports Directory</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleReserve = () => {
    toast({
      title: "Redirecting to Reservations",
      description: `Reserve your spot to watch ${league.name} games!`,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${league.image})` }}
        >
          <div 
            className="absolute inset-0"
            style={{ background: `linear-gradient(to right, ${league.color}ee, ${league.color}aa, ${league.color}66)` }}
          />
        </div>
        
        <div className="relative z-10 container px-4 text-white">
          <Link to="/sports">
            <Button variant="ghost" className="mb-6 text-white hover:text-white hover:bg-white/20">
              <ArrowLeft className="mr-2" size={20} />
              Back to All Leagues
            </Button>
          </Link>
          
          <div className="animate-fade-in">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              {league.shortName}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">{league.name}</h1>
            <p className="text-2xl md:text-3xl mb-6 font-bold text-primary">{league.tagline}</p>
            <p className="text-lg md:text-xl max-w-3xl">{league.description}</p>
          </div>
        </div>
      </section>

      {/* Broadcast Schedule */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              UPCOMING BROADCASTS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">This Week's Schedule</h2>
            <p className="text-xl text-muted-foreground">Watch live at Skybox Medellín</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {league.broadcasts.map((broadcast) => (
              <div 
                key={broadcast.id}
                className="bg-card border border-border rounded-lg p-6 hover-lift glow-on-hover"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Tv size={20} className="text-primary" />
                      <span className="text-sm font-bold text-primary">{broadcast.network}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">
                      {broadcast.homeTeam} <span className="text-muted-foreground">vs</span> {broadcast.awayTeam}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(broadcast.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} · {broadcast.time}
                    </p>
                  </div>
                  <Link to="/reserve">
                    <Button onClick={handleReserve} className="gradient-primary">
                      Reserve Seat
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teams Grid */}
      <section className="py-16 bg-dark-section text-dark-foreground">
        <div className="container px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              TEAMS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">All {league.shortName} Teams</h2>
            <p className="text-xl text-muted-foreground">Follow your favorites at Skybox</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {league.teams.map((team, index) => (
              <div 
                key={team.id}
                className="stagger-item bg-card border border-border rounded-lg p-6 text-center hover-lift glow-on-hover"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{team.name.substring(0, 2).toUpperCase()}</span>
                </div>
                <h3 className="font-bold text-sm mb-1">{team.city}</h3>
                <p className="text-xs text-muted-foreground">{team.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary-glow to-primary text-white">
        <div className="container px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Watch {league.shortName} Live at Skybox
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every game. Every moment. On massive screens with the best atmosphere in Medellín.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reserve">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Reserve Your Table
              </Button>
            </Link>
            <a href="https://wa.me/573047862834" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="bg-whatsapp hover:bg-whatsapp/90 text-white border-0 text-lg px-8">
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeagueDetail;
