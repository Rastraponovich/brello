export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      boards: {
        Row: {
          created_at: string;
          id: string;
          title: string | null;
          user_id: string | null;
          workspace_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          title?: string | null;
          user_id?: string | null;
          workspace_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          title?: string | null;
          user_id?: string | null;
          workspace_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "boards_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "boards_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          first_name: string;
          id: string;
          last_name: string | null;
          onboarded: boolean | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          first_name: string;
          id?: string;
          last_name?: string | null;
          onboarded?: boolean | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          first_name?: string;
          id?: string;
          last_name?: string | null;
          onboarded?: boolean | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      stacks: {
        Row: {
          board_id: string;
          created_at: string;
          id: string;
          title: string;
          user_id: string;
        };
        Insert: {
          board_id: string;
          created_at?: string;
          id?: string;
          title: string;
          user_id: string;
        };
        Update: {
          board_id?: string;
          created_at?: string;
          id?: string;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "stacks_board_id_fkey";
            columns: ["board_id"];
            isOneToOne: false;
            referencedRelation: "boards";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "stacks_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      tasks: {
        Row: {
          attachments: number | null;
          bages: number[] | null;
          created_at: string;
          description: string | null;
          id: string;
          stack_id: string | null;
          title: string | null;
          user_id: string | null;
          users: number[] | null;
        };
        Insert: {
          attachments?: number | null;
          bages?: number[] | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          stack_id?: string | null;
          title?: string | null;
          user_id?: string | null;
          users?: number[] | null;
        };
        Update: {
          attachments?: number | null;
          bages?: number[] | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          stack_id?: string | null;
          title?: string | null;
          user_id?: string | null;
          users?: number[] | null;
        };
        Relationships: [
          {
            foreignKeyName: "tasks_stack_id_fkey";
            columns: ["stack_id"];
            isOneToOne: false;
            referencedRelation: "stacks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tasks_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      workspaces: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          slug: string | null;
          user_id: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          slug?: string | null;
          user_id: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          slug?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workspaces_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database["public"]["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
