import { Button } from "../ui/button"
import { runPython } from "../../lib/handleRun";

export default function RunButton({ code, setOutput  }) {
    const handleRun = async () => {
        try {
          const result = await runPython(code);
          setOutput(result.run.stdout);
        } catch (error) {
          console.error(error);
        }
      };
    
    return (
        <Button onClick={handleRun}>Run</Button>
    )
}   