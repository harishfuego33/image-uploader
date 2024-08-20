//importing the modules
const express = require("express");
const app = express();
const multer = require("multer");
const dotenv = require("dotenv");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

dotenv.config();

//using the modules
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const prisma = new PrismaClient();
const whiteList = ["http://localhost:5173", "http://localhost:3000/api/posts"];

const corsOptions = {
  origin: (origin, callBack) => {
    if (whiteList.indexOf(origin) !== -1) {
      callBack(null, true);
    } else {
      callBack(new Error("Not allowed by cors"));
    }
  },
};
//MIDDLE WARES
app.use(express.json());
app.use(cors(corsOptions));

//env.file
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

//create a s3 object to get all credentials
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});
// GET POST
app.get("/", async (req, res) => {
  res.json({
    status: "success",
    message: "server is running successfully",
  });
});
app.get("/api/products", async (req, res) => {
  const posts = await prisma.product.findMany();
  for (const ele of posts) {
    const getObjectParams = {
      Bucket: bucketName,
      Key: ele.imageUrl,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    ele.imageUrl = url;
  }
  res.json({
    status: "success",
    results: posts.length,
    data: posts,
  });
});
// CREATE POST
app.post("/api/posts", upload.single("image"), async (req, res) => {
  // console.log(req.body);
  // console.log(req.file);
  const { title, cost, quantity, description } = req.body;
  const imagName = Date.now() + "." + req.file.originalname.split(" ").join("");
  const params = {
    Bucket: bucketName,
    Key: imagName,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };
  const command = new PutObjectCommand(params);
  try {
    await s3.send(command);
    const post = await prisma.product.create({
      data: {
        title: title,
        cost: Number(cost),
        quantity: Number(quantity),
        description: description,
        imageUrl: imagName,
      },
    });
    console.log("inserted into database is successful");
    res.status(201).send(post);
  } catch (err) {
    if (err.code === "P2002")
      res.send({
        status: "failed ",
        message: "The product is already exited in db",
      });
  }
});

app.delete("api/post/:id", async (req, res) => {
  res.send({});
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`app is running successfully on localhost:${PORT}`);
});
