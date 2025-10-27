import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import LeagueCard from "@/components/sports/LeagueCard";
import { useLeagues, useFeaturedGames } from "@/hooks/useSports";
import sportsHero from "@/assets/sports-mlb-dodgers.jpg";

const Sports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch leagues and featured games from Supabase
  const { data: leagues, isLoading: leaguesLoading } = useLeagues();
  const { data: featuredGames, isLoading: gamesLoading } = useFeaturedGames(4);

  const filteredLeagues = leagues?.filter((league) =>
    league.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    league.slug.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${sportsHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        
        <div className="relative z-10 container px-4 text-center text-white">
          <div className="animate-fade-in">
            <div className="inline-block bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm font-bold mb-6">
              🏆 SPORTS DIRECTORY
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-scale-in">
              Welcome to Skybox
              <br />
              <span className="text-primary">Sports Directory</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Explore your favorite leagues, teams, and live broadcasts at Medellín's premier sports bar
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-background border-b">
        <div className="container px-4">
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Search leagues or sports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Featured Broadcasts */}
      <section className="py-16 bg-dark-section text-dark-foreground">
        <div className="container px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              FEATURED GAMES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Top Matchups</h2>
            <p className="text-xl text-muted-foreground">Don't miss these epic showdowns</p>
          </div>

          {gamesLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            </div>
          ) : featuredGames && featuredGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredGames.map((game, index) => (
                <div 
                  key={game.id} 
                  className="stagger-item bg-card rounded-lg p-6 border border-border hover-lift glow-on-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-center">
                    <div className="text-sm text-primary font-bold mb-2">
                      {game.broadcast_networks || 'TBA'}
                    </div>
                    <h3 className="font-bold text-lg mb-1">{game.home_team?.name || game.home_team_id}</h3>
                    <p className="text-sm text-muted-foreground mb-1">vs</p>
                    <h3 className="font-bold text-lg mb-4">{game.away_team?.name || game.away_team_id}</h3>
                    <div className="text-sm">
                      <p className="font-semibold">{new Date(game.game_datetime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                      <p className="text-muted-foreground">{game.game_time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No featured games scheduled at this time</p>
            </div>
          )}
        </div>
      </section>

      {/* Leagues Grid */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              ALL LEAGUES
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Explore All Sports</h2>
            <p className="text-xl text-muted-foreground">Find your favorite league and never miss a game</p>
          </div>

          {leaguesLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
              <p className="text-xl text-muted-foreground">Loading leagues...</p>
            </div>
          ) : filteredLeagues.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLeagues.map((league, index) => (
                <div 
                  key={league.id} 
                  className="stagger-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <LeagueCard
                    name={league.name}
                    shortName={league.name}
                    slug={league.slug}
                    tagline={`Watch ${league.name} Live`}
                    image={sportsHero}
                    color="#F58634"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No leagues found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary-glow to-primary text-white">
        <div className="container px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Watch Every Game at Skybox
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Giant screens, rooftop views, and the best sports atmosphere in Medellín
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/reserve">
              <button className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover-lift">
                Reserve Your Table
              </button>
            </a>
            <a href="https://wa.me/573047862834" target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-3 bg-whatsapp hover:bg-whatsapp/90 text-white font-bold rounded-lg">
                Chat on WhatsApp
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sports;
