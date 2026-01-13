import { cn } from "@/lib/utils";

interface GenderBadgeProps {
  gender: string;
}


export const GenderBadge = ({ gender }: GenderBadgeProps) => {

  const genderLabels: Record<string, string> = {
    men: "Hombre",
    kid: "Nino",
    women: "Mujeres"
  };

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full",
      "bg-secondary text-secondary-foreground"
    )}>
      {genderLabels[gender]}
    </span>
  );
};
