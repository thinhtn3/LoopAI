import { Button } from "../ui/button";

export default function RunButton({ handleRun }) {
    return (
        <Button onClick={handleRun}>Run</Button>
    )
}