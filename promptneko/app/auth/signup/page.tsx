import AuthPage from "../AuthPage";

export const metadata = {
  title: "Sign Up — PromptNeko",
  description: "Create your free PromptNeko account.",
};

export default function SignupRoute() {
  return <AuthPage defaultMode="signup" />;
}
