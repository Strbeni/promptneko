export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          username: string;
          display_name: string;
          avatar_url: string | null;
          bio: string | null;
          role: 'buyer' | 'creator' | 'admin';
          is_email_verified: boolean;
          is_creator_approved: boolean;
          stripe_customer_id: string | null;
          created_at: string;
          updated_at: string;
          last_active_at: string | null;
          is_banned: boolean;
          ban_reason: string | null;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      creator_profiles: {
        Row: {
          id: string;
          user_id: string;
          tagline: string | null;
          website_url: string | null;
          twitter_handle: string | null;
          github_handle: string | null;
          specializations: string[];
          total_prompts_published: number;
          total_sales_count: number;
          total_revenue_cents: number;
          avg_rating: number;
          avg_response_time_hours: number | null;
          certification_level: 'none' | 'basic' | 'pro' | 'expert' | 'verified_pro';
          is_featured: boolean;
          stripe_connect_account_id: string | null;
          stripe_connect_onboarded: boolean;
          payout_schedule: 'weekly' | 'biweekly' | 'monthly';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['creator_profiles']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['creator_profiles']['Insert']>;
      };
      categories: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          icon_name: string | null;
          parent_category_id: string | null;
          sort_order: number;
          prompt_count: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'created_at' | 'prompt_count'>;
        Update: Partial<Database['public']['Tables']['categories']['Insert']>;
      };
      prompts: {
        Row: {
          id: string;
          creator_id: string;
          title: string;
          slug: string;
          short_description: string;
          long_description: string | null;
          content: string;
          category_id: string | null;
          subcategory_id: string | null;
          model_compatibility: string[];
          primary_model: string | null;
          price_cents: number;
          pricing_type: 'free' | 'one_time' | 'subscription_only' | 'api_per_use';
          status: 'draft' | 'pending_review' | 'active' | 'rejected' | 'deprecated' | 'needs_update';
          rejection_reason: string | null;
          is_featured: boolean;
          is_staff_pick: boolean;
          is_nsfw: boolean;
          needs_update_warning: boolean;
          language: string;
          supported_languages: string[];
          view_count: number;
          purchase_count: number;
          fork_count: number;
          avg_rating: number;
          review_count: number;
          tags: string[];
          version: string;
          parent_prompt_id: string | null;
          fork_depth: number;
          use_cases: string[];
          expected_output_description: string | null;
          example_input: Json | null;
          example_output: string | null;
          created_at: string;
          updated_at: string;
          published_at: string | null;
          // joined fields
          creator?: Database['public']['Tables']['users']['Row'];
          category?: Database['public']['Tables']['categories']['Row'];
          prompt_assets?: Database['public']['Tables']['prompt_assets']['Row'][];
          prompt_variables?: Database['public']['Tables']['prompt_variables']['Row'][];
        };
        Insert: Omit<Database['public']['Tables']['prompts']['Row'], 'id' | 'created_at' | 'updated_at' | 'creator' | 'category' | 'prompt_assets' | 'prompt_variables' | 'view_count' | 'purchase_count' | 'fork_count' | 'avg_rating' | 'review_count' | 'fork_depth'>;
        Update: Partial<Database['public']['Tables']['prompts']['Insert']>;
      };
      prompt_assets: {
        Row: {
          id: string;
          prompt_id: string;
          url: string;
          type: 'image' | 'video';
          width: number | null;
          height: number | null;
          is_primary: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['prompt_assets']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['prompt_assets']['Insert']>;
      };
      prompt_variables: {
        Row: {
          id: string;
          prompt_id: string;
          name: string;
          placeholder_key: string;
          description: string | null;
          variable_type: 'text' | 'textarea' | 'select' | 'number' | 'boolean' | 'multi_select' | 'date' | 'url' | 'color';
          default_value: string | null;
          options: Json | null;
          validation_rules: Json | null;
          is_required: boolean;
          is_advanced: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['prompt_variables']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['prompt_variables']['Insert']>;
      };
      reviews: {
        Row: {
          id: string;
          reviewer_id: string;
          prompt_id: string;
          purchase_id: string;
          rating: number;
          title: string | null;
          content: string | null;
          model_used: string | null;
          use_case_tried: string | null;
          would_recommend: boolean | null;
          is_verified_purchase: boolean;
          is_hidden: boolean;
          helpful_count: number;
          not_helpful_count: number;
          creator_reply: string | null;
          creator_replied_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'id' | 'created_at' | 'updated_at' | 'helpful_count' | 'not_helpful_count'>;
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>;
      };
      purchases: {
        Row: {
          id: string;
          buyer_id: string;
          prompt_id: string;
          prompt_version_at_purchase: string;
          amount_paid_cents: number;
          platform_fee_cents: number;
          creator_earnings_cents: number;
          currency: string;
          payment_method: 'stripe' | 'crypto';
          stripe_payment_intent_id: string | null;
          stripe_session_id: string | null;
          crypto_tx_hash: string | null;
          status: 'pending' | 'completed' | 'refunded' | 'disputed' | 'chargeback';
          refund_reason: string | null;
          refunded_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['purchases']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['purchases']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};

// ── Convenience aliases ────────────────────────────────────────────────
export type DbPrompt = Database['public']['Tables']['prompts']['Row'];
export type DbUser = Database['public']['Tables']['users']['Row'];
export type DbCategory = Database['public']['Tables']['categories']['Row'];
export type DbPromptAsset = Database['public']['Tables']['prompt_assets']['Row'];
export type DbPromptVariable = Database['public']['Tables']['prompt_variables']['Row'];
export type DbReview = Database['public']['Tables']['reviews']['Row'];
export type DbPurchase = Database['public']['Tables']['purchases']['Row'];
