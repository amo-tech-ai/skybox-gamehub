export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      audit_log: {
        Row: {
          changed_fields: string[] | null
          created_at: string | null
          id: string
          ip_address: unknown
          metadata: Json | null
          new_values: Json | null
          old_values: Json | null
          operation: string
          record_id: string
          session_id: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          changed_fields?: string[] | null
          created_at?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          operation: string
          record_id: string
          session_id?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          changed_fields?: string[] | null
          created_at?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          new_values?: Json | null
          old_values?: Json | null
          operation?: string
          record_id?: string
          session_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_items: {
        Row: {
          booking_id: string
          created_at: string | null
          id: string
          item_id: string
          item_type: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          booking_id: string
          created_at?: string | null
          id?: string
          item_id: string
          item_type: string
          quantity?: number
          total_price: number
          unit_price: number
        }
        Update: {
          booking_id?: string
          created_at?: string | null
          id?: string
          item_id?: string
          item_type?: string
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "booking_items_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_status_history: {
        Row: {
          booking_id: string
          changed_by: string | null
          created_at: string | null
          id: string
          reason: string | null
          status: string
        }
        Insert: {
          booking_id: string
          changed_by?: string | null
          created_at?: string | null
          id?: string
          reason?: string | null
          status: string
        }
        Update: {
          booking_id?: string
          changed_by?: string | null
          created_at?: string | null
          id?: string
          reason?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_status_history_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_status_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_date: string
          created_at: string | null
          currency: string | null
          deleted_at: string | null
          event_id: string | null
          id: string
          special_requests: string | null
          status: string
          total_amount: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          booking_date: string
          created_at?: string | null
          currency?: string | null
          deleted_at?: string | null
          event_id?: string | null
          id?: string
          special_requests?: string | null
          status?: string
          total_amount: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          booking_date?: string
          created_at?: string | null
          currency?: string | null
          deleted_at?: string | null
          event_id?: string | null
          id?: string
          special_requests?: string | null
          status?: string
          total_amount?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          display_order: number | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          display_order?: number | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      event_categories: {
        Row: {
          category_id: string
          created_at: string | null
          event_id: string
          id: string
        }
        Insert: {
          category_id: string
          created_at?: string | null
          event_id: string
          id?: string
        }
        Update: {
          category_id?: string
          created_at?: string | null
          event_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_categories_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          capacity: number | null
          category: string | null
          created_at: string | null
          currency: string | null
          deleted_at: string | null
          description: string | null
          end_date: string | null
          event_date: string
          event_type: string
          id: string
          image_url: string | null
          metadata: Json | null
          price: number | null
          slug: string | null
          status: string
          title: string
          updated_at: string | null
          venue: string | null
          venue_id: string | null
        }
        Insert: {
          capacity?: number | null
          category?: string | null
          created_at?: string | null
          currency?: string | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          event_date: string
          event_type: string
          id?: string
          image_url?: string | null
          metadata?: Json | null
          price?: number | null
          slug?: string | null
          status?: string
          title: string
          updated_at?: string | null
          venue?: string | null
          venue_id?: string | null
        }
        Update: {
          capacity?: number | null
          category?: string | null
          created_at?: string | null
          currency?: string | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          event_date?: string
          event_type?: string
          id?: string
          image_url?: string | null
          metadata?: Json | null
          price?: number | null
          slug?: string | null
          status?: string
          title?: string
          updated_at?: string | null
          venue?: string | null
          venue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          away_score: number | null
          away_team_id: string | null
          broadcast_networks: string | null
          created_at: string | null
          game_date: string
          game_datetime: string
          game_time: string
          home_score: number | null
          home_team_id: string | null
          id: string
          league_id: string | null
          notes: string | null
          season_year: number
          status: string | null
          updated_at: string | null
          venue: string | null
          week_number: number | null
        }
        Insert: {
          away_score?: number | null
          away_team_id?: string | null
          broadcast_networks?: string | null
          created_at?: string | null
          game_date: string
          game_datetime: string
          game_time: string
          home_score?: number | null
          home_team_id?: string | null
          id?: string
          league_id?: string | null
          notes?: string | null
          season_year: number
          status?: string | null
          updated_at?: string | null
          venue?: string | null
          week_number?: number | null
        }
        Update: {
          away_score?: number | null
          away_team_id?: string | null
          broadcast_networks?: string | null
          created_at?: string | null
          game_date?: string
          game_datetime?: string
          game_time?: string
          home_score?: number | null
          home_team_id?: string | null
          id?: string
          league_id?: string | null
          notes?: string | null
          season_year?: number
          status?: string | null
          updated_at?: string | null
          venue?: string | null
          week_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "games_away_team_id_fkey"
            columns: ["away_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_home_team_id_fkey"
            columns: ["home_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
        ]
      }
      leagues: {
        Row: {
          created_at: string | null
          id: string
          logo_url: string | null
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      menu_items: {
        Row: {
          allergens: string[] | null
          category: string
          created_at: string | null
          currency: string | null
          description: string | null
          dietary_info: string | null
          display_order: number | null
          id: string
          image_url: string | null
          ingredients: string | null
          is_available: boolean | null
          is_featured: boolean | null
          name: string
          price: number
          tags: string[] | null
          updated_at: string | null
        }
        Insert: {
          allergens?: string[] | null
          category: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          dietary_info?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          ingredients?: string | null
          is_available?: boolean | null
          is_featured?: boolean | null
          name: string
          price: number
          tags?: string[] | null
          updated_at?: string | null
        }
        Update: {
          allergens?: string[] | null
          category?: string
          created_at?: string | null
          currency?: string | null
          description?: string | null
          dietary_info?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          ingredients?: string | null
          is_available?: boolean | null
          is_featured?: boolean | null
          name?: string
          price?: number
          tags?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          confirmed_at: string | null
          created_at: string | null
          deleted_at: string | null
          email: string
          id: string
          metadata: Json | null
          name: string | null
          phone: string
          source: string | null
          status: string
          subscribed_at: string | null
          unsubscribe_token: string | null
          updated_at: string | null
        }
        Insert: {
          confirmed_at?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email: string
          id?: string
          metadata?: Json | null
          name?: string | null
          phone: string
          source?: string | null
          status?: string
          subscribed_at?: string | null
          unsubscribe_token?: string | null
          updated_at?: string | null
        }
        Update: {
          confirmed_at?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string
          id?: string
          metadata?: Json | null
          name?: string | null
          phone?: string
          source?: string | null
          status?: string
          subscribed_at?: string | null
          unsubscribe_token?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          deleted_at: string | null
          id: string
          sent_at: string | null
          status: string
          template: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          deleted_at?: string | null
          id?: string
          sent_at?: string | null
          status?: string
          template: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          deleted_at?: string | null
          id?: string
          sent_at?: string | null
          status?: string
          template?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          created_at: string | null
          external_id: string
          id: string
          is_default: boolean | null
          method_type: string
          provider: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          external_id: string
          id?: string
          is_default?: boolean | null
          method_type: string
          provider: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          external_id?: string
          id?: string
          is_default?: boolean | null
          method_type?: string
          provider?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_methods_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string | null
          currency: string | null
          deleted_at: string | null
          external_payment_id: string | null
          id: string
          payment_method: string
          processed_at: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string | null
          currency?: string | null
          deleted_at?: string | null
          external_payment_id?: string | null
          id?: string
          payment_method: string
          processed_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string | null
          currency?: string | null
          deleted_at?: string | null
          external_payment_id?: string | null
          id?: string
          payment_method?: string
          processed_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          deleted_at: string | null
          email_notifications: boolean | null
          full_name: string | null
          id: string
          last_seen_at: string | null
          metadata: Json | null
          phone: string | null
          preferred_language: string | null
          role: string | null
          sms_notifications: boolean | null
          timezone: string | null
          updated_at: string | null
          user_id: string
          whatsapp_opt_in: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email_notifications?: boolean | null
          full_name?: string | null
          id?: string
          last_seen_at?: string | null
          metadata?: Json | null
          phone?: string | null
          preferred_language?: string | null
          role?: string | null
          sms_notifications?: boolean | null
          timezone?: string | null
          updated_at?: string | null
          user_id: string
          whatsapp_opt_in?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email_notifications?: boolean | null
          full_name?: string | null
          id?: string
          last_seen_at?: string | null
          metadata?: Json | null
          phone?: string | null
          preferred_language?: string | null
          role?: string | null
          sms_notifications?: boolean | null
          timezone?: string | null
          updated_at?: string | null
          user_id?: string
          whatsapp_opt_in?: boolean | null
        }
        Relationships: []
      }
      refunds: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          payment_id: string
          processed_at: string | null
          reason: string
          status: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          payment_id: string
          processed_at?: string | null
          reason: string
          status?: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          payment_id?: string
          processed_at?: string | null
          reason?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "refunds_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      shopify_orders: {
        Row: {
          booking_id: string | null
          created_at: string | null
          id: string
          order_data: Json
          shopify_order_id: string
          status: string
          synced_at: string | null
        }
        Insert: {
          booking_id?: string | null
          created_at?: string | null
          id?: string
          order_data: Json
          shopify_order_id: string
          status: string
          synced_at?: string | null
        }
        Update: {
          booking_id?: string | null
          created_at?: string | null
          id?: string
          order_data?: Json
          shopify_order_id?: string
          status?: string
          synced_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopify_orders_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      skybox_featured_games: {
        Row: {
          created_at: string | null
          display_priority: number | null
          featured_at: string
          game_id: string | null
          id: string
          is_promotional: boolean | null
          promotion_text: string | null
          special_offers: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_priority?: number | null
          featured_at: string
          game_id?: string | null
          id?: string
          is_promotional?: boolean | null
          promotion_text?: string | null
          special_offers?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_priority?: number | null
          featured_at?: string
          game_id?: string | null
          id?: string
          is_promotional?: boolean | null
          promotion_text?: string | null
          special_offers?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skybox_featured_games_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          abbreviation: string | null
          city: string | null
          created_at: string | null
          id: string
          league_id: string | null
          logo_url: string | null
          name: string
        }
        Insert: {
          abbreviation?: string | null
          city?: string | null
          created_at?: string | null
          id?: string
          league_id?: string | null
          logo_url?: string | null
          name: string
        }
        Update: {
          abbreviation?: string | null
          city?: string | null
          created_at?: string | null
          id?: string
          league_id?: string | null
          logo_url?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
        ]
      }
      venues: {
        Row: {
          address: string | null
          capacity: number | null
          city: string | null
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          capacity?: number | null
          city?: string | null
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          capacity?: number | null
          city?: string | null
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      webhook_events: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          payload: Json
          processed: boolean | null
          processed_at: string | null
          source: string
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          payload: Json
          processed?: boolean | null
          processed_at?: string | null
          source: string
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          payload?: Json
          processed?: boolean | null
          processed_at?: string | null
          source?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_profile: {
        Args: never
        Returns: {
          avatar_url: string | null
          created_at: string | null
          deleted_at: string | null
          email_notifications: boolean | null
          full_name: string | null
          id: string
          last_seen_at: string | null
          metadata: Json | null
          phone: string | null
          preferred_language: string | null
          role: string | null
          sms_notifications: boolean | null
          timezone: string | null
          updated_at: string | null
          user_id: string
          whatsapp_opt_in: boolean | null
        }
        SetofOptions: {
          from: "*"
          to: "profiles"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      has_role: { Args: { required_role: string }; Returns: boolean }
      is_staff: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
