const  express = require('express');

const router = express.Router();

const Film = require('../models/film');

const multer = require('multer');

filename = '';
const mystorage = multer.diskStorage({

    destination: './uploads',
    filename: (req , file , redirect)=>{
        let date = Date.now();

        let fl = date + '.' + file.mimetype.split('/')[1];
       
        redirect(null , fl);
        filename = fl;
    }

})

const upload = multer({storage: mystorage})


router.post('/ajout', upload.any('image') , (req , res)=>{

    let data = req.body;
    let film = new Film(data);
    film.date = new Date();
    film.image = filename;
    film.tags = data.tags.split(',');

    film.save()
        .then(
            (saved)=>{
                filename = '';
                res.status(200).send(saved);
            }
        )
        .catch(
            err=>{
                res.status(400).send(err)
            }
        )


})

router.get('/all', (req , res)=>{

    Film.find({})
        .then(
            (Films)=>{
                res.status(200).send(Films);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )

    
})

router.get('/getbyid/:id', (req , res)=>{
    
    let id = req.params.id

    Film.findOne({ _id: id })
    .then(
        (Films)=>{
            res.status(200).send(Films);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )

})

router.get('/getbyidacteur/:id', (req , res)=>{

        
    let id = req.params.id

    Film.find({idActeur:id})
    .then(
        (films)=>{
            res.status(200).send(films);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
    
})

router.delete('/supprimer/:id', (req , res)=>{
    
    let id = req.params.id

    Film.findByIdAndDelete({_id: id})
        .then(
            (films)=>{
                res.status(200).send(films);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )

})

router.put('/update/:id', upload.any('image') , (req , res)=>{
    
    let id = req.params.id
    let data = req.body;
    data.tags = data.tags.split(',');

    if(filename.length > 0){
        data.image = filename;
    }


    Film.findByIdAndUpdate({ _id: id } , data )
        .then(
            (films)=>{
                filename = '';
                res.status(200).send(films);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )

 
})


module.exports = router;
