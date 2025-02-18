import sharp from "sharp";
import path from 'path'
import fs from 'fs/promises'

export const optimazedImage = async (tempPath) => {
    const optimazedPath = path.join(process.cwd(), "public", "avatars", `${Date.now()}.webp`);
    await fs.mkdir(outputDir, { recursive: true });
   
    try {
      await sharp(tempPath)
        .resize({ width: 150, height: 150, fit: 'cover' }) 
        .webp({ quality: 80 }) 
        .toFile(optimazedPath);
  
      return optimazedPath; 
    } catch (error) {
      console.log(error);
     }
  };

