import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { useInterviewTheme } from "@/context/InterviewThemeContext";

export default function DefaultButton({
  children,
  onClick,
  bg, // optional override
  text, // optional override
  border, // optional override
  size = "default",
  className,
  disabled = false,
  loading = false,
  type = "button",
  asChild = false,
  ...props
}) {
  // const { theme } = useInterviewTheme();

  const handleClick = (e) => {
    if (onClick && !loading && !disabled) {
      onClick(e);
    }
  };

  return (
    <Button
      asChild={asChild}
      size={size}
      className={cn(
        loading && "opacity-70 cursor-not-allowed",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleClick}
      disabled={disabled || loading}
      type={type}
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
