/*import postgres from 'postgres'

const sql=postgres({
  host                 : 'db.scuorswmlqgjpnrkblao.supabase.co',            // Postgres ip address[s] or domain name[s]
  port                 : 5432,          // Postgres server port[s]
  database             : 'postgres',            // Name of database to connect to
  username             : 'postgres',            // Username of database user
  password             : 'TestPass@25',            // Password of database user
   
});
export default sql;
*/
// db.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default supabase;
