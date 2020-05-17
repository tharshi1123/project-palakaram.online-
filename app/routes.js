const mongoose = require('mongoose');
var host       = require('./models/host');


const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const fs = require('fs')

const mongodb = require('mongodb')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const binary = mongodb.Binary

MongoClient.connect("mongodb://kokulan97:03201997k@cluster0-shard-00-00-ln91r.mongodb.net:27017,cluster0-shard-00-01-ln91r.mongodb.net:27017,cluster0-shard-00-02-ln91r.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", function (err, client) {
  if (err) return console.log(err)
  db = client.db('Order')
  })
// app/routes.js
module.exports = function(app, passport) {
    // HOME PAGE (with login links) ========
    app.get('/', function(req, res) {
        res.render('index.ejs' , {
          user : req.user
        }); // load the index.ejs file
    });


    app.get('/in', function(req, res) {
        res.render('index0.ejs'); // load the index.ejs file
    });

    app.get('/in1', function(req, res) {
        res.render('index2.ejs'); // load the index.ejs file
    });

    app.get('/in2', function(req, res) {
        res.render('index3.ejs'); // load the index.ejs file
    });

    app.get('/notification', function(req, res) {
        res.render('notification.ejs'); // load the notification.ejs file
    });

    app.get('/notifications', function(req, res) {
        res.render('notifications.ejs'); // load the notification.ejs file
    });

    app.get('/in4', function(req, res) {
        res.render('index5.ejs'); // load the index.ejs file
    });
    app.get('/ceo', function(req, res) {
        res.render('admin.ejs'); // load the index.ejs file
    });

    ///////////////////////////////////// get data/////
    // app.get('/detailsArray/:id', function (req, res) {
    //     let id = req.params.id;
    //     axios.get('https://api.thetvdb.com/episodes/'+id)
    //         .then(response => {
    //             let data = response.data;
    //             console.log(data)
    //             res.send(JSON.stringify(data))
    //         })
    //         .catch(error => {
    //             let err = error;
    //             res.send(JSON.stringify(err))
    //         });
    // });

    // app.get('/getBikes', (req, res) => {
    //   host.find({}, function(err, result) {
    //     if(err) {
    //       res.send(err);
    //     } else {
    //      res.send(result)
    //     }
    //
    //
    //   });
    // });

    ////////////////////////////////////////////////////




    app.route('/order')

      .get(function (req, res) {
        const cursor = db.collection('prontuarios').find()
        res.render('cadastro.ejs')
      })

      .post(function (req, res) {
        db.collection('prontuarios').insertOne(req.body, function (err, result) {

          if (err) {
            return console.log(err)
          }
          console.log('Salvo no Banco de Dados')
          res.redirect('/notification')

        })
      })
      app.route('/co')

        .get(function (req, res) {
          db.collection('prontuarios').find().toArray((err, results) => {
            console.log(toString(results))
            if (err) {
              return console.log(err)
            }
            res.render('pacientes.ejs', { prontuarios: results })
          })
        })


          app.route('/show/:id')

            .get(function (req, res) {
              var id = req.params.id

              db.collection('users').find(ObjectId(id)).toArray(function (err, result) {

                if (err) {
                  return console.log(err)
                }

                db.collection('arquivos').find({ id_paciente: ObjectId(id) }).toArray(function (err, resulta) {

                  if (err) {
                    return console.log(err)
                  }

                  res.render('pacientes.ejs', { points: result, types: resulta });

                })
              })
            })



      app.route('/show/:id')

      .get(function (req, res) {
      var id = req.params.id

      db.collection('prontuarios').find(ObjectId(id)).toArray(function (err, result) {

        if (err) {
          return console.log(err)
        }

        db.collection('arquivos').find({ id_paciente: ObjectId(id) }).toArray(function (err, resulta) {

          if (err) {
            return console.log(err)
          }

          res.render('prontuario.ejs', { points: result, types: resulta });

        })
      })
      })

      app.route('/edit/:id')

      .get(function (req, res) {
      var id = req.params.id

      db.collection('prontuarios').find(ObjectId(id)).toArray(function (err, result) {

        if (err) {
          return console.log(err)
        }
        res.render('editProntuario.ejs', { prontuarios: result })
      })
      })

      .post(function (req, res) {
      var id = req.params.id
      var nome = req.body.nome
      var sobrenome = req.body.sobrenome
      var rg = req.body.rg
      var cpf = req.body.cpf
      var endereco = req.body.endereco

      db.collection('prontuarios').updateOne({ _id: ObjectId(id) }, {
        $set: {
          nome: nome,
          sobrenome: sobrenome,
          rg: rg,
          cpf: cpf,
          endereco: endereco,
        }
      }, function (err, result) {
        if (err) {
          return res.send(err)
        }
        res.redirect('/')
        console.log('Atualizado no Banco de Dados')
      })
      })

      app.route('/delete/:id')

      .get(function (req, res) {
      var id = req.params.id

      db.collection('prontuarios').deleteOne({ _id: ObjectId(id) }, function (err, result) {
        if (err) {
          return res.send(500, err)
        }
        console.log('Deletado do Banco de Dados!')

       //db.arquivos.deleteOne({ id_paciente:ObjectId("5dc1cdafceaab60e9c30f094") })
       db.collection('arquivos').deleteMany({ id_paciente:ObjectId(id) });

       console.log('Deletado do Arquivos!')
       res.redirect('/co')
      })
      })

      // Deletando exames(imagens) da collection arquivos
      app.route('/deleteImagem/:id')

      .get(function (req, res) {
      var id = req.params.id

      db.collection('arquivos').deleteOne({ _id: ObjectId(id) }, function (err, result) {
        if (err) {
          return res.send(500, err)
        }
        console.log('Deletado do Banco de Dados!')
        res.redirect('back')
      })
      })


      app.route('/upload/:id')

      .post(function (req, res) {

      var myobj = { nome_exame: req.body.name, id_paciente: ObjectId(req.params.id), imagem_exame: binary(req.files.uploadedFile.data) };
      db.collection('arquivos').insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
      });

      res.redirect('back')
      console.log('Atualizado no Banco de Dados')
      })

      app.route('/visualizar/:id')

      .get(function (req, res) {
      var id = req.params.id

      db.collection('arquivos').find({ _id: ObjectId(id) }).toArray((err, doc) => {

        let buffer = doc[0].imagem_exame.buffer // buffer da imagem -------- <Buffer ff d8 ff e0 00 10 4a.....>
        let nome = doc[0].nome_exame

        var s = binary(buffer); // Retorna um json binário (grid) -------- Binary { _bsontype: 'Binary', sub_type 0, position: 20905, buffer <Buffer ff d8 ff e0 00....}

        var a = JSON.stringify(s); // do json para string -------- "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAA.......4KP1P/2!=="

        var ret = a.replace('"',''); // (Só funciona com string), remove o " para renderizar a imagem  ----------- /9j/4AAQSk........

        var z = "<img src=\"data:image/gif;base64," + ret + "><br><h3>Nome do Exame: " + nome +"</h3>"; // Acopla na string de dados o formato base64 para renderizar a imagem em html

        console.log(s);

        res.send( z );
      })
    })


