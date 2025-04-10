import { postgresConnect } from "@/utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";
const pool =require("@/utils/postgresql")

export async function GET(req: NextRequest, { params }: { params:any }) {
    let paramsId:string|undefined;
    try {
    await postgresConnect();
    let paramsId= atob(params?.id);
    const existingUser=await pool.query('SELECT * FROM fullstacknextjs.user WHERE "id"= $1', [paramsId]);
    if(!existingUser){
        return NextResponse.json({status:400, data: [], message:"data not found"}, {status:400})      
    }
    return NextResponse.json({status:200, data: existingUser?.rows, message:"fetch data sucessfully"}, {status:200})        
    } catch (error) {
        return NextResponse.json({status:500,data:paramsId, message: error??"Something went wrong!"}, {status:500})        
    }
  
}