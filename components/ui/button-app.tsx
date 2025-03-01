"use client";
import { cn } from "@/lib/utils"
import styles from "@/styles/button.module.css";

function ButtonApp({ className, typeButton , ...props}: React.ComponentProps<"button"> & {
  typeButton?: string
}) {
  const styleCustom = typeButton === "play" ? styles.buttonPlay : null;
  return (
    <button type="button" className={cn(className, styleCustom , styles.buttonApp)} {...props}>
      <strong>{props.children}</strong>
    </button>
  );
}

export default ButtonApp;
