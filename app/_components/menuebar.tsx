import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const MenueBar = () => {
    return (
        <div className="flex items-center gap-6">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium">Home</Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium">About</Link>
            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium">Contact</Link>
            
            <SignedIn>
                <UserButton />
            </SignedIn>
            
            <SignedOut>
              <SignInButton mode="modal">
                 <button className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium">
                    Sign In
                 </button>
              </SignInButton>
              <SignUpButton mode="modal">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                      Sign Up
                  </button>
              </SignUpButton>
            </SignedOut>
        </div>
    );
}
export default MenueBar;