// Auto-generated-style Supabase type definitions.
// Regenerate with: supabase gen types typescript --linked

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: { id: string; created_at: string }
        Insert: { id: string; created_at?: string }
        Update: { id?: string; created_at?: string }
      }
      registrations: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string
          email: string
          phone: string
          role: string
          organization: string
          experience_level: string
          slot_id: string
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name: string
          email: string
          phone: string
          role: string
          organization: string
          experience_level: string
          slot_id: string
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string
          email?: string
          phone?: string
          role?: string
          organization?: string
          experience_level?: string
          slot_id?: string
          status?: string
        }
      }
      slots: {
        Row: {
          id: string
          session_title: string
          session_datetime: string
          max_capacity: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          session_title: string
          session_datetime: string
          max_capacity?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          session_title?: string
          session_datetime?: string
          max_capacity?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      get_public_slots: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          session_title: string
          session_datetime: string
          max_capacity: number
          seats_filled: number
          seats_remaining: number
          is_sold_out: boolean
        }[]
      }
      register_user_for_slot: {
        Args: {
          p_full_name: string
          p_email: string
          p_phone: string
          p_role: string
          p_organization: string
          p_experience_level: string
          p_slot_id: string
        }
        Returns: Json
      }
      get_admin_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
    }
  }
}
