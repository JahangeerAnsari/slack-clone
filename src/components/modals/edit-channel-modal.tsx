import { useStoreModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateChannel } from "@/features/channels/api/use-update-channel";
import { useChannelId } from "@/hooks/use-channel-id";
interface EditChannelProps {
  name: string;
}

const EditChannelModal = ({ name }: EditChannelProps) => {
  const channelId = useChannelId()
  const [value, setValue] = useState(name);
  const { isOpen, type, onClose } = useStoreModal();
  const isModalOpen = isOpen && type === "editChannel";
  const {mutate, isPending} =useUpdateChannel()
  
  const handleEditChannelChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setValue(value)
  }
  const handleCloseModal = () => {
    onClose();
  };
  const handleEditChannelForm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    mutate({
      id:channelId,
      name:value
    }, {
      onSuccess:(id) =>{
        toast.success("Channel Update");
        handleCloseModal()
      },
      onError:() =>{
        toast.error("Failed to update the channel")
      }
    })
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold">Rename this Channel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleEditChannelForm} className="space-y-4">
          <Input
            disabled={isPending}
            value={value}
            autoFocus
            required
            minLength={3}
            placeholder="e.g plan, budget"
            onChange={handleEditChannelChange}
            maxLength={80}
           
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                disabled={isPending}
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditChannelModal;