// hi

// hi


    app.route('/adminkokul')

      .get(function (req, res) {
        db.collection('kokul').find().toArray((err, results) => {
          console.log(toString(results))
          if (err) {
            return console.log(err)
          }
          res.render('pacientes1.ejs', { kokul: results })
        })
      })

  app.route('/NovoCadastro1')

    .get(function (req, res) {
      const cursor = db.collection('kokul').find()
      res.render('cadastro1.ejs')
    })

    .post(function (req, res) {
      db.collection('kokul').insertOne(req.body, function (err, result) {

        if (err) {
          return console.log(err)
        }
        console.log('Salvo no Banco de Dados')
        res.redirect('/')

      })
    })

  app.route('/show/:id')

    .get(function (req, res) {
      var id = req.params.id

      db.collection('kokul').find(ObjectId(id)).toArray(function (err, result) {

        if (err) {
          return console.log(err)
        }

        db.collection('arquivos').find({ id_paciente: ObjectId(id) }).toArray(function (err, resulta) {

          if (err) {
            return console.log(err)
          }

          res.render('prontuario.ejs', { points: result, types: resulta });

        })
      })
    })

  app.route('/edit/:id')

    .get(function (req, res) {
      var id = req.params.id

      db.collection('kokul').find(ObjectId(id)).toArray(function (err, result) {

        if (err) {
          return console.log(err)
        }
        res.render('editProntuario.ejs', { kokul: result })
      })
    })

    .post(function (req, res) {
      var id = req.params.id
      var nome = req.body.nome
      var sobrenome = req.body.sobrenome
      var rg = req.body.rg
      var cpf = req.body.cpf
      var endereco = req.body.endereco

      db.collection('kokul').updateOne({ _id: ObjectId(id) }, {
        $set: {
          nome: nome,
          sobrenome: sobrenome,
          rg: rg,
          cpf: cpf,
          endereco: endereco,
        }
      }, function (err, result) {
        if (err) {
          return res.send(err)
        }
        res.redirect('/adminkokul')
        console.log('Atualizado no Banco de Dados')
      })
    })

  app.route('/delete1/:id')

    .get(function (req, res) {
      var id = req.params.id

      db.collection('kokul').deleteOne({ _id: ObjectId(id) }, function (err, result) {
        if (err) {
          return res.send(500, err)
        }
        console.log('Deletado do Banco de Dados!')

       //db.arquivos.deleteOne({ id_paciente:ObjectId("5dc1cdafceaab60e9c30f094") })
       db.collection('arquivos').deleteMany({ id_paciente:ObjectId(id) });

       console.log('Deletado do Arquivos!')
       res.redirect('/adminkokul')
      })
    })

    // Deletando exames(imagens) da collection arquivos
    app.route('/deleteImagem/:id')

    .get(function (req, res) {
      var id = req.params.id

      db.collection('arquivos').deleteOne({ _id: ObjectId(id) }, function (err, result) {
        if (err) {
          return res.send(500, err)
        }
        console.log('Deletado do Banco de Dados!')
        res.redirect('back')
      })
    })


  app.route('/upload/:id')

    .post(function (req, res) {

      var myobj = { nome_exame: req.body.name, id_paciente: ObjectId(req.params.id), imagem_exame: binary(req.files.uploadedFile.data) };
      db.collection('arquivos').insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
      });

      res.redirect('back')
      console.log('Atualizado no Banco de Dados')
    })

  app.route('/visualizar/:id')

    .get(function (req, res) {
      var id = req.params.id

      db.collection('arquivos').find({ _id: ObjectId(id) }).toArray((err, doc) => {

        let buffer = doc[0].imagem_exame.buffer // buffer da imagem -------- <Buffer ff d8 ff e0 00 10 4a.....>
        let nome = doc[0].nome_exame

        var s = binary(buffer); // Retorna um json binário (grid) -------- Binary { _bsontype: 'Binary', sub_type 0, position: 20905, buffer <Buffer ff d8 ff e0 00....}

        var a = JSON.stringify(s); // do json para string -------- "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAA.......4KP1P/2!=="

        var ret = a.replace('"',''); // (Só funciona com string), remove o " para renderizar a imagem  ----------- /9j/4AAQSk........

        var z = "<img src=\"data:image/gif;base64," + ret + "><br><h3>Nome do Exame: " + nome +"</h3>"; // Acopla na string de dados o formato base64 para renderizar a imagem em html

        console.log(s);

        res.send( z );
       //res.status(204).render(z);

      })
    })
    app.get('/success',isLoggedIn, function(req, res) {
        res.render('success.ejs', {
          user : req.user
        });
     });

    app.get('/host', isLoggedIn, function(req, res) {
        res.render('host.ejs' ,{
          user : req.user
        }); // load the index.ejs file
    });

    app.get('/single', isLoggedIn, function(req, res) {
        res.render('single.ejs' ,{
          user : req.user
        }); // load the index.ejs file
    });

        app.get('/blog', function(req, res) {
            res.render('blog.ejs', {
              user : req.user
            });
            // load the index.ejs file
        });

        app.get('/shop-single', function(req, res) {
            res.render('shop-single.ejs', {
              user : req.user
            });
            // load the index.ejs file
        });


    app.get('/checkout', isLoggedIn, function(req, res) {
        res.render('checkout.ejs', {
            user : req.user // get the user out of session and pass to template
        });

    });
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });
    app.get('/booklogin', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('booklogin.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form





    app.post('/contact',function(req, res) {
      db.collection('contact.ejs').insertOne(function (err, result) { /*===================================================================*/

        if (err) {
          return console.log(err)
        }
        console.log('Salvo no Banco de Dados')
        res.redirect('/')

      })
    });






    // app.post('/login', do all our passport stuff here);
    // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        app.post('/car/login', passport.authenticate('local-login', {
            successRedirect : '/host', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));



