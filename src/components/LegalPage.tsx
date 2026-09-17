interface LegalSection {
  title: string;
  body: string;
}

export default function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-center text-3xl font-semibold text-brand-navy sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-center text-xs text-neutral-500">
        {lastUpdated}
      </p>
      <p className="mx-auto mt-6 max-w-2xl text-center text-base text-neutral-600">
        {intro}
      </p>

      <div className="mt-10 flex flex-col gap-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-base font-semibold text-brand-navy">
              {section.title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
