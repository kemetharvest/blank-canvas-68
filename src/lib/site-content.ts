import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const heroSlidesOptions = queryOptions({
  queryKey: ["site", "hero-slides"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");
    if (error) throw error;
    return data;
  },
});

export const newsItemsOptions = queryOptions({
  queryKey: ["site", "news-items"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("news_items")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return data;
  },
});

export const cardTabsOptions = queryOptions({
  queryKey: ["site", "card-tabs"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("card_tabs")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return data;
  },
});

export const loanTypesOptions = queryOptions({
  queryKey: ["site", "loan-types"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("loan_types")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return data;
  },
});

export const footerItemsOptions = queryOptions({
  queryKey: ["site", "footer-items"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("footer_items")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return data;
  },
});

export const savingsBannerOptions = queryOptions({
  queryKey: ["site", "savings-banner"],
  queryFn: async () => {
    const { data, error } = await supabase.from("savings_banner").select("*").limit(1);
    if (error) throw error;
    return data?.[0] ?? null;
  },
});

export const cardsOptions = queryOptions({
  queryKey: ["site", "cards"],
  queryFn: async () => {
    const [cards, benefits] = await Promise.all([
      supabase.from("cards").select("*").order("sort_order"),
      supabase.from("card_benefits").select("*").order("sort_order"),
    ]);
    if (cards.error) throw cards.error;
    if (benefits.error) throw benefits.error;
    return (cards.data ?? []).map((card) => ({
      ...card,
      benefits: (benefits.data ?? []).filter((benefit) => benefit.card_id === card.id),
    }));
  },
});

export const programsOptions = queryOptions({
  queryKey: ["site", "programs"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .order("sort_order");
    if (error) throw error;
    return data;
  },
});

export const siteTextsOptions = queryOptions({
  queryKey: ["site", "texts"],
  queryFn: async () => {
    const { data, error } = await supabase.from("site_texts").select("*");
    if (error) throw error;
    return (data ?? []).reduce<Record<string, string>>((texts, row) => {
      texts[row.key] = row.value;
      return texts;
    }, {});
  },
});
