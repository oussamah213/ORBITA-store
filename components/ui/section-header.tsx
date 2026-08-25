import { ArrowRight } from "lucide-react";

export function SectionHeader({ eyebrow, title, description, action = "View all" }: { eyebrow?: string; title: string; description?: string; action?: string | false }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {action && <a className="text-link" href="#featured">{action}<ArrowRight size={16} /></a>}
    </div>
  );
}
