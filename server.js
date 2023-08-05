const http = require("http");
const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
let products = data.products;

const server = http.createServer((req, res) => {
  console.log("server started");

  // Extract HTTP method and URL path
  const { method, url } = req;

  if (url.startsWith("/product")) {
    if (method === "GET") {
      // Handle GET request for /product endpoint
      const id = url.split("/")[2];
      const product = products.find((p) => p.id === +id);
      console.log(product);

      res.setHeader("Content-Type", "text/html");
      let modifiedIndex = index
        .replace("**title**", product.title)
        .replace("**url**", product.thumbnail)
        .replace("**price**", product.price)
        .replace("**rating**", product.rating);

      res.end(modifiedIndex);
    } else if (method === "POST") {
      // Handle POST request for /product endpoint
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        try {
          const newProduct = JSON.parse(body);

          // Validate that the required fields are present in the request body
          const requiredFields = [
            "id",
            "title",
            "description",
            "price",
            "discountPercentage",
            "rating",
          ];
          for (const field of requiredFields) {
            if (!newProduct.hasOwnProperty(field)) {
              res.writeHead(400); // Bad Request
              res.end(
                JSON.stringify({ message: `Missing required field: ${field}.` })
              );
              return;
            }
          }

          // Add the new product to the products array
          products.push(newProduct);

          // Save the updated products array to the data.json file
          fs.writeFileSync("data.json", JSON.stringify({ products }), "utf-8");

          res.writeHead(201); // Created
          res.end(
            JSON.stringify({
              message: "Product added successfully.",
              product: newProduct,
            })
          );
        } catch (error) {
          console.error("Error parsing JSON:", error);
          res.writeHead(400); // Bad Request
          res.end(JSON.stringify({ message: "Invalid JSON data." }));
        }
      });
    } else {
      // Handle other HTTP methods for /product endpoint
      res.writeHead(405); // Method Not Allowed
      res.end();
    }
  } else {
    switch (url) {
      case "/":
        res.setHeader("Content-Type", "text/html");
        res.end(index);
        break;
      case "/api":
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
        break;
      default:
        res.writeHead(404);
        res.end();
    }
  }
});

server.listen(8000);
