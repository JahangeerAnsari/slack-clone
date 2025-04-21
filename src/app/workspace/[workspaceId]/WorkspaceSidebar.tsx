
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id"
import { AlertTriangle, Loader } from "lucide-react";
import { WorkspaceSidebarHeader } from "../WorkspaceHeader";
import { useCurrentMember } from "@/features/members/api/use-current-member";
interface WorkspaceSidebarProps{

}
export const WorkspaceSidebar = () =>{
    /* find the workspace   */
   const workspaceId = useWorkspaceId()
    const {data:member,isLoading:isMemberLoading} =useCurrentMember({workspaceId});
    const {data:workspace, isLoading:isWorkspaceLoading} = useGetWorkspace({id:workspaceId})
    if(isMemberLoading ||isWorkspaceLoading){
        return (
            <div className="flex flex-col bg-[#5E52C5F] h-full items-center justify-center">
                <Loader className="size-5 animate-spin text-white"/>
            </div>
        )
    }
    if(!member || !workspace){
        <div className="flex flex-col bg-[#5E52C5F] h-full items-center justify-center">
                <AlertTriangle className="size-5  text-white"/>
                <span className="text-white">Workspace does not found</span>
            </div>
    }
     
    return (
        <div className="flex flex-col h-full bg-[#5E2C5F]">
         <WorkspaceSidebarHeader workspace={workspace } isAdmin={member?.role ==="admin"}/>
        </div>
    )
}