const {cloudName , apiKey, apiSecret} = process.env;
const {Base64} = require('js-base64');
const cloudinary = require('cloudinary').v2
 


cloudinary.config({
    
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    
})


const upload = async(image,mimetype) => {
    try{
        const bas64FormattedString1 = Base64.encode(image)
        const uploadResult1 = await cloudinary.uploader.upload(`data:${mimetype};base64,${bas64FormattedString1}`)
        console.log(uploadResult1)
        return uploadResult1.url
    }catch(err){
        console.log(err)
        
    }

}

module.exports= upload