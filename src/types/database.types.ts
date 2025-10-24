// ===========================================================================
// Database Types - Auto-generated from Supabase Schema
// ===========================================================================
// Generated: 2025-10-24
// Schema Version: 1.0
// Source: /home/sk/skybox-gamehub/supabase/schemas/
// ===========================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // =======================================================================
      // Profiles Table
      // =======================================================================
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          preferred_language: string
          timezone: string
          whatsapp_opt_in: boolean
          email_notifications: boolean
          sms_notifications: boolean
          role: 'customer' | 'staff' | 'admin' | 'superadmin'
          metadata: Json
          created_at: string
          updated_at: string
          deleted_at: string | null
          last_seen_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          preferred_language?: string
          timezone?: string
          whatsapp_opt_in?: boolean
          email_notifications?: boolean
          sms_notifications?: boolean
          role?: 'customer' | 'staff' | 'admin' | 'superadmin'
          metadata?: Json
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
          last_seen_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          preferred_language?: string
          timezone?: string
          whatsapp_opt_in?: boolean
          email_notifications?: boolean
          sms_notifications?: boolean
          role?: 'customer' | 'staff' | 'admin' | 'superadmin'
          metadata?: Json
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
          last_seen_at?: string
        }
      }

      // =======================================================================
      // Event Categories Table
      // =======================================================================
      event_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }

      // =======================================================================
      // Venues Table
      // =======================================================================
      venues: {
        Row: {
          id: string
          name: string
          slug: string
          address: string | null
          city: string
          state: string
          country: string
          postal_code: string | null
          phone: string | null
          email: string | null
          website: string | null
          latitude: number | null
          longitude: number | null
          capacity: number | null
          description: string | null
          amenities: string[] | null
          images: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          address?: string | null
          city?: string
          state?: string
          country?: string
          postal_code?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          latitude?: number | null
          longitude?: number | null
          capacity?: number | null
          description?: string | null
          amenities?: string[] | null
          images?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          address?: string | null
          city?: string
          state?: string
          country?: string
          postal_code?: string | null
          phone?: string | null
          email?: string | null
          website?: string | null
          latitude?: number | null
          longitude?: number | null
          capacity?: number | null
          description?: string | null
          amenities?: string[] | null
          images?: Json
          created_at?: string
          updated_at?: string
        }
      }

      // =======================================================================
      // Events Table
      // =======================================================================
      events: {
        Row: {
          id: string
          title: string
          slug: string
          subtitle: string | null
          description: string
          short_description: string | null
          category_id: string | null
          venue_id: string | null
          event_date: string
          event_time: string
          event_datetime: string
          end_datetime: string | null
          timezone: string
          total_capacity: number | null
          available_capacity: number | null
          min_party_size: number
          max_party_size: number
          base_price: number | null
          currency: string
          featured_image: string | null
          banner_image: string | null
          thumbnail_image: string | null
          gallery_images: Json
          video_url: string | null
          is_featured: boolean
          is_sold_out: boolean
          is_private: boolean
          display_order: number
          status: 'draft' | 'published' | 'cancelled' | 'past' | 'sold_out'
          published_at: string | null
          meta_title: string | null
          meta_description: string | null
          meta_keywords: string[] | null
          view_count: number
          reservation_count: number
          created_by: string | null
          updated_by: string | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          subtitle?: string | null
          description: string
          short_description?: string | null
          category_id?: string | null
          venue_id?: string | null
          event_date: string
          event_time: string
          event_datetime: string
          end_datetime?: string | null
          timezone?: string
          total_capacity?: number | null
          available_capacity?: number | null
          min_party_size?: number
          max_party_size?: number
          base_price?: number | null
          currency?: string
          featured_image?: string | null
          banner_image?: string | null
          thumbnail_image?: string | null
          gallery_images?: Json
          video_url?: string | null
          is_featured?: boolean
          is_sold_out?: boolean
          is_private?: boolean
          display_order?: number
          status?: 'draft' | 'published' | 'cancelled' | 'past' | 'sold_out'
          published_at?: string | null
          meta_title?: string | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          view_count?: number
          reservation_count?: number
          created_by?: string | null
          updated_by?: string | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          subtitle?: string | null
          description?: string
          short_description?: string | null
          category_id?: string | null
          venue_id?: string | null
          event_date?: string
          event_time?: string
          event_datetime?: string
          end_datetime?: string | null
          timezone?: string
          total_capacity?: number | null
          available_capacity?: number | null
          min_party_size?: number
          max_party_size?: number
          base_price?: number | null
          currency?: string
          featured_image?: string | null
          banner_image?: string | null
          thumbnail_image?: string | null
          gallery_images?: Json
          video_url?: string | null
          is_featured?: boolean
          is_sold_out?: boolean
          is_private?: boolean
          display_order?: number
          status?: 'draft' | 'published' | 'cancelled' | 'past' | 'sold_out'
          published_at?: string | null
          meta_title?: string | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          view_count?: number
          reservation_count?: number
          created_by?: string | null
          updated_by?: string | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }

      // =======================================================================
      // Event Highlights Table
      // =======================================================================
      event_highlights: {
        Row: {
          id: string
          event_id: string
          highlight_text: string
          icon: string | null
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          highlight_text: string
          icon?: string | null
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          highlight_text?: string
          icon?: string | null
          display_order?: number
          created_at?: string
        }
      }

      // =======================================================================
      // Event Prizes Table
      // =======================================================================
      event_prizes: {
        Row: {
          id: string
          event_id: string
          place: number
          title: string
          description: string | null
          value: number | null
          currency: string
          image_url: string | null
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          place: number
          title: string
          description?: string | null
          value?: number | null
          currency?: string
          image_url?: string | null
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          place?: number
          title?: string
          description?: string | null
          value?: number | null
          currency?: string
          image_url?: string | null
          display_order?: number
          created_at?: string
        }
      }

      // =======================================================================
      // Event Specials Table
      // =======================================================================
      event_specials: {
        Row: {
          id: string
          event_id: string
          name: string
          description: string | null
          price: number | null
          original_price: number | null
          currency: string
          image_url: string | null
          is_available: boolean
          available_quantity: number | null
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id: string
          name: string
          description?: string | null
          price?: number | null
          original_price?: number | null
          currency?: string
          image_url?: string | null
          is_available?: boolean
          available_quantity?: number | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          name?: string
          description?: string | null
          price?: number | null
          original_price?: number | null
          currency?: string
          image_url?: string | null
          is_available?: boolean
          available_quantity?: number | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }

      // =======================================================================
      // Event FAQs Table
      // =======================================================================
      event_faqs: {
        Row: {
          id: string
          event_id: string | null
          question: string
          answer: string
          category: string | null
          is_global: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id?: string | null
          question: string
          answer: string
          category?: string | null
          is_global?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          event_id?: string | null
          question?: string
          answer?: string
          category?: string | null
          is_global?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }

      // =======================================================================
      // Event Packages Table
      // =======================================================================
      event_packages: {
        Row: {
          id: string
          event_id: string | null
          name: string
          description: string | null
          price: number
          currency: string
          max_guests: number | null
          includes: string[] | null
          is_vip: boolean
          is_available: boolean
          available_quantity: number | null
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id?: string | null
          name: string
          description?: string | null
          price: number
          currency?: string
          max_guests?: number | null
          includes?: string[] | null
          is_vip?: boolean
          is_available?: boolean
          available_quantity?: number | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          event_id?: string | null
          name?: string
          description?: string | null
          price?: number
          currency?: string
          max_guests?: number | null
          includes?: string[] | null
          is_vip?: boolean
          is_available?: boolean
          available_quantity?: number | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_profile: {
        Args: Record<string, never>
        Returns: Database['public']['Tables']['profiles']['Row']
      }
      has_role: {
        Args: { required_role: string }
        Returns: boolean
      }
      is_staff: {
        Args: Record<string, never>
        Returns: boolean
      }
      get_upcoming_events: {
        Args: { limit_count?: number }
        Returns: Database['public']['Tables']['events']['Row'][]
      }
      get_featured_events: {
        Args: { limit_count?: number }
        Returns: Database['public']['Tables']['events']['Row'][]
      }
      search_events: {
        Args: { search_query: string; limit_count?: number }
        Returns: Database['public']['Tables']['events']['Row'][]
      }
      increment_event_views: {
        Args: { event_id_param: string }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// =============================================================================
// Convenience Type Exports
// =============================================================================

export type Profile = Database['public']['Tables']['profiles']['Row']
export type EventCategory = Database['public']['Tables']['event_categories']['Row']
export type Venue = Database['public']['Tables']['venues']['Row']
export type Event = Database['public']['Tables']['events']['Row']
export type EventHighlight = Database['public']['Tables']['event_highlights']['Row']
export type EventPrize = Database['public']['Tables']['event_prizes']['Row']
export type EventSpecial = Database['public']['Tables']['event_specials']['Row']
export type EventFaq = Database['public']['Tables']['event_faqs']['Row']
export type EventPackage = Database['public']['Tables']['event_packages']['Row']

// Insert types
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type EventCategoryInsert = Database['public']['Tables']['event_categories']['Insert']
export type VenueInsert = Database['public']['Tables']['venues']['Insert']
export type EventInsert = Database['public']['Tables']['events']['Insert']
export type EventHighlightInsert = Database['public']['Tables']['event_highlights']['Insert']
export type EventPrizeInsert = Database['public']['Tables']['event_prizes']['Insert']
export type EventSpecialInsert = Database['public']['Tables']['event_specials']['Insert']
export type EventFaqInsert = Database['public']['Tables']['event_faqs']['Insert']
export type EventPackageInsert = Database['public']['Tables']['event_packages']['Insert']

// Update types
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']
export type EventCategoryUpdate = Database['public']['Tables']['event_categories']['Update']
export type VenueUpdate = Database['public']['Tables']['venues']['Update']
export type EventUpdate = Database['public']['Tables']['events']['Update']
export type EventHighlightUpdate = Database['public']['Tables']['event_highlights']['Update']
export type EventPrizeUpdate = Database['public']['Tables']['event_prizes']['Update']
export type EventSpecialUpdate = Database['public']['Tables']['event_specials']['Update']
export type EventFaqUpdate = Database['public']['Tables']['event_faqs']['Update']
export type EventPackageUpdate = Database['public']['Tables']['event_packages']['Update']

// =============================================================================
// Composite Types (with relations)
// =============================================================================

export interface EventWithDetails extends Event {
  category?: EventCategory | null
  venue?: Venue | null
  highlights?: EventHighlight[]
  prizes?: EventPrize[]
  specials?: EventSpecial[]
  faqs?: EventFaq[]
  packages?: EventPackage[]
  created_by_profile?: Profile | null
  updated_by_profile?: Profile | null
}

export interface VenueWithEvents extends Venue {
  events?: Event[]
}

export interface EventCategoryWithEvents extends EventCategory {
  events?: Event[]
}
