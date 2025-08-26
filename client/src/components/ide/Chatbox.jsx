import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function Chatbox() {
  const [input, setInput] = useState("")

  // const sendMessage = () => {
  //   if (!input.trim()) return
  //   setMessages((prev) => [...prev, input])
  //   setInput("")
  // }

  return (
    <div className="w-full max-w-md h-[500px] border rounded-md flex flex-col">
      <ScrollArea className="flex-1 p-3 space-y-2">
        <div className="bg-muted rounded-lg px-3 py-2 text-sm max-w-[80%]">
          <p>Hello, how are you?</p>
        </div>
      </ScrollArea>

      <div className="border-t p-3 flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="resize-none h-10 flex-1"
        />
        <Button>Send</Button>
      </div>
    </div>
  )
}
