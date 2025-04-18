import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStoreModal } from "@/hooks/use-modal-store";

export const WorkspaceSwither = () => {
  const { onOpen } = useStoreModal();
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { data: workspaces, isLoading: workspacesIsLoading } =useGetWorkspaces();
  const { data: workspaceData, isLoading: workspaceIsLoading } =
    useGetWorkspace({
      id: workspaceId,
    });
  //  find others workspaces
  const otherWorkspaces = workspaces?.filter(
    (workspace) => workspace._id !== workspaceId
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative size-9 overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD] text-black hover:cursor-pointer">
          {workspaceIsLoading ? (
            <Loader />
          ) : (
            workspaceData?.name.charAt(0).toLocaleUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          className="cursor-pointer  flex-col justify-start items-start capitalize"
          onClick={() => router.push(`/workspace/${workspaceId}`)}
        >
           {workspaceData?.name}
          <span className="text-xs text-muted-foreground">
            Active Workspace
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {otherWorkspaces?.map((w) => (
          <DropdownMenuItem className="cursor-pointer"
            key={w._id}
            onClick={() => router.push(`/workspace/${w?._id}`)}
          >
           <div className="size-9 relative overflow-hidden bg-[#616061]
             text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2">
           {w?.name?.charAt(0).toLocaleUpperCase()}
           </div>
           {w.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem className="cursor-pointer" onClick={() => onOpen("createWorkspaces")}>
          <div
            className="size-9 relative overflow-hidden bg-[#F2F2F2]
             text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2"
            
          >
            <Plus />
          </div>
          Create New WorkSpace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
