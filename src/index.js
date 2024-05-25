import express from "express"; 
import path from 'path';
import multer from "multer";



const port = 8001; 
const app = express(); 

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null , "./uploads")
    }, 
    filename: function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        return cb(null , name);  
    }, 
})



app.set("view engine" , "ejs"); 

app.set('views', path.resolve("./src/views")); 

app.use(express.urlencoded({extended:false})); 

app.get("/", (req, res)=>{
    return res.render('homepage'); 
})
const upload = multer({ storage: storage })




app.post('/profile', upload.single('avatar'),  (req, res, next)=> {
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/"); 

  })

app.listen(port , ()=>{
    console.log(`server is running on http://localhost:${port}`);
})