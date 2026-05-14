const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./app', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Remove import
    content = content.replace(/import\s+{\s*ActionDrawer\s*}\s+from\s+["'].*ActionDrawer["'];?\n?/g, '');
    
    // Remove usage <ActionDrawer ... />
    content = content.replace(/<ActionDrawer\s+[^>]*\/>\n?/g, '');
    
    // Also remove from MainPage.tsx which might have it split over lines
    content = content.replace(/<ActionDrawer[\s\S]*?\/>\n?/g, '');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Cleaned:', filePath);
    }
  }
});
