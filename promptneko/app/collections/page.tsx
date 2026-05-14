import { CollectionsPage } from "../components/CollectionsPage";
import { fetchAllActivePrompts } from "../actions/marketplace";

export const metadata = {
  title: "Collections | PromptNeko",
  description: "Curated sets of prompts — discover community favourites or build your own.",
};

export default async function Page() {
  const allPrompts = await fetchAllActivePrompts();
  return <CollectionsPage allPrompts={allPrompts} />;
}
