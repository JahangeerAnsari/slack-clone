import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthActions } from "@convex-dev/auth/react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";
import { TriangleAlert } from 'lucide-react';
import { useState } from "react";
interface SignInCardProps{
    setState: (state: SignInFlow) => void;
}
const SignInCard = ({ setState }: SignInCardProps) => {
  const {signIn} =useAuthActions()
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("")
 
  const handleProvider = (value:"github" |"google") => {
    signIn(value);
  }
  console.log("error",error);
  
  const handleSinginWithPassword = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setPending(true);
    signIn("password", { email, password, flow: "signIn" })
      .catch(() => {
      setError("Invalid Email or Password")
      }).finally(() => {
        setPending(false);
        setEmail("");
        setPassword("");
        
    })
  }
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to Continue</CardTitle>
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
            onClick={() => handleProvider("github")}
          >
            <FaGithub className="size-5 absolute top-2.5 left-2.5" />
            Continue with Github
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => setState("signUp")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Signup
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
