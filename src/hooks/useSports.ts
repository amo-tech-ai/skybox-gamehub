// @ts-nocheck
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface League {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  created_at: string;
}

export interface Team {
  id: string;
  league_id: string;
  name: string;
  city?: string;
  abbreviation?: string;
  logo_url?: string;
}

export interface Game {
  id: string;
  league_id: string;
  home_team_id: string;
  away_team_id: string;
  game_datetime: string;
  game_date: string;
  game_time: string;
  venue?: string;
  broadcast_networks?: string;
  status: string;
  season_year: number;
  week_number?: number;
  home_team?: Team;
  away_team?: Team;
  league?: League;
}

/**
 * Fetch all leagues
 */
export const useLeagues = () => {
  return useQuery({
    queryKey: ['leagues'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leagues')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      return data as League[];
    },
  });
};

/**
 * Fetch teams by league
 */
export const useTeamsByLeague = (leagueId: string | null) => {
  return useQuery({
    queryKey: ['teams', leagueId],
    queryFn: async () => {
      if (!leagueId) return [];

      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('league_id', leagueId)
        .order('city', { ascending: true });

      if (error) throw error;
      return data as Team[];
    },
    enabled: !!leagueId,
  });
};

/**
 * Fetch upcoming games with teams and league info
 */
export const useUpcomingGames = (limit: number = 50, leagueId?: string) => {
  return useQuery({
    queryKey: ['games', 'upcoming', limit, leagueId],
    queryFn: async () => {
      let query = supabase
        .from('games')
        .select(`
          *,
          home_team:teams!games_home_team_id_fkey(id, name, city, abbreviation, logo_url),
          away_team:teams!games_away_team_id_fkey(id, name, city, abbreviation, logo_url),
          league:leagues(id, name, slug, logo_url)
        `)
        .gte('game_datetime', new Date().toISOString())
        .order('game_datetime', { ascending: true })
        .limit(limit);

      if (leagueId) {
        query = query.eq('league_id', leagueId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Game[];
    },
  });
};

/**
 * Fetch featured/highlighted games
 */
export const useFeaturedGames = (limit: number = 10) => {
  return useQuery({
    queryKey: ['games', 'featured', limit],
    queryFn: async () => {
      // Get games from specific networks or use skybox_featured_games table
      const { data, error } = await supabase
        .from('games')
        .select(`
          *,
          home_team:teams!games_home_team_id_fkey(id, name, city, abbreviation, logo_url),
          away_team:teams!games_away_team_id_fkey(id, name, city, abbreviation, logo_url),
          league:leagues(id, name, slug, logo_url)
        `)
        .gte('game_datetime', new Date().toISOString())
        .order('game_datetime', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return data as Game[];
    },
  });
};

/**
 * Get games count by league
 */
export const useGamesStats = () => {
  return useQuery({
    queryKey: ['games', 'stats'],
    queryFn: async () => {
      const { data: leagues, error: leaguesError } = await supabase
        .from('leagues')
        .select('id, name, slug');

      if (leaguesError) throw leaguesError;

      const stats: Record<string, number> = {};
      let total = 0;

      for (const league of leagues || []) {
        const { count, error } = await supabase
          .from('games')
          .select('*', { count: 'exact', head: true })
          .eq('league_id', league.id)
          .gte('game_datetime', new Date().toISOString());

        if (error) throw error;
        stats[league.name] = count || 0;
        total += count || 0;
      }

      stats['TOTAL'] = total;
      return stats;
    },
  });
};
