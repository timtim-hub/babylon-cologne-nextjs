"use client";

import { forwardRef } from "react";
import { cn } from "@/app/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  containerSize?: "default" | "small" | "large" | "full";
  padding?: "default" | "small" | "large" | "none";
}

const paddings = {
  default: "py-16 md:py-24",
  small: "py-12 md:py-16",
  large: "py-24 md:py-32",
  none: "",
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  function Section(
    {
      children,
      className,
      containerClassName,
      id,
      containerSize = "default",
      padding = "default",
    },
    ref
  ) {
    return (
      <section id={id} ref={ref} className={cn(paddings[padding], className)}>
        <Container size={containerSize} className={containerClassName}>
          {children}
        </Container>
      </section>
    );
  }
);
