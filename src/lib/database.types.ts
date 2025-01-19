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
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
        }
      }
      comments: {
        Row: {
          id: string
          user_id: string
          property_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          property_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          property_id?: string
          content?: string
          created_at?: string
        }
      }
      ratings: {
        Row: {
          id: string
          user_id: string
          property_id: string
          rating: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          property_id: string
          rating: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          property_id?: string
          rating?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}