import { SignedIn, SignedOut, SignInButton, SignUpButton , UserButton } from "@clerk/nextjs";
import Link from "next/link";

const MenueBar=()=>{
    return(
        <>
            <Link href="/">Home</Link>  &nbsp;&nbsp;&nbsp;
             <Link href="/about">About</Link>&nbsp;&nbsp;&nbsp;
              <Link href="/contact">Contact</Link>&nbsp;&nbsp;&nbsp;
               <UserButton ></UserButton>
               <SignedOut>&nbsp;&nbsp;&nbsp;
              <SignInButton  mode="modal" />&nbsp;&nbsp;&nbsp;
              <SignUpButton  mode="modal">&nbsp;&nbsp;&nbsp;

                  Create User
              </SignUpButton>
            </SignedOut>
            <SignedIn></SignedIn>
        </>
    );
}
export default MenueBar;