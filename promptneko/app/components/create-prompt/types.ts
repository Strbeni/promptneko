export type VariableType = 'text' | 'textarea' | 'select' | 'multi_select' | 'number' | 'boolean';

export type Variable = {
  name: string;
  displayName: string;
  description: string;
  type: VariableType;
  defaultValue: string;
  required: boolean;
  options: string[]; // comma separated or array, let's use string array
  min?: number;
  max?: number;
  maxLength?: number;
};

export type Example = {
  id: string;
  input: Record<string, string>;
  output: string;
};

export type PromptFormState = {
  content: string;
  variables: Variable[];
  metadata: {
    title: string;
    shortDescription: string;
    longDescription: string;
    category: string;
    subcategory: string;
    modelCompatibility: string[];
    primaryModel: string;
    tags: string[];
    language: string;
    nsfw: boolean;
  };
  examples: Example[];
  media: string[];
  pricing: {
    type: 'free' | 'one-time' | 'subscription';
    price: number;
  };
};
