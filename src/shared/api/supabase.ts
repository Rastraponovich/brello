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
