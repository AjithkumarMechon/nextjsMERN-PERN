import { NextResponse } from "next/server";
import { postgresConnect } from "@/utils/dbConnect"
const pool=require("@/utils/postgresql");


export async function GET(req: Request) {
  try {
    await postgresConnect();
    
    const existingUser = await pool.query(
      "SELECT * FROM fullstacknextjs.user WHERE role= $1",
      ['user']
    );

    if (!(existingUser.rows.length > 0)) {
      return NextResponse.json({ status: 200, data: [], message: "Data fetch successfully"});
    }
    // Selected field are allowed
   let dataField=existingUser.rows.map(({id, name, gender, dob, work, education}: any) => ({
        id:btoa(id), name, gender, dob, work, education
      }));
    return NextResponse.json({ status: 200, data: dataField, message: "Data fetch successfully"});
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ message: "Internal Server Error", error: (error as any)?.message }, { status: 500 });
  }
}
