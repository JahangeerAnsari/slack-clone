import EditChannelModal from "@/components/modals/edit-channel-modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteChannel } from "@/features/channels/api/use-delete-channel";
import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useChannelId } from "@/hooks/use-channel-id";
import { useConfirm } from "@/hooks/use-confirmation";
import { useStoreModal } from "@/hooks/use-modal-store";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Trash, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { toast } from "sonner";

interface ChannelHeaderProps {
  name: string;
}
const ChannelHeader = ({ name }: ChannelHeaderProps) => {
  const router = useRouter();
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();
  // only admin has acces to update the channel
  const { data: member } = useCurrentMember({ workspaceId });
  const { onOpen } = useStoreModal();
  const { mutate: deleteChannel, isPending: deletePending } =
    useDeleteChannel();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete this channel?",
    "You are about to delete this channel."
  );
  const handleDeleteChannel = async () => {
    const okay = await confirm();
    if (!okay) return;
    await deleteChannel(
      { id: channelId },
      {
        onSuccess: () => {
          toast.success("Channel Deleted");
          router.push(`/workspace/${workspaceId}`);
        },
        onError: () => {
          toast.error("Failed to delete the channel");
        },
      }
    );
  };
  const handleOpenEditModal = () => {
    if (member?.role !== "admin") return;
    onOpen("editChannel");
  };
  return (
    <>
      <ConfirmDialog />
      <EditChannelModal name={name} />
      <div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-lg font-semibold px-2 overflow-hidden"
              size="sm"
            >
              <span className="truncate"># {name}</span>
              <FaChevronDown />
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-gray-50 overflow-hidden">
            <DialogHeader className="p-4 border-b bg-white">
              <DialogTitle className="font-bold"># {name}</DialogTitle>
            </DialogHeader>
            <div className="px-4 pb-4 flex flex-col gap-y-2">
              <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Channel Name</p>
                  {member?.role === "admin" && (
                    <p
                      className="text-sm text-[#1264a3] hover:underline font-bold"
                      onClick={handleOpenEditModal}
                    >
                      Edit
                    </p>
                  )}
                </div>
                <p className="text-sm"># {name}</p>
              </div>
              {member?.role === "admin" && (
                <button
                  onClick={handleDeleteChannel}
                  disabled={deletePending}
                  className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer boader hover:bg-rose-300 hover:text-white"
                >
                  <TrashIcon className="size-4" />
                  <p className="text-sm font-semibold">Delete channel</p>
                </button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ChannelHeader;
