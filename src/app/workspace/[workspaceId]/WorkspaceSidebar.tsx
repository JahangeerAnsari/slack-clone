import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, HashIcon, Loader, MessageSquareCodeIcon, SendHorizontalIcon } from "lucide-react";
import { WorkspaceSidebarHeader } from "../WorkspaceHeader";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { SidebarItem } from "./sidebar-item";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { WorkspaceSection } from "./workspace-section";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { UserDetail } from "./user-detail";
import { useStoreModal } from "@/hooks/use-modal-store";

export const WorkspaceSidebar = () => {
  const { onOpen} = useStoreModal();
  /* find the workspace   */
  const workspaceId = useWorkspaceId();
  const { data: member, isLoading: isMemberLoading } = useCurrentMember({ workspaceId});
  const { data: workspace, isLoading: isWorkspaceLoading } = useGetWorkspace({id: workspaceId});
  const {data:channels, isLoading:isChannelLoading} = useGetChannels({workspaceId});
  const {data:members, isLoading:membersLoading} = useGetMembers({workspaceId});
  
     
  if (isMemberLoading || isWorkspaceLoading) {
    return (
      <div className="flex flex-col bg-[#5E52C5F] h-full items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }
  if (!member || !workspace) {
    <div className="flex flex-col bg-[#5E52C5F] h-full items-center justify-center">
      <AlertTriangle className="size-5  text-white" />
      <span className="text-white">Workspace does not found</span>
    </div>;
  }

  return (
    <div className="flex flex-col h-full bg-[#5E2C5F]">
      <WorkspaceSidebarHeader
        workspace={workspace}
        isAdmin={member?.role === "admin"}
      />
      <div className="flex flex-col px-2 mt-3 gap-1">
        <SidebarItem
         label="Threads"
         icon={MessageSquareCodeIcon}
         id="threads"
        />
        <SidebarItem
         label="Drafts"
         icon={SendHorizontalIcon}
         id="drafts"
        />
      </div>
      <WorkspaceSection 
         label="Channels"
         hint="New Channels"
         onNew={member?.role === "admin" ? ()  => onOpen("createChannel"): undefined}
        >
        {channels?.map((item) => (
            <SidebarItem 
            key={item._id}
              label={item.name}
              icon={HashIcon}
            id={item._id}/>
        ))}

        </WorkspaceSection>
        <WorkspaceSection 
         label="Direct Messages"
         hint="New Direct Messages"
        >
            {members?.map((item) => (
          <UserDetail id={item._id} 
            key={item._id}
            label={item.user.name}
            image={item.user.image}

          
          />
         ))}
        </WorkspaceSection>
       

    </div>
  );
};
