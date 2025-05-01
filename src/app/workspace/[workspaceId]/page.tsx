"use client";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
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

// get the first channel at index 0
const channelId = useMemo(() => channels?.[0]?._id,[channels]);
 // if there is channel for workspace send the 
   useEffect(() =>{
   if(workspaceLoading || channelsLoading || !workspace) return;
     if(channelId){
      router.push(`/workspace/${workspaceId}/channel/${channelId}`)
     }else if(!isModalOpen){
      onOpen("createChannel")
     }
   },[channelId,workspaceLoading,channelsLoading,workspace,isModalOpen, onOpen])
  if(workspaceLoading || channelsLoading){
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
      <Loader className="size-6 animate-spin text-muted-foreground"/>
      </div>
    )
  }
    
  if(!workspace){
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
      <TriangleAlert className="size-6  text-muted-foreground"/>
      <span className="text-sm text-muted-foreground">
        Workspace not found
      </span>
      </div>
    )
  }

    return null;
}; 
 
export default WorkspaceIdPage;