const fs = require('fs');
const path = './app/components/marketplace-data.ts';
let data = fs.readFileSync(path, 'utf8');

// Update DetailedPrompt interface
data = data.replace('content: {\n    text: string;\n    negativePrompt?: string;\n    version: string;\n  };', 'content: {\n    text: string;\n    negativePrompt?: string;\n    version: string;\n  };\n  promptToCopy?: string;');

// Add promptToCopy to objects
data = data.replace(/content: \{ text: \"([^\"]+)\", version: \"([^\"]+)\" \},/g, 'content: { text: \"$1\", version: \"$2\" }, promptToCopy: \"$1\",');

fs.writeFileSync(path, data);
