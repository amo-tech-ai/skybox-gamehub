import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getGamesByLeague, getSportStats, getAllLeagues } from "@/data/allSports";
import { Calendar, Trophy, Tv } from "lucide-react";

const SportsSchedule = () => {
  const [selectedLeague, setSelectedLeague] = useState<"NFL" | "NHL" | "MLB" | "NBA">("NFL");
  const [searchTerm, setSearchTerm] = useState("");

  const games = getGamesByLeague(selectedLeague);
  const stats = getSportStats();
  const leagues = getAllLeagues();

  const filteredGames = games.filter(game => {
    const searchLower = searchTerm.toLowerCase();
    return (
      game.homeTeam.toLowerCase().includes(searchLower) ||
      game.awayTeam.toLowerCase().includes(searchLower) ||
      game.date.toLowerCase().includes(searchLower)
    );
  });

  const leagueColors: Record<string, string> = {
    NFL: "bg-primary hover:bg-primary/90",
    NHL: "bg-red-600 hover:bg-red-700",
    MLB: "bg-green-600 hover:bg-green-700",
    NBA: "bg-orange-600 hover:bg-orange-700"
  };

  const leagueIcons: Record<string, string> = {
    NFL: "🏈",
    NHL: "🏒",
    MLB: "⚾",
    NBA: "🏀"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              🎪 Skybox Sports Schedule
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              All your favorite sports games in one place. Choose your league and never miss a moment!
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {leagues.map(league => (
              <div key={league} className="text-center">
                <div className="text-3xl mb-2">{leagueIcons[league]}</div>
                <div className="text-white font-bold">{league}</div>
                <div className="text-slate-400">{stats[league]} Games</div>
              </div>
            ))}
            <div className="text-center">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-white font-bold">TOTAL</div>
              <div className="text-slate-400">{stats.TOTAL} Games</div>
            </div>
          </div>
        </div>
      </section>

      {/* League Selector */}
      <section className="py-8 bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {leagues.map(league => (
              <Button
                key={league}
                onClick={() => setSelectedLeague(league)}
                className={`px-6 py-2 font-bold text-white transition-all ${
                  selectedLeague === league
                    ? leagueColors[league]
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
              >
                {leagueIcons[league]} {league}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-6 bg-slate-800">
        <div className="container mx-auto px-4">
          <input
            type="text"
            placeholder="Search games by team or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-slate-400 border border-slate-600 focus:border-orange-500 focus:outline-none"
          />
        </div>
      </section>

      {/* Games Display */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              {selectedLeague} Games
            </h2>
            <p className="text-slate-400">
              Showing {filteredGames.length} game{filteredGames.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filteredGames.length > 0 ? (
            <div className="grid gap-4">
              {filteredGames.map((game, idx) => (
                <Card
                  key={game.gameId}
                  className="bg-slate-800 border border-slate-700 hover:border-orange-500 transition-all p-6 hover:shadow-lg hover:shadow-orange-500/20"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Game Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${leagueColors[game.league]} bg-opacity-80`}>
                          {leagueIcons[game.league]} {game.league}
                        </span>
                        <span className="text-slate-400 text-sm">Game {idx + 1}</span>
                      </div>

                      {/* Teams */}
                      <div className="mb-4">
                        <div className="text-lg md:text-2xl font-bold text-white mb-2">
                          <span className="text-orange-400">{game.awayTeam}</span>
                          <span className="text-slate-500 mx-2">@</span>
                          <span className="text-slate-200">{game.homeTeam}</span>
                        </div>
                        {game.venue && (
                          <div className="text-sm text-slate-400">
                            <Trophy size={14} className="inline mr-1" />
                            {game.venue}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="flex flex-col items-start md:items-end md:min-w-[200px]">
                      <div className="flex items-center gap-2 text-slate-300 mb-2">
                        <Calendar size={18} />
                        <span className="font-semibold">{game.date}</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-400 mb-3">
                        {game.time}
                      </div>

                      {/* Networks */}
                      <div className="flex flex-wrap gap-2">
                        {game.broadcastNetworks.map(network => (
                          <span
                            key={network}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-600"
                          >
                            <Tv size={12} />
                            {network}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="md:ml-4">
                      <Button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold px-6">
                        Reserve Spot
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-slate-400 mb-4">No games found matching your search</p>
              <Button
                onClick={() => setSearchTerm("")}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-12 bg-slate-800 border-t border-slate-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">🏀 NBA Coming Soon</h2>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            We're adding the 2025-2026 NBA season schedule. Check back soon for all the basketball action!
          </p>
        </div>
      </section>
    </div>
  );
};

export default SportsSchedule;
