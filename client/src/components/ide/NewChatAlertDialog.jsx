import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus } from "lucide-react";
import axios from "axios";
import DefaultButton from "@/components/common/DefaultButton.jsx";

export default function NewChatAlertDialog({
  setMessages,
  problemSlug,
}) {
  const handleArchiveConversation = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/archive/`,
      { problemSlug: problemSlug },
      { withCredentials: true }
    );
    if (response.status === 200) {
      console.log("Conversation archived");
      const deletedSession = await axios.delete(
        `${import.meta.env.VITE_API_URL}/archive/`,
        { withCredentials: true, params: { problemSlug } },
      );
      if (deletedSession.status === 200) {
        console.log("Session deleted");
        setMessages([]);
      }
    } else {
      console.error("Error archiving conversation");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DefaultButton className="h-[80%] rounded-lg text-[var(--home-text)] hover:bg-[var(--home-bg)] xl:text-sm 2xl:text-lg cursor-pointer">
          <Plus className="2xl:size-6 lg:size-3"/>
        </DefaultButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[var(--home-text)]">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Your conversation will be archived and
            a new chat will be created.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-[var(--home-bg)] text-[var(--home-text)] hover:text-[var(--home-text)] hover:bg-[var(--home-bgHover)] border-0">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleArchiveConversation} className="bg-[var(--home-accent)] text-[var(--home-accentText)] hover:bg-[var(--home-accentHover)] border-0">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
