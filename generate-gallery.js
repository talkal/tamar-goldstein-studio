const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'Assets');
const outputFile = path.join(__dirname, 'js', 'gallery-data.js');

// Folders to ignore
const ignore = ['.DS_Store', 'Thumbs.db'];

function generateGalleryData() {
    if (!fs.existsSync(assetsDir)) {
        console.error('Assets directory not found');
        return;
    }

    const projects = [];
    const folders = fs.readdirSync(assetsDir).filter(f => 
        fs.statSync(path.join(assetsDir, f)).isDirectory() && !ignore.includes(f)
    );

    folders.forEach(folder => {
        const folderPath = path.join(assetsDir, folder);
        const images = fs.readdirSync(folderPath).filter(f => 
            /\.(jpg|jpeg|png|webp|gif)$/i.test(f) && !ignore.includes(f)
        );

        if (images.length > 0) {
            projects.push({
                name: folder,
                folder: folder,
                images: images
            });
        }
    });

    const content = `// Auto-generated gallery data - Do not edit manually\nconst galleryData = ${JSON.stringify(projects, null, 4)};`;
    
    fs.writeFileSync(outputFile, content);
    console.log(`Successfully generated gallery data for ${projects.length} projects.`);
}

generateGalleryData();
