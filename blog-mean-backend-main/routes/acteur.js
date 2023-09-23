const express = require('express');

const router = express.Router();


const Acteur= require('../models/acteur');

const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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


router.post('/register' , upload.any('image') , (req, res)=>{

    data = req.body;
    acteur = new Acteur(data);

    acteur.image = filename;

    salt = bcrypt.genSaltSync(10);
    acteur.password = bcrypt.hashSync(data.password , salt);


    acteur.save()
        .then(
            (savedActeur)=>{
                filename = "";
                res.status(200).send(savedActeur);
            }
        )
        .catch(
            err=>{
                res.send(err)
            }
        )


})


router.post('/login' , (req, res)=>{
    
    let data = req.body;

    Acteur.findOne({email: data.email})
        .then(
            (acteur)=>{
                let valid = bcrypt.compareSync(data.password , acteur.password);
                if(!valid){
                    res.send('email or password invalid');
                }else{

                    let payload = {
                        _id: acteur._id,
                        email: acteur.email,
                        fullname: acteur.name + ' ' + acteur.lastname
                    }

                    let token = jwt.sign(payload , '123456789');

                    res.send({ myToken: token })

                }

            }


        )
        .catch(
            err=>{
                res.send(err);
            }
        )



})


router.get('/all' , (req, res)=>{
    
    Acteur.find({})
    .then(
        (acteurs)=>{
            res.status(200).send(acteurs);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )

})

router.get('/getbyid/:id' , (req, res)=>{
    let id = req.params.id

    Acteur.findOne({ _id: id })
    .then(
        (acteur)=>{
            res.status(200).send(acteur);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }
    )
})

router.delete('/supprimer/:id' , (req, res)=>{
    let id = req.params.id

    Acteur.findByIdAndDelete({_id: id})
        .then(
            (acteur)=>{
                res.status(200).send(acteur);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
})




module.exports = router;