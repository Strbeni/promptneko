import { CategoriesPage } from "../components/CategoriesPage";
import { fetchAllActivePrompts } from "../actions/marketplace";

export default async function Page() {
  const allPrompts = await fetchAllActivePrompts();
  return <CategoriesPage allPrompts={allPrompts} />;
}
