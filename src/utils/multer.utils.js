import multer from 'multer';
import {fileURLToPath} from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//import path from'path'
//console.log(__dirname,' este es')
const otra_dirname = __filename.substring(0,__filename.length-21)
//console.log(otra_dirname,  "otra dirname");
const pathname = new URL('../', import.meta.url)

const path = pathname.pathname.slice(1, pathname.pathname.length)+'public/uploads'


 const storage = multer.diskStorage({
    destination: function(req, file, cb){
        //console.log(pathname.pathname+'public/uploads', 'estoy en multer')
        cb(null,`${otra_dirname}public/uploads` )
        //console.log(path);
    },
    filename: function(req, file, cb){
        // console.log('file: ',file);
        cb(null, `${Date.now()}-${file.originalname}`)
      
    }
}) 
 
const uploader = multer({
    storage,
    onError: function(err, next){
        console.log(err)    
        next()
    }
})


export default uploader
/*module.exports = {
     uploader
}*/