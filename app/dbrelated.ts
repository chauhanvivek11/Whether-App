/*'use server';
import sql from "./db";
export const insertData=async(email:string,city:string)=>{
      await sql `insert into records(email,city)values(${email},${city})`;
      console.log("data is inserted ");
}
      */

"use server";
import supabase from "./db";

// Insert function
export const insertData = async (email: string, city: string) => {
  const { error } = await supabase.from("records").insert([{ email, city }]);

  if (error) {
    console.error("Insert error:", error);
  } else {
    console.log("Data inserted successfully!");
  }
};

// Select function
export const selectData = async (email: string) => {
  const { data, error } = await supabase
    .from("records")
    .select("city,id")       // sirf city column chahiye
    .eq("email", email);  // filter by email

  if (error) {
    console.error("Select error:", error);
    return [];
  }

  console.log("Fetched data:", data);
  return data || []; // ye ek array hoga, jisme matching rows aayengi
};


 export const deleteData = async (id: number) => {
  const { error } = await supabase
    .from("records")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete error:", error);
  } else {
    console.log(`Record with id=${id} deleted successfully!`);
  }
};