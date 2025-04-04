import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";
interface SignUpCardProps{
    setState: (state: SignInFlow) => void;
}
const SignUpCard = ({ setState }: SignUpCardProps) => {
  const {signIn} =useAuthActions()
    const[name,setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
   const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
   const handleSinginWithPassword = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     if (password !== confirmPassword) {
       setError("Password MisMatched");
       return;
     }
     setPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
    
       .catch(() => {
         setError("Invalid Email or Password");
       })
       .finally(() => {
         setPending(false);
         setEmail("");
         setPassword("");
         setConfirmPassword("");
         
       });
   };
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Signup to Continue</CardTitle>
        <CardDescription>
          Use your email or anoter service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert size={25} />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={handleSinginWithPassword} className="space-y-2.5">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            disabled={false}
            required
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled={false}
            required
          />
          <Input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={false}
            required
          />
          <Input
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            disabled={false}
            required
          />
          <Button
            type="submit"
            disabled={false}
            className="w-full cursor-pointer"
            size="lg"
            variant="default"
          >
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            className="w-full relative cursor-pointer"
            size="lg"
            variant="outline"
          >
            <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
            Continue with Google
          </Button>
          <Button
            className="w-full relative cursor-pointer"
            size="lg"
            variant="outline"
          >
            <FaGithub className="size-5 absolute top-2.5 left-2.5" />
            Continue with Github
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <span
            onClick={() => setState("signIn")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            SignIn
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
