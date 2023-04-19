import express, { Application, Request, Response } from "express";
require("@pnp/sp-commonjs/webs");
require("@pnp/sp-commonjs/items");
import { sp } from "@pnp/sp-commonjs";
import { SPFetchClient } from "@pnp/nodejs-commonjs";
import contactroute from "./routes/contactroute";
import cors from "cors";
const app: Application = express();
const port: number = 5000;
{
  /*app.get('/',(req:Request,res:Response)=>{
    res.send('hello worlddd')
})*/
}

const SpfxConnection = () => {
  sp.setup({
    sp: {
      fetchClientFactory: () =>
        new SPFetchClient(
          "https://2mxff3.sharepoint.com/sites/SharafathAli",

          "c1a145d5-ddc7-44f5-9e28-1cb4d2cfb0ca",

          "09ai02YfGc0PVK82TrY8nO+qVDfTz9eEo2orcDKwNiM="
        ),
    },
  });
};
SpfxConnection();
app.use(cors());

app.use("/get", contactroute);

app.listen(port, () => {
  console.log(`connected successfully on port ${port}`);
});
