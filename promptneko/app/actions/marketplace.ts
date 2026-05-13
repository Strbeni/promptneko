"use server";

import { getPrompts } from "../../lib/queries";
import { dbPromptsToDetailedPrompts } from "../../lib/adapters";
import { promptCards } from "../components/marketplace-data";

export async function fetchAllActivePrompts() {
  try {
    const rawPrompts = await getPrompts({ limit: 100 });
    const dynamicPrompts = dbPromptsToDetailedPrompts(rawPrompts);
    return [...dynamicPrompts, ...promptCards];
  } catch (err) {
    console.error("Error fetching marketplace prompts:", err);
    return promptCards;
  }
}
