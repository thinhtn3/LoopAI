import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useInterviewTheme } from "@/context/InterviewThemeContext";

export default function DefaultButton({
  children, //content
  onClick, //function
  bg = "var(--vs-dark-inspired-surface)",
  text = "var(--interview-text)",
  border = "var(--interview-border)",
  size = "default", //sm, lg, icon
  className,
  disabled = false,
  loading = false,
  type = "button", //submit, reset, button
  
  ...props
}) {
  const { theme } = useInterviewTheme();

  const handleClick = (e) => {
    if (onClick && !loading && !disabled) {
      onClick(e);
    }
  };

  return (
    <Button
      size={size}
      className={cn(
        "transition-all duration-200",
        loading && "opacity-70 cursor-not-allowed",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleClick}
      disabled={disabled || loading}
      type={type}
      style={{
        backgroundColor: theme.colors.accent,
        color: theme.colors.accentText,
      }}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
}