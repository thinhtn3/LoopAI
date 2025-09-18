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
import axios from "axios";
import DefaultButton from "@/components/common/DefaultButton";

export default function ArchiveAlertDialog({
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
        <DefaultButton className="bg-[var(--home-accent)] text-[var(--home-accentText)] hover:bg-[var(--home-accentHover)] xl:text-sm 2xl:text-lg">
          New Chat
        </DefaultButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Your conversation will be archived and
            a new chat will be created.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleArchiveConversation}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
