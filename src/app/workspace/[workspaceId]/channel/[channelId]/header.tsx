import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Trash, TrashIcon } from "lucide-react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface ChannelHeaderProps {
  name: string;
}
const ChannelHeader = ({ name }: ChannelHeaderProps) => {
  return (
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
                <p className="text-sm text-[#1264a3] hover:underline font-bold">Edit</p>
                </div>
                <p className="text-sm"># {name}</p>
            </div>
            <button className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg cursor-pointer boader hover:bg-rose-300 hover:text-white">
            <TrashIcon className="size-4"/>
            <p className="text-sm font-semibold">Delete channel</p>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChannelHeader;
