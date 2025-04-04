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
interface SignUpCardProps{
    setState: (state: SignInFlow) => void;
}
const SignUpCard = ({ setState }: SignUpCardProps) => {
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Signup to Continue</CardTitle>
        <CardDescription>
          Use your email or anoter service to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Input
            type="text"
            value={""}
            //   onChange={(e) => setEmail(e.target.value)}
            placeholder="Name"
            disabled={false}
            required
          />
          <Input
            type="email"
            value={""}
            //   onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled={false}
            required
          />
          <Input
            type="text"
            value={""}
            //   onChange={(e) => setEmail(e.target.value)}
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
