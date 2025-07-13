 Day -1
 ---
 🔧 Backend Setup
🛠️ First, I set up the backend using Node.js and Express.js.

🗄️ For database, I connected MongoDB using Mongoose.
I also created a .env file to store the MongoDB connection URL securely.
🔗 Mongoose: https://mongoosejs.com/

📁 I followed the MVC (Model-View-Controller) pattern to keep the project clean and organized:

📄 Models folder for MongoDB schemas.

🧠 Controllers folder for main logic like login and signup.

🔗 Routes folder to define all API endpoints.

🔐 For authentication:

I created Login and Signup APIs using Express.

All requests from frontend are sent using the Axios library, and responses are handled properly.
🔗 Axios: https://axios-http.com/docs/intro

🔐 I used bcryptjs to securely hash the user passwords before storing them in the database.
This helps protect user credentials and enhances the security of the authentication system.
👉 Bcryptjs: https://www.npmjs.com/package/bcryptjs

Day -2
---

## ⚙️ Backend Overview (Node.js + Express)

### 📤 File Upload:
Used [`multer`](https://www.npmjs.com/package/multer) for handling incoming image files, and [`cloudinary`](https://www.npmjs.com/package/cloudinary) for storing them securely in the cloud.

### ➕ Add Product API:
- Created an `addProduct` API to handle form data.
- After uploading the image to Cloudinary, the full product details (name, description, price, category, image URL) are saved in **MongoDB** using [`mongoose`](https://www.npmjs.com/package/mongoose).

### 📦 Fetch All Products:
- Developed an `allProducts` API to fetch and send back all stored product listings to the frontend.

### 🔧 Technologies Used:
- **Node.js** & **Express.js** – Backend framework
- **Multer** – For file handling [`→ link`](https://www.npmjs.com/package/multer)
- **Cloudinary** – Image cloud storage [`→ link`](https://cloudinary.com/)
- **Mongoose** – MongoDB object modeling tool [`→ link`](https://mongoosejs.com/)
- **dotenv** – To manage environment variables securely [`→ link`](https://www.npmjs.com/package/dotenv)

🗂️ All code is modular — routes, controllers, models are structured for scalability and clean management.

---

Day 3 
---

## ❤️ Wishlist (Liked Products) Feature

Implemented **Liked Products** feature using MongoDB `ObjectId` reference between `User` and `Product` models.

---

### 🏗️ Schema Update

User schema updated with a new field:

```js
likedproducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }]
```

- This allows users to like multiple products.
- Stored as an array of ObjectIDs referencing the `Product` model.

---

### 🔄 Like Product API

**Endpoint**: `/liked-products`  
**Method**: `POST`

Logic:

```js
await User.updateOne(
  { _id: decode.user },
  { $addToSet: { likedproducts: productId } }
);
```

- 🔁 `$addToSet` is used instead of `$push` to avoid duplicate entries in the array.

---

### 📅 Get Liked Products API

**Endpoint**: `/get-liked-products`  
**Method**: `POST`

- Uses `.populate("likedproducts")` to fetch full product details based on savedbject OIDs in user's `likedproducts` array.

```js
const user = await User.findById(decode.user).populate("likedproducts");
```

- This returns detailed info of each liked product.

---

Day - 4 
---

## 🔙 Backend: Get Single Product Details

Implemented backend API to fetch **individual product details** using dynamic routing and MongoDB.

---

### 🔗 Route Setup

**API Endpoint**:

```http
GET /product/:id


--- 

Day 5

---

## adding addition schema in user Signup Route like this 

const schema  = mongoose.Schema({

       username : {type : String , require : true }  , 
       password : {type : String , require : true} ,
       email  : {type : String , require : true}  ,
       mobile : {type : String , require  :true} ,
       createdAt : { type : Date , default : Date.now} , 
       likedproducts : [{type: mongoose.Schema.Types.ObjectId , ref: "product" }]  
       
})



export  const User = mongoose.model("users" ,  schema) ;

---