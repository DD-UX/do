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
      tasks: {
        Row: {
          assignee_id: string | null
          content: string
          created_at: string
          id: string
          title: string
          user_id: string
        }
        Insert: {
          assignee_id?: string | null
          content?: string
          created_at?: string
          id?: string
          title?: string
          user_id: string
        }
        Update: {
          assignee_id?: string | null
          content?: string
          created_at?: string
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string
          created_at: string
          email: string
          id: string
          name: string
          user_name: string
        }
        Insert: {
          avatar_url: string
          created_at?: string
          email?: string
          id: string
          name: string
          user_name: string
        }
        Update: {
          avatar_url?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
