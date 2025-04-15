"use client";
import { Button } from "@/components/ui/button";
// import AuthScreen from "@/features/auth/components/auth-screen";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthActions } from "@convex-dev/auth/react";
import UserButton from "@/features/auth/components/user-button";



export default function Home() {
  const {signOut} = useAuthActions()
  return (
    // <AuthScreen/>
    <div>
      <div>LOGINNNNN SCREENM</div>
      {/* <Button onClick={() => signOut()}>Logout</Button> */}
      <UserButton></UserButton>
      
    </div>
  );
}
