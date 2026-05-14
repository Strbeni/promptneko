import { HistoryPage } from "../components/HistoryPage";
import { fetchAllActivePrompts } from "../actions/marketplace";

export const metadata = {
  title: "History | PromptNeko",
  description: "Review prompts you've recently viewed across your active workspace sessions.",
};

export default async function Page() {
  const allPrompts = await fetchAllActivePrompts();
  return <HistoryPage allPrompts={allPrompts} />;
}
