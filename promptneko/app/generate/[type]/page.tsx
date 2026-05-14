import { GeneratePage } from "../../components/GeneratePage";

export function generateMetadata({ params }: { params: { type: string } }) {
  const typeStr = params.type === "image" ? "Image" : params.type === "video" ? "Video" : "Music";
  return {
    title: `${typeStr} Studio Sandbox | PromptNeko`,
    description: `Test structured variables and rendering tokens live inside an isolated engine telemetry sandbox.`,
  };
}

export default function Page({ params }: { params: { type: string } }) {
  return <GeneratePage type={params.type} />;
}
