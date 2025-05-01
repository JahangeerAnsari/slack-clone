import { useStoreModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "../ui/input";

import { useState } from "react";
import { toast } from "sonner";
import { Clipboard, RefreshCcw } from "lucide-react";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Button } from "../ui/button";
import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code";
import { useConfirm } from "@/hooks/use-confirmation";
interface InvitePeopleModalProps{
    name:string;
    joinCode:string
}
const InvitePeopleModal = ({joinCode,name}:InvitePeopleModalProps) => {
  
  const { isOpen, type, onClose,onOpen } = useStoreModal();
  const isModalOpen = isOpen && type === "invitePeople";
  const [ConfirmDialog,confirm] = useConfirm(
   "Are you sure?",
   "This will deactivate the current invite code and generate a new one"
  )
  const workspaceId = useWorkspaceId();
  const {mutate, isPending} = useNewJoinCode()
  
  const handleCloseModal = () => {
    onClose();
    
  };
 const handleCopy = () =>{
//   create new invite link
const inviteLink = `${window.location.origin}/join/${workspaceId}`;
  window.navigator.clipboard.writeText(inviteLink)
  .then(() => toast.success("Invite link copy to clipboard"))
 }
 const createNewCode =  () =>{
    
    mutate({workspaceId},{
        onSuccess:(data) =>{
            toast.success("Invite code generated")
        },
        onError:() =>{
        toast.error("Failed to regenerate invite code")
        }
    })
 }
  
  return (
    <>
    <ConfirmDialog/>
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite People to {name}</DialogTitle>
          <DialogDescription>
            Use the below code to invite people to your workspace
          </DialogDescription>
        </DialogHeader>
        <form  className="space-y-4">
          <div className="flex flex-col gap-y-4 items-center justify-center py-10">
            <p className="tex-4xl font-bold tracking-widset uppercase">{joinCode}</p>
            <Button variant="outline" size="sm" onClick={handleCopy}>
                Copy link
                <Clipboard className="size-4 ml-2"/>
            </Button>
          </div>
          <div className="flex items-center justify-between    w-full">
            <Button disabled={isPending} onClick={createNewCode} variant="outline">
              New  code
              <RefreshCcw className="size-4 ml-2"/>
            </Button>
            <DialogClose  asChild>
                <Button>Close</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
    </>
   
  );
};

export default InvitePeopleModal;
