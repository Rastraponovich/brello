import type { PostgrestError } from "@supabase/supabase-js";

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null;
          fisrt_name: string;
          id: string;
          last_name: string | null;
          updated_at: string | null;
          userId: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          fisrt_name: string;
          id?: string;
          last_name?: string | null;
          updated_at?: string | null;
          userId?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          fisrt_name?: string;
          id?: string;
          last_name?: string | null;
          updated_at?: string | null;
          userId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profiles_userId_fkey";
            columns: ["userId"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      workspaces: {
        Row: {
          data: Json | null;
          description: string | null;
          domain: string | null;
          id: number;
          inserted_at: string;
          name: string | null;
          updated_at: string;
        };
        Insert: {
          data?: Json | null;
          description?: string | null;
          domain?: string | null;
          id?: number;
          inserted_at?: string;
          name?: string | null;
          updated_at?: string;
        };
        Update: {
          data?: Json | null;
          description?: string | null;
          domain?: string | null;
          id?: number;
          inserted_at?: string;
          name?: string | null;
          updated_at?: string;
        };
        Relationships: [];
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

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> = Database["public"]["Enums"][T];
export type Views<T extends keyof Database["public"]["Views"]> = Database["public"]["Views"][T];

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never;
export type DbResultErr = PostgrestError;
