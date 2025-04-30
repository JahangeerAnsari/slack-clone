import { useStoreModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";


interface EditWorkspacesModalProps{
  value :string;

}
const EditWorkspacesModal = ({ value}:EditWorkspacesModalProps) => {
  const [name, setName] = useState(value);
 
   const workspaceId = useWorkspaceId()
  const { isOpen, type, onClose ,onOpen} = useStoreModal();
  const isModalOpen = isOpen && type === "editWorkspace";
  const {mutate:workspaceUpdate, isPending:isUpdatingWorkspace} = useUpdateWorkspace();
  
  const handleCloseEditModal = () => {
    onClose();
    onOpen("preferences")
  };
  const handleCloseModal = () => {
    onClose();
    setName("");
    onOpen("preferences")
  };
  const handleEditWorkspaceForm = async (e: React.FormEvent<HTMLFormElement>) => {
    const okay = await
    e.preventDefault();
   await workspaceUpdate({
      id:workspaceId,
      name
    },{
      onSuccess:() =>{
       
        
        toast.success("Workspace updated");
        handleCloseEditModal()
      },
      onError:(error) =>{
        console.log("error",error);
        
        toast.error("Failed to update workspace")
      }
    })
  };
  
  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold">Edit Workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleEditWorkspaceForm} className="space-y-4">
          <Input
            disabled={isUpdatingWorkspace}
            value={name}
            autoFocus
            required
            minLength={3}
            placeholder="Enter workspace name e.g. 'Personal','Home' "
            onChange={(e) => setName(e.target.value)}
          />
         <DialogFooter>
          <DialogClose asChild>
          <Button variant="outline" disabled={isUpdatingWorkspace} onClick={handleCloseModal}>
            Cancel
          </Button>
          </DialogClose>
          <Button type="submit" disabled={isUpdatingWorkspace}>Update</Button>
         </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditWorkspacesModal;
