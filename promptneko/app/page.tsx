import MainPage from "./MainPage";
import { fetchAllActivePrompts } from "./actions/marketplace";

export default async function Page() {
  const allPrompts = await fetchAllActivePrompts();
  return <MainPage allPrompts={allPrompts} />;
}
