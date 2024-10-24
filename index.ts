import express from 'express';
import { PrismaClient } from '@prisma/client';

const app : express.Application = express();

const prisma : PrismaClient = new PrismaClient();

const portti : number = Number(process.env.PORT) || 3001;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.post("/", async (req : express.Request, res : express.Response) => {

    let hakusana : string = `${req.body.teksti}%`

    if(req.body.teksti != "") {

        let haku = await prisma.$queryRaw`Select * FROM kunta WHERE kunta LIKE ${hakusana} LIMIT 10`;

        res.render("index", {kunnat : haku})

    }else {
        res.send("Kirjoita hakukenttään ennen kuin haet!")
    }

});

app.get("/", async (req : express.Request, res : express.Response) => {

    let kunnat = await prisma.kunta.findMany();

    res.render("index", {kunnat : kunnat});

});

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi porttiin http://localhost:${portti}`)

})