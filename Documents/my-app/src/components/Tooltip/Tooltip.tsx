import React from "react";
import "./Tooltip.scss";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
}) => {
  return (
    <div className={`tooltip-wrapper ${position}`}>
      {children}
      <span className="tooltip-text">{content}</span>
    </div>
  );
};

export default Tooltip;
