import * as express from 'express';
const app = express();
const PORT : string|number = process.env.PORT || 5000;

app.use("*",(req, res) =>{
  res.json({
    status: 200,
    message: 'Success run server ...',
  })
});

app.listen(PORT,() => console.log(`hosting @${PORT}`));
