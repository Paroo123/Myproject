const express = require('express');
const bodyParser = require('body-parser');
const mongoose =require('mongoose');
const feedback=require('./models/Feedback');

const app=express();
const port=3000;

mongoose.connect('mongodb://localhost:27017/coderone_feedback',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => console.log('MongoDB Connected'))
.catch(err=> console.error('MongoDB Connection ',err));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',(req, res) =>{
    res.sendFile(`${__dirname}/public/index.html`);
});

app.post ('submit-feedback', async(req , res)=>
{
    const feedback= new feedback ({
        name: req.body.name ,feedback:req.body.feedback,
        rating : req.body.rating

    });
    try { 
        await feedback.save();
        console.log ('feedback saved successfully');
        res.send (`
            <html>
            <><head>
                <title> Feedback Submitted </title></head><body>
                    <h1> Thank </h1>
                    <p> Your feedback has been submitted successfully. </p>
                    <a href ="/">Go Back to Form</a>
                </body>
                </html>`);
            } 
            catch (err) {
                console.error('Error saving feedback :' , err);
                res.status(500).send(' There was an error in submitting your feedback . ');
            }
            });
            app.listen(port, ()=>
            {
                console.log (` server is running on http://localhost:${port} `);
            })
            

            
            
            
            
            
            
            
            

