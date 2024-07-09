import { NextRequest, NextResponse } from "next/server";
import { db } from "@vercel/postgres";
import { error } from "console";

export async function GET(request: NextRequest){
    const client = await db.connect();
    
    try{
        await client.sql`CREATE TABLE IF NOT EXISTS Todos(id serial, Task varchar(255))`
        const res = client.sql`SELECT * FROM todos`
        console.log(res)
        return NextResponse.json({data:  res})
    }catch(err){
        console.log(err)
        return NextResponse.json({message: "something went wrong"})
    }
}

export async function POST(request: NextRequest){
        const req = await request.json();

        try {
            if(req.task){
                const client = await db.connect();
                const res = await client.sql `INSERT INTO Todos(Task) VALUES (${req.task})`
                console.log(res)
                return NextResponse.json({message: "Data added successfully"})
            }
            else{
                throw new Error("Task is required")
            }
        } catch (error) {
            return NextResponse.json({message: (error as {message:string}).message})
        }
}