//======================================================================================================================================
        app.get('/checkout', function(req, res) {
            res.render('checkout.ejs', { message: req.flash("aaa") });
        });

        // process the signup form
        // app.post('/signup', do all our passport stuff here);
            app.post('/checkout', passport.authenticate('local-checkout', {
                successRedirect : '/', // redirect to the secure profile section
                failureRedirect : '/checkout', // redirect back to the signup page if there is an error
                failureFlash : true // allow flash messages
            }));

//================================================================================================================================================

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
      // FACEBOOK ROUTES =====================
      // =====================================
      // route for facebook authentication and login
      app.get('/auth/facebook', passport.authenticate('facebook', {
        scope : ['public_profile', 'email']
      }));

      // handle the callback after facebook has authenticated the user
      app.get('/auth/facebook/callback',
          passport.authenticate('facebook', {
              successRedirect : '/index4',
              failureRedirect : '/login',
              failureFlash : true // allow flash messages
          }));

          // =====================================
        // GOOGLE ROUTES =======================
        // =====================================
        // send to google to do the authentication
        // profile gets us their basic information including their name
        // email gets their emails
        app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

        // the callback after google has authenticated the user
        app.get('/auth/google/callback',
                passport.authenticate('google', {
                        successRedirect : '/',
                        failureRedirect : '/login',
                        failureFlash : true // allow flash messages
                }));


                // =====================================
                // TWITTER ROUTES ======================
                // =====================================
                // route for twitter authentication and login
                app.get('/auth/twitter', passport.authenticate('twitter'));

                // handle the callback after twitter has authenticated the user
                app.get('/auth/twitter/callback',
                    passport.authenticate('twitter', {
                        successRedirect : '/',
                        failureRedirect : '/login',
                        failureFlash : true // allow flash messages
                    }));





        // =====================================
        // LOGOUT ==============================
        // =====================================
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });



    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    app.post('/host', function(req, res) {


      var newhost = new host();
      newhost.firstName = req.body.firstName;
      newhost.lastName = req.body.lastName;
      newhost.email = req.body.email;
      newhost.nic = req.body.nic;
      newhost.address = req.body.address;
      newhost.phonenumber = req.body.phonenumber;
      newhost.c_fname = req.body.c_fname;
      newhost.c_lname = req.body.c_lname;
      newhost.c_address = req.body.c_address;
      newhost.c_email_address = req.body.c_email_address;
      newhost.c_phone = req.body.c_phone;
      newhost.c_order_notes = req.body.c_order_notes;



          //send mail to us when order comes
                    var nodemailer = require('nodemailer');

                    var transporter = nodemailer.createTransport({
                     service: 'gmail',
                     auth: {
                            user: 'tkokulan97@gmail.com',
                            pass: 'kokulan97'
                        }
                    });
                    var user = req.user
                    var name = user.local.lastname
                    const mailOptions = {
                      from: 'tkokulan97@gmail.com',// sender address
                      to: 'tkokulan97@gmail.com', // list of receivers
                      subject: ' New Marunthu.Box Registration Details', // Subject line
                      html: '<div style="background-color:#eeeeef;padding:50px 0"><table style="width:540px" border="0" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="padding:40px 30px 30px 30px" align="center" bgcolor="#33333e"><h1 style="color:#fff">Team Marunthu.Box,<br>Register Successfully. </h1></td></tr><tr><td bgcolor="#ffffff" style="padding:40px 30px 40px 30px"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td width="260" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td>Hello ' + name + '! We got a Oder  from you. please check in your dashboard</td></tr><tr><td style="padding:10px 0 0 0">Two wheeler id: '+newhost.carId+  '</td></tr><tr><td style="padding:10px 0 0 0">First name: '+user.local.firstname+ '</td></tr><tr><td style="padding:10px 0 0 0">Last name: '+ user.local.lastname+ '</td></tr><tr><td style="padding:10px 0 0 0">Email: '+newhost.email+' </td> </tr><tr><td style="padding:10px 0 0 0">Phone number: '+newhost.phonenumber+ '</td></tr><tr><td style="padding:10px 0 0 0">Address: '+newhost.address+ '</td></tr><tr><td style="padding:10px 0 0 0">Nic/passport: '+newhost.nic+ '</td></tr><tr><td style="padding:10px 0 0 0">From this date: '+newhost.fdate+ '</td></tr><tr><td style="padding:10px 0 0 0">Until this date: ' +newhost.udate+ '</td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td align="center" bgcolor="#fff"><h3>Thank you<br/>Fernweh Team</h3></td></tr><tr><td style="background-color:#ffffff;padding:30px 30px 30px 30px"><table border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="font-family:Arial,sans-serif;font-size:14px">® Fernweh, 2019</td></tr></tbody></table></td></tr></tbody></table></div>' // plain text body
                    };
                    transporter.sendMail(mailOptions, function (err, info) {
                       if(err)
                         console.log(err)
                       else
                         console.log(info);
                    });


    	newhost.save(function(err,newhost){
    	    if(err){
            res.redirect('/host');
    	        console.log(err);
    	    }else{
            res.redirect('/success');
    	        console.log("Document Save Done");


                                    //send mail to customer
                                    var nodemailer = require('nodemailer');

                                    var transporter = nodemailer.createTransport({
                                     service: 'gmail',
                                     auth: {
                                            user: 'tkokulan97@gmail.com',
                                            pass: 'kokulan97'
                                        }
                                    });
                                    var user = req.user


                                    const mailOptions = {

                                      from: 'tkokulan97@gmail.com', // sender address
                                      to: user.local.email, // list of receivers
                                      subject: 'Marunthu.Box Registration Details', // Subject line
                                      html: '<div style="background-color:#eeeeef;padding:50px 0"><table style="width:540px" border="0" cellspacing="0" cellpadding="0" align="center"><tbody><tr><td style="padding:10px 30px 10px 30px" align="center" bgcolor="#33333e"><h1 style="color:#fff">Hi ' + user.local.lastname + ',</h1><h2 style="color:#fff">Your order has been placed successfully. We will contact you about the order as soon as possible. </h2></td></tr><tr><td bgcolor="#ffffff" style="padding:40px 30px 10px 30px"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td width="260" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td>This is a system generated email and please do not reply. For more information please contact to +94 76 025 3735 .</td></tr><h3 style="text-align:center;">  Order Deatils </h3><tr><td style="padding:10px 0 0 0">  </td></tr><tr><td style="padding:10px 0 0 0">First name: '+user.local.firstname+ '</td></tr><tr><td style="padding:10px 0 0 0">Last name: '+ user.local.lastname+ '</td></tr><tr><td style="padding:10px 0 0 0">Email: '+newhost.email+ '</td></tr><tr><td style="padding:10px 0 0 0">Phone number: '+newhost.phonenumber+ '</td></tr><tr><td style="padding:10px 0 0 0">Address: '+newhost.address+ '</td></tr><tr><td style="padding:10px 0 0 0">Nic/passport: '+newhost.nic+ '</td></tr><tr><td style="padding:10px 0 0 0">From this date: '+newhost.fdate+ '</td></tr><tr><td style="padding:10px 0 0 0">Until this date: ' +newhost.udate+ '</td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td align="center" bgcolor="#fff"><h3>Thank you<br/>Fernweh Team</h3></td></tr><tr><td style="background-color:#33333d;padding:20px 30px 20px 30px"><table border="0" width="100%" cellspacing="0" cellpadding="0"><tbody><tr><td style="font-family:Arial,sans-serif;font-size:14px;color:#fff">® Marunthu.Box, 2019</td></tr></tbody></table></td></tr></tbody></table></div>' // plain text body
                                    };
                                    transporter.sendMail(mailOptions, function (err, info) {
                                       if(err)
                                         console.log(err)
                                       else
                                         console.log(info);
                                    });  // load the index.ejs file


    	    }
    		});



          });


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
