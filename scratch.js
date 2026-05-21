const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const targetDir = './src';

walkDir(targetDir, function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    // Skip LocalizedLink itself
    if (filePath.includes('LocalizedLink')) return;

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it imports next/link
    if (content.includes('next/link')) {
      // Replace import
      content = content.replace(/import\s+Link\s+from\s+['"]next\/link['"];?/g, 'import LocalizedLink from "@/components/LocalizedLink";');
      
      // Replace <Link> with <LocalizedLink>
      content = content.replace(/<Link(\s|>)/g, '<LocalizedLink$1');
      content = content.replace(/<\/Link>/g, '</LocalizedLink>');
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated:', filePath);
    }
  }
});
