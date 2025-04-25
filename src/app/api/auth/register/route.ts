import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Request } from 'express';
import { postgresConnect } from "@/utils/dbConnect";
const pool=require("@/utils/postgresql");

async function ensureTableExists() {
  await pool.query(`CREATE SCHEMA IF NOT EXISTS fullstacknextjs;`);
await pool.query(`CREATE TABLE IF NOT EXISTS fullstacknextjs."user" (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(255), 
    email VARCHAR(255) UNIQUE,
    name VARCHAR(255), 
    password VARCHAR(255),
    dob DATE,
    salary VARCHAR(255),
    work VARCHAR(255),
    weight VARCHAR(255),
    height VARCHAR(255),
    gender VARCHAR(255),
    education VARCHAR(255),
    mobile VARCHAR(255),
    role VARCHAR(255) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`);
}


interface UserBody { username: string; password: string; name: string; email: string|null; dob: Date | string; salary: number; work: string|null; weight: number;   height: number;    gender: string; education: string|null; mobile: string|null; role?: string; }
export async function POST(req: Request) {
try {
  await postgresConnect();
  await ensureTableExists();
  const body = await req.json(); 
  if (!body) {
    return NextResponse.json({ message: "Authentication failed" }, { status: 400 });
  }    

const { username, password, name, email,  dob, salary, work, weight, height, gender, education,  mobile,  role = 'user' }: UserBody =  body;



  // Check if user already exists
  let existingUser = await pool.query(
    `SELECT * FROM fullstacknextjs."user" WHERE email = $1 OR username = $2`,
    [email, username]
  );
  // let existingUser = await User.findOne({  $or: [{ username }, { email }] });
    if (existingUser.rows.length > 0) {
      return NextResponse.json({ message: "User already exists", status: 409 }, { status: 409 });
    }
  // Hash password with SHA-256
  // const sha256Hashed = crypto.createHash("sha256").update(password).digest("hex");
  const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // Create new user with the hashed password
await pool.query(
  `INSERT INTO fullstacknextjs.user (
    username, password, name, email, 
    dob, salary, work, weight, height, 
    gender, education, mobile, role
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
  RETURNING *`,
  [username, hashedPassword, name, email, dob, salary, work, weight, height, gender, education, mobile, role ]
);
  // const newUser = new User({ username, password: hashedPassword, email, dob });
  // await newUser.save();
  return NextResponse.json({ message: "User registered successfully", status: 201 }, { status: 201 });
} catch (error) {
  console.error("❌ Registration Error:", error);  
  return NextResponse.json(
    { message: "Internal Server Error", error: error instanceof Error ? error.message : "Unknown error" },
    { status: 500 }
  );
}
}
