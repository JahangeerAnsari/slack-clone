import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EmojiPicker from 'emoji-picker-react';
interface EmojiPopoverProps {
  children: React.ReactNode;
  hint?: string;
  onEmojiSelect: (emoji: string) => void;
}
export const EmojiPopOver = ({
  children,
  hint = "Emoji",
  onEmojiSelect
}: EmojiPopoverProps) => {
  const [popoverOpen, setPopOverOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  
  
  const handleEmojiClick = (emojiObject: any) => {
    onEmojiSelect(emojiObject.emoji);
    setPopOverOpen(false);
    setTimeout(() =>{
   setTooltipOpen(false)
    },500)
  };
  return (
    <TooltipProvider>
      <Popover open={popoverOpen} onOpenChange={setPopOverOpen}>
        <Tooltip
          open={tooltipOpen}
          onOpenChange={setTooltipOpen}
          delayDuration={50}
        >
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent className="bg-black text-white border border-white/5">
            <p className="font-medium text-xs">{hint}</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent className="p-0 w-full border-none shadow-none">
        <EmojiPicker onEmojiClick={handleEmojiClick} />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};
