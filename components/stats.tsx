import { StatsContent } from "@/lib/types/content";

const Stats = ({ stats }: { stats?: StatsContent }) => {
  const items = stats?.items ?? [];

  if (!items.length) return null;

  return (
    <div className="py-20">
      <div className="mx-auto w-full max-w-(--breakpoint-xl) px-6 py-12 xl:px-0">
        {stats?.sectionLabel && (
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-4">
            {stats.sectionLabel}
          </p>
        )}
        <h2 className="font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
          {stats?.title || "The impact we've made so far"}
        </h2>
        {stats?.subtitle && (
          <p className="mt-4.5 max-w-2xl text-lg text-muted-foreground md:text-xl">
            {stats.subtitle}
          </p>
        )}

        <div className="mt-16 grid justify-center gap-x-10 gap-y-16 sm:mt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, idx) => (
            <div key={item.id || idx}>
              <span className="font-medium text-5xl tracking-tight md:text-6xl">
                {item.value}
              </span>
              <p className="mt-6 font-medium text-xl">
                {item.label}
              </p>
              <p className="mt-2 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
