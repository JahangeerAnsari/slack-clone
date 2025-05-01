import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Doc } from "../../../convex/_generated/dataModel";
import { ChevronDown, FilterIcon, ListFilter, SquarePen } from "lucide-react";
import Hint from "@/components/hint";
import { PreferrencesModal } from "@/components/modals/preferences-modal";
import { useStoreModal } from "@/hooks/use-modal-store";
import InvitePeopleModal from "@/components/modals/invite-people-modal";

interface WorkspaceSidebarHeaderProps {
  workspace: Doc<"workspaces">;
  //   only admin role member can view the workspace
  isAdmin: boolean;
}
export const WorkspaceSidebarHeader = ({
  workspace,
  isAdmin,
}: WorkspaceSidebarHeaderProps) => {
  const {onOpen} = useStoreModal();
 
  return (
    <>
    <InvitePeopleModal name={workspace.name} joinCode={workspace.joinCode}/>
      <PreferrencesModal initialValue={workspace?.name}/>
      <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="transparent"
              className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
            >
              <span className="truncate">{workspace?.name}</span>
              <ChevronDown className="size-4 ml-1 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-64">
            <DropdownMenuItem className="cursor-pointer capitalize">
              <div
                className="size-9 relative  overflow-hidden bg-[#616061] text-white
            font-semibold text-xl rounded-md flex items-center justify-center mr-2"
              >
                {workspace?.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col items-start">
                <p className="font-bold">{workspace?.name}</p>
                <p className="text-xs text-muted-foreground">
                  Active Workspace
                </p>
              </div>
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer py-2"
                  onClick={() => onOpen("invitePeople",)}
                >
                  Invite people to {workspace.name}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer py-2"
                  onClick={() => onOpen("preferences")}
                >
                  Preferrences
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-3">
          <Hint label="Filter" side="top">
            <ListFilter className="size-4 text-white mr-0" />
          </Hint>
          <Hint label="New Message" side="bottom">
            <Button
              variant="transparent"
              className=" hover:cursor-pointer"
              size="icon"
            >
              <SquarePen className="size-5 text-white" />
            </Button>
          </Hint>
        </div>
      </div>
    </>
  );
};
