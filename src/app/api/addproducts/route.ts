import { postgresConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
const pool=require("@/utils/postgresql");

async function ensureTableExists() {
    await pool.query(`CREATE TABLE IF NOT EXISTS fullstacknextjs."products" (
      id SERIAL PRIMARY KEY, 
      productname VARCHAR(255) UNIQUE,
      productimage JSONB, 
      price VARCHAR(255),
      actualprice VARCHAR(255),
      discount VARCHAR(255), 
      favorite VARCHAR(255),
      clientcount VARCHAR(255),
      rating VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);
}

export const POST=async(req:Request)=>{
    try {
    await postgresConnect();
    await ensureTableExists();
     const body = await req.json(); 
    if (!body) {
        return NextResponse.json({ message: "Authentication failed", status: 400 }, { status: 400 });
    } 
    const { productName, productImage, price, actualPrice, discount, favorite, clientCount, rating } = body;   
     let existingUser = await pool.query(
    `SELECT * FROM fullstacknextjs."products" WHERE productName = $1`,
    [productName]
  );

  if (existingUser.rows.length > 0) {
    return NextResponse.json({data:existingUser?.fields?.rows, message :"Same product Duplicate", status : 409 }, { status : 409 })
  }

  await pool.query(`INSERT INTO fullstacknextjs.products(productname, productimage, price, actualprice, discount, favorite, clientcount, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [productName, productImage, price, actualPrice, discount, favorite, clientCount, rating])
    return NextResponse.json({ message: "Product registered successfully", status: 201 }, { status: 201 });
} catch (error) {
  console.error("❌ Registration Error:", error);  
  return NextResponse.json(
    { message: "Internal Server Error", error: error instanceof Error ? error.message : "Unknown error",  status: 500  },
    { status: 500 }
  );
}
}

