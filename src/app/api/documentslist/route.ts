import { NextResponse } from 'next/server';
const pool = require('@/utils/postgresql');

export const config = { api: { bodyParser: false } };

export async function GET() {
  try {
    const result = await pool.query(
      'SELECT * FROM fullstacknextjs.upload'
    );

    const filenames = result.rows.map((row: {id:number, filename: string }) =>({id:row.id,filename:row.filename}));

    return NextResponse.json({data:filenames}, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
