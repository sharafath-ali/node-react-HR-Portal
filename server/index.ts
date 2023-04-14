const express = require("express");

const app = express();

const PORT = 5000;

require("@pnp/sp-commonjs/webs");

require("@pnp/sp-commonjs/items");

import { sp } from "@pnp/sp-commonjs";

import { SPFetchClient } from "@pnp/nodejs-commonjs";

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

const getAllItems = async () => {
  const response = await sp.web.lists.getByTitle("users").items.getAll();

  console.log(response);
};

getAllItems();

app.listen(5000, () =>
  console.log(`Server runing on port http://localhost:${PORT}"`)
);
