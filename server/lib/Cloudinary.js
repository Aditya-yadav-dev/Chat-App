import { v2 as cloudinary } from 'cloudinary';

// export async function Upload(filepath) {

//     try {
//          cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_NAME, 
//         api_key: process.env.CLOUDINARY_APIKEY, 
//         api_secret: process.env.CLOUDINARY_SECRETE 
//     });
//     if(!filepath) {
//         return null;
//     }
//      const uploadResult = await cloudinary.uploader.upload(filepath)
//      console.log(uploadResult);
//      return uploadResult

//     } catch (error) {
//         console.log(error);
//     }
    
// }

 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_APIKEY, 
        api_secret: process.env.CLOUDINARY_SECRETE 
    });

    export default cloudinary;