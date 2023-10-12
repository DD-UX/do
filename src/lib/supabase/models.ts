export type Json = string | number | boolean | null | {[key: string]: Json | undefined} | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          content: string;
          created_at: string;
          end_datetime: string | null;
          id: string;
          start_datetime: string | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          content?: string;
          created_at?: string;
          end_datetime?: string | null;
          id?: string;
          start_datetime?: string | null;
          title?: string;
          updated_at?: string | null;
        };
        Update: {
          content?: string;
          created_at?: string;
          end_datetime?: string | null;
          id?: string;
          start_datetime?: string | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      task_statuses: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name?: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          assignee_id: string | null;
          content: string;
          created_at: string;
          id: string;
          project_id: string | null;
          status: string;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          assignee_id?: string | null;
          content?: string;
          created_at?: string;
          id?: string;
          project_id?: string | null;
          status?: string;
          title?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          assignee_id?: string | null;
          content?: string;
          created_at?: string;
          id?: string;
          project_id?: string | null;
          status?: string;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'tasks_project_id_fkey';
            columns: ['project_id'];
            referencedRelation: 'projects';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'tasks_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      users: {
        Row: {
          avatar_url: string;
          created_at: string;
          email: string;
          id: string;
          name: string;
          user_name: string;
          project_id?: string | null;
        };
        Insert: {
          avatar_url: string;
          created_at?: string;
          email?: string;
          id: string;
          name: string;
          user_name: string;
        };
        Update: {
          avatar_url?: string;
          created_at?: string;
          email?: string;
          id?: string;
          name?: string;
          user_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
