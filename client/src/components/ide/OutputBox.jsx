import { ScrollArea } from "@/components/ui/scroll-area";

export default function OutputBox({ output }) {
    return (
        <div className="flex flex-col h-[20vh] w-full">
            {/* Header */}
            <div className="bg-[#1e1e1e] border-b border-[#3c3c3c] px-4 py-2">
                <h3 className="text-sm font-medium text-[#cccccc]">Output</h3>
            </div>
            
            {/* Output Content */}
            <ScrollArea className="flex-1 bg-[#1e1e1e] border border-[#3c3c3c] rounded-b-md">
                <div className="p-4">
                    {output && (<pre className="text-sm font-mono text-[#d4d4d4] whitespace-pre-wrap leading-relaxed">{output} </pre>)}
                </div>
            </ScrollArea>
        </div>
    );
}