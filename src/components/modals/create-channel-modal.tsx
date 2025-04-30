import { useStoreModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle
} from "@/components/ui/dialog";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateWorkspace } from "@/features/workspaces/api/use-create-workspace";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateChannel } from "@/features/channels/api/use-create-channel";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
const CreateChannelModal = () => {
  const [name, setName] = useState("");
  const router = useRouter()
  const { isOpen, type, onClose } = useStoreModal();
   const workspaceId = useWorkspaceId()
  const isModalOpen = isOpen && type === "createChannel";
   const {mutate,data,error,isError,isPending,isSuccess,iseSettled} = useCreateChannel()
  const handleCloseModal = () => {
    onClose();
    setName("");
  };
  const handleChangeChannel = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setName(value)
  }
  const handleSubmitWorkspaceForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ name,workspaceId }, {
      // data--< we are returning the id
      onSuccess(id) {
        handleCloseModal();
        toast.success("New Channel Created!")
      },
    })
  };
  
  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold">Add a Channel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmitWorkspaceForm} className="space-y-4">
          <Input
            disabled={isPending}
            value={name}
            autoFocus
            required
            minLength={3}
            placeholder="example: plan budget "
            onChange={handleChangeChannel}
          />
          <div className="flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelModal;
