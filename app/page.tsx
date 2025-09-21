'use client';
import { useUser } from "@clerk/nextjs";
import React,{ useState ,useEffect } from "react";
import {insertData,selectData,deleteData} from './dbrelated'


const Home=()=>{
  const[records,setRecords]=useState<{id:number,city:string,temp:number,iconUrl:string}[]>([]);
   const { isSignedIn, user } = useUser()
  const[city,setCity]=useState("");
  const[msg,setMsg]=useState("");

  let email="";
  if(isSignedIn){
    email=user.emailAddresses[0].emailAddress;
  }

  useEffect(()=>{
  if(isSignedIn){
             const fetchData=async()=>{
              const res=await selectData(email);
              const arr=[];
               for(const row of res){
                         const c=row.city;
                         const URL=`https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=628472ab5d9e03f68262007eabc246cb&units=metric`;
                         const res=await fetch(URL);
           
             
                         const data =await res.json();
                         const temp=data.main.temp;
                         const icon=data.weather[0].icon;
                       //  console.log(data);

                         const iconUrl=`https://openweathermap.org/img/wn/${icon}@4x.png`;
                         const obj={id:row.id,city:c,temp,iconUrl};
                         console.log(obj);
                         arr.push(obj);
             
                                }     
                                setRecords(arr); 
                           }
              fetchData();
            }
        },[email,msg]);

   const handleAdd=()=>{
      insertData(email,city);
      setCity("");
      setMsg(""+Math.random());
  }

  const handleKeyDown=(e:React.KeyboardEvent<HTMLInputElement>)=>{
      if(e.key==="Enter"){
        handleAdd();
      }
  }

if(!isSignedIn){
  return<div className="text-5xl text-centre bg-red-500 text-white p-10 m-10">ACCESS DENIED</div>
}

const handleDel=(id:number)=>{
    deleteData(id);
    setMsg(""+Math.random());
}






//console.log(user.primaryEmailAddress?.emailAddress);

return(
  <>
      Hello,{user.fullName} <br/><br/>
      Email :{email} <br/><br/>
       Enter City :<input type="text" value={city} onKeyDown={handleKeyDown} onChange={(e)=>setCity(e.target.value)} className="border-1 border-solid p-1" />
       <input type="button" value="add" onClick={handleAdd} className="border-1 border-solid m-2 p-1 test-xl w-20" />
      <br/>
       {
        records.map((row,i)=>{return(
          
          <div key={i} className="box">
            <h3 className="text-3xl">{row.city}</h3>
            <p>
              {row.temp} <br/>
             <img src={row.iconUrl} alt={row.city} />

            </p>
             <p>
              <input type="button" className="bg-red-500 text-white-bold border-1 border-solid w-10 p-10" value={"X"+row.id} onClick={()=>handleDel(row.id)} />
             </p>


          </div>
        )})
       }
   </>
     );
}
export default Home;