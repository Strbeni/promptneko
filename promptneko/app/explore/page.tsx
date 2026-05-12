import { ExplorePage } from "../components/ExplorePage";
import { fetchAllActivePrompts } from "../actions/marketplace";

export default async function Page() {
  const allPrompts = await fetchAllActivePrompts();
  return <ExplorePage allPrompts={allPrompts} />;
}
