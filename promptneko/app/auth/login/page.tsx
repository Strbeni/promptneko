import AuthPage from "../AuthPage";

export const metadata = {
  title: "Sign In — PromptNeko",
  description: "Sign in to your PromptNeko account.",
};

export default function LoginRoute() {
  return <AuthPage defaultMode="login" />;
}
