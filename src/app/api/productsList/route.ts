import { postgresConnect } from "@/utils/dbConnect";
import { NextResponse } from "next/server";
const pool=require("@/utils/postgresql");

export const GET=async()=>{
    try {
    await postgresConnect();
     let existingAllData = await pool.query(`SELECT * FROM fullstacknextjs."products"`);
  if (!(existingAllData.rows.length > 0)) {
    return NextResponse.json({message :"Products are empty"}, { status : 409 })
  }
    return NextResponse.json({ data:existingAllData?.rows, message: "Product registered successfully", status: 200 }, { status: 200 });
} catch (error) {
  console.error("❌ Registration Error:", error);  
  return NextResponse.json(
    { message: "Internal Server Error", error: error instanceof Error ? error.message : "Unknown error" },
    { status: 500 }
  );
}
}