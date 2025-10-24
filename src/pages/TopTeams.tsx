import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getTopTeamsByLeague, getAllLeaguesSummary } from "@/data/topTeams";
import { Trophy, TrendingUp } from "lucide-react";

const TopTeamsPage = () => {
  const [selectedLeague, setSelectedLeague] = useState<string>("NFL");
  const leagues = getAllLeaguesSummary();
  const topTeams = getTopTeamsByLeague(selectedLeague);

  const leagueColors: Record<string, string> = {
    'NFL': 'from-blue-600 to-blue-700',
    'NHL': 'from-red-600 to-red-700',
    'NBA': 'from-orange-600 to-orange-700',
    'MLB': 'from-green-600 to-green-700',
    'Soccer': 'from-purple-600 to-purple-700'
  };

  const leagueBgColors: Record<string, string> = {
    'NFL': 'bg-primary hover:bg-primary/90',
    'NHL': 'bg-red-600 hover:bg-red-700',
    'NBA': 'bg-orange-600 hover:bg-orange-700',
    'MLB': 'bg-green-600 hover:bg-green-700',
    'Soccer': 'bg-purple-600 hover:bg-purple-700'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className={`py-16 bg-gradient-to-r ${leagueColors[selectedLeague]} text-white`}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy size={40} />
            <h1 className="text-5xl md:text-6xl font-bold">Top Teams</h1>
            <Trophy size={40} />
          </div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            The best teams across all major sports leagues
          </p>
        </div>
      </section>

      {/* League Selector */}
      <section className="py-8 bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {leagues.map(league => (
              <Button
                key={league.name}
                onClick={() => setSelectedLeague(league.name)}
                className={`px-6 py-2 font-bold text-white transition-all ${
                  selectedLeague === league.name
                    ? leagueBgColors[league.name]
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
              >
                {league.icon} {league.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Teams Display */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-2 flex items-center gap-2">
              <TrendingUp size={32} className="text-orange-400" />
              {selectedLeague} Rankings
            </h2>
            <p className="text-slate-400">
              Top 10 teams currently leading the standings
            </p>
          </div>

          <div className="grid gap-4">
            {topTeams.map((team, idx) => (
              <Card
                key={`${team.league}-${team.team}`}
                className="bg-slate-800 border border-slate-700 hover:border-orange-500 transition-all p-6 hover:shadow-lg hover:shadow-orange-500/20"
              >
                <div className="flex items-center justify-between gap-6">
                  {/* Rank */}
                  <div className="flex items-center gap-4 min-w-fit">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      team.rank === 1 ? 'bg-yellow-500 text-yellow-900' :
                      team.rank === 2 ? 'bg-gray-400 text-gray-900' :
                      team.rank === 3 ? 'bg-orange-600 text-orange-900' :
                      'bg-slate-700 text-white'
                    }`}>
                      #{team.rank}
                    </div>
                    
                    {/* Team Info */}
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {team.team}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {team.city}
                        {team.division && ` • ${team.division}`}
                      </p>
                    </div>
                  </div>

                  {/* Record */}
                  <div className="text-right">
                    <div className="text-3xl font-bold text-orange-400 mb-1">
                      {team.record}
                    </div>
                    <p className="text-slate-400 text-xs uppercase">
                      {team.league === 'NFL' || team.league === 'MLB' ? 'Record' : 'W-L'}
                    </p>
                  </div>

                  {/* View Button */}
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6">
                    View Stats
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 bg-slate-800 border-t border-slate-700">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Across All Leagues</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {leagues.map(league => (
              <Card key={league.name} className="bg-slate-700 border border-slate-600 p-6 text-center hover:border-orange-500 transition-all">
                <div className="text-4xl mb-3">{league.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{league.name}</h3>
                <p className="text-slate-400 mb-3">Top: <span className="text-orange-400 font-bold">{league.topTeam}</span></p>
                <p className="text-sm text-slate-500">{league.teams} teams tracked</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Watch These Teams at Skybox!</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Book your table now and watch the best teams in sports compete on our giant screens with premium sound and rooftop views.
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 text-lg">
            Reserve Your Spot
          </Button>
        </div>
      </section>
    </div>
  );
};

export default TopTeamsPage;
