"use client";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useCurrentMember } from "@/features/members/api/use-current-member";
/*
i want to redicrect to to  the workspace/id/channel/id page
*/
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useStoreModal } from "@/hooks/use-modal-store";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const WorkspaceIdPage = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const {isOpen,onOpen,type} = useStoreModal();
const isModalOpen = isOpen && type === "createChannel";
const {data:workspace, isLoading:workspaceLoading} = useGetWorkspace({id:workspaceId});
const {data:channels, isLoading:channelsLoading} = useGetChannels({workspaceId});
const {data:member, isLoading:memberLoading} = useCurrentMember({workspaceId})


// get the first channel at index 0
const channelId = useMemo(() => channels?.[0]?._id,[channels]);
const isAdmin = useMemo(() => member?.role ==="admin", [member?.role])
 // if there is channel for workspace send the 
   useEffect(() =>{
   if(workspaceLoading || channelsLoading || !workspace || memberLoading || !member ) return;
     if(channelId){
      router.push(`/workspace/${workspaceId}/channel/${channelId}`)
     }else if(!isModalOpen && isAdmin){
      onOpen("createChannel")
     }
   },[isAdmin,memberLoading, member, channelId,workspaceLoading,channelsLoading,workspace,isModalOpen, onOpen])
  if(workspaceLoading || channelsLoading  || memberLoading){
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
      <Loader className="size-6 animate-spin text-muted-foreground"/>
      </div>
    )
  }
    
  if(!workspace || !member){
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
      <TriangleAlert className="size-6  text-muted-foreground"/>
      <span className="text-sm text-muted-foreground">
        Workspace not found
      </span>
      </div>
    )
  }

    
      return (
        <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
        <TriangleAlert className="size-6  text-muted-foreground"/>
        <span className="text-sm text-muted-foreground">
          No channel found
        </span>
        </div>
      )
    
}; 
 
export default WorkspaceIdPage;