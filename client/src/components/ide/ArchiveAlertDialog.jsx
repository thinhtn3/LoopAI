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

export default function ArchiveAlertDialog({sessionId, setMessages, problemSlug}) {

  const handleArchiveConversation = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/archive/`,
      { sessionId: sessionId, problemSlug: problemSlug }
    );
    if (response.status === 200) {
      console.log("Conversation archived");
      const deletedSession = await axios.delete(
        `${import.meta.env.VITE_API_URL}/archive/`,
        { params: { sessionId: sessionId } }
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
      <AlertDialogTrigger className="bg-[var(--home-accent)] text-[var(--home-accentText)] hover:bg-[var(--home-accentHover)] xl:text-sm 2xl:text-lg xl:w-1/12 2xl:w-1/5 rounded-sm">New Chat</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleArchiveConversation}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
