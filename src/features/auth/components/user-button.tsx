
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "./hooks/use-current-user";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

const UserButton = () => {
    const { data, isLoading } = useCurrentUser();
    const {signOut} = useAuthActions()
   
    
    if (isLoading) {
        return (
             <Loader className="size-4 animate-spin text-muted-foreground"/>
         )
    } 
    if (!data) {
        return null;
    }
    const { name, image } = data;
    const avatarFallback = name!.charAt(0).toUpperCase()
       return (
         <DropdownMenu modal={false}>
           <DropdownMenuTrigger className="outline-none relative">
             <Avatar className="size-10 hover:opacity-75 transition">
               <AvatarImage alt="name" src={image} />
               <AvatarFallback>{avatarFallback}</AvatarFallback>
             </Avatar>
           </DropdownMenuTrigger>
           <DropdownMenuContent align="center" side="right" className="w-60">
             <DropdownMenuItem onClick={() => signOut()} className="hover:cursor-pointer">
                       <LogOut className="size-4" />
                       Logout
             </DropdownMenuItem>
           </DropdownMenuContent>
         </DropdownMenu>
       );
};

export default UserButton;
