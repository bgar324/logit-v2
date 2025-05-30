type SectionHeaderProps = {
    title: string;
    subtitle: string;
  };
  
  export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
    return (
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <p className="text-base text-white/60">{subtitle}</p>
      </div>
    );
  }
  