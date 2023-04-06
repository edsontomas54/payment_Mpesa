const express = require("express");
const cors = require("cors");
const path = require("path");
const { Client } = require("@paymentsds/mpesa");
const { json } = require("express");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/views/index.html"));
});

const client = new Client({
  apiKey:'wmx1fvjg5u9advt5uv49cvoay6xatzuz', // API Key
  publicKey: 'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmptSWqV7cGUUJJhUBxsMLonux24u+FoTlrb+4Kgc6092JIszmI1QUoMohaDDXSVueXx6IXwYGsjjWY32HGXj1iQhkALXfObJ4DqXn5h6E8y5/xQYNAyd5bpN5Z8r892B6toGzZQVB7qtebH4apDjmvTi5FGZVjVYxalyyQkj4uQbbRQjgCkubSi45Xl4CGtLqZztsKssWz3mcKncgTnq3DHGYYEYiKq0xIj100LGbnvNz20Sgqmw/cH+Bua4GJsWYLEqf/h/yiMgiBbxFxsnwZl0im5vXDlwKPw+QnO2fscDhxZFAwV06bgG0oEoWm9FnjMsfvwm0rUNYFlZ+TOtCEhmhtFp+Tsx9jPCuOd5h2emGdSKD8A6jtwhNa7oQ8RtLEEqwAn44orENa1ibOkxMiiiFpmmJkwgZPOG/zMCjXIrrhDWTDUOZaPx/lEQoInJoE2i43VN/HTGCCw8dKQAwg0jsEXau5ixD0GUothqvuX3B9taoeoFAIvUPEq35YulprMM7ThdKodSHvhnwKG82dCsodRwY428kg2xM/UjiTENog4B6zzZfPhMxFlOSFX4MnrqkAS+8Jamhy1GgoHkEMrsT5+/ofjCx0HjKbT5NuA2V/lmzgJLl3jIERadLzuTYnKGWxVJcGLkWXlEPYLbiaKzbJb2sYxt+Kt5OxQqC1MCAwEAAQ==', // Public Key
  serviceProviderCode:'171717', // input_ServiceProviderCode
});

app.post("/", async (req, res) => {
  const celular = req.body.celular;
  const amount = req.body.valor;
  const reference = req.body.reference;

  const paymentData = {
    from: celular, // input_CustomerMSISDN
    reference: `2D${reference}`, // input_ThirdPartyReference
    transaction: "T12344CC", // input_TransactionReference
    amount: amount, // input_Amount
  };

  // await

  return client
  .receive(paymentData)
  .then((r) => {
    console.log('success' , r);
    res.status(201).json(r);
  })
    .catch((e) => {
      console.error('Error:', e);
      res.status(500).send('Something went wrong.');
    });
});

// if (process.env.NODE_ENV === "production") {
//   /** Set the static folder */

//   app.use(express.static("public"));
//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "public", "views", "index.html"))
//   );
// }

const PORT = process.env.PORT || 8080;
console.log(PORT);
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
