"use client";
import { Button } from "@/components/ui/button";
import { useJoinWorkspace } from "@/features/workspaces/api/join-workspace";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import VerificationInput from "react-verification-input";
import { toast } from "sonner";

// interface JoinPageProps {
//   params: {
//     workspaceId: Id<"workspaces">;
//   };
// }
const JoinWorkspace = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter()
   const {data, isLoading} = useGetWorkspaceInfo({id:workspaceId});
   const {mutate,isPending} = useJoinWorkspace();
  // if the user is part of workspace not go back to join page
  const isMember = useMemo(() => data?.isMember, [data?.isMember]);
   useEffect(() =>{
    if(isMember){
      router.push(`/workspace/${workspaceId}`)
     }
   },[isMember,router,workspaceId])
   const handleCompleteInput = (value:string) =>{
    mutate({workspaceId,joinCode:value},{
      onSuccess:(id) => {
        router.replace(`/workspace/${id}`)
        toast.success("Workspace joined")
      },
      onError:() =>{
        toast.error("Failed to join workspace")
      }
    })
   }
    if(isLoading){
      return (
        <div className="h-full flex items-center justify-center">
          <Loader className="size-6 animate-spin text-muted-foreground"/>
        </div>
      )
    }
  return (
    <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-sm">
      <Image
        className="text-rose-700"
        src="/hashtag.svg"
        width={60}
        height={60}
        alt="logo"
      />
      <div className="flex flex-col gap-y-4 items-center justify-center max-w-md">
        <div className=" flex flex-col gap-y-2 items-center justify-center">
        <h1 className="text-2xl font-bold">Join {data?.name}</h1>
        <p className="text-md text-muted-foreground">
            Enter the workspace code to join
        </p>
        </div>
        <VerificationInput 
        onComplete={handleCompleteInput}
        length={6}
         classNames={{
          container:"flex gap-x-2",
          character:"uppercase h-auto rounded-md border border-gray flex items-center justify-center text-lg font-medium text-gray-500",

          
        }}
        autoFocus
        />
      </div>
      <div className="flex gap-x-4">
        <Button size="lg" variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};
export default JoinWorkspace;
