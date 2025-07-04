// fix-config-imports.js
import fs from 'fs';
import path from 'path';

const pluginsDir = './src/plugins';

function fixFile(filePath) {
    let code = fs.readFileSync(filePath, 'utf-8');
    
    const configImportRegex = /^import\s+config\s+from\s+['"].*config\.cjs['"];?\n?/gm;

    // Check and replace
    if (configImportRegex.test(code)) {
        code = code.replace(configImportRegex, ''); // remove config import
        code = code.replace(/\bconfig\./g, 'global.config.'); // replace all config. with global.config.
        
        fs.writeFileSync(filePath, code);
        console.log(`✅ Fixed: ${filePath}`);
    }
}

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (let file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walk(fullPath); // recursive
        } else if (file.endsWith('.js')) {
            fixFile(fullPath);
        }
    }
}

walk(pluginsDir);
console.log('🎉 All plugin config imports converted to global.config ✅');

