import { useStoreModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const CreateWorkspacesModal = () => {
  const [name, setName] = useState("");
  const router = useRouter()
  const { isOpen, type, onClose } = useStoreModal();
  const isModalOpen = isOpen && type === "createWorkspaces";
   const {mutate,data,error,isError,isPending,isSuccess,iseSettled} = useCreateWorkspace()
  const handleCloseModal = () => {
    onClose();
    setName("");
  };
  const handleSubmitWorkspaceForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ name }, {
      // data--< we are returning the id
      onSuccess(id) {
        toast.success("Workspace created!"

        )
       router.push(`/workspace/${id}`)
        handleCloseModal()
      },
    })
  };
  
  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold">Add a Workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmitWorkspaceForm} className="space-y-4">
          <Input
            disabled={isPending}
            value={name}
            autoFocus
            required
            minLength={3}
            placeholder="Enter workspace name e.g. 'Personal','Home' "
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspacesModal;
