const PATHS = {
  natural:
    "M12 21c-4.97 0-9-4.03-9-9 0-4.5 6-10.5 9-10.5s9 6 9 10.5c0 4.97-4.03 9-9 9Zm0-2a7 7 0 0 0 6.93-6.06c-2.9 2.1-4.86 2.06-6.93 5.06-.6-2.2-2.03-3.8-3.93-4.5A7 7 0 0 0 12 19Z",
  delivery:
    "M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375v10.125A2.25 2.25 0 0 0 3.75 18.75h.75a3 3 0 1 0 6 0h4.5a3 3 0 1 0 6 0h.75a.75.75 0 0 0 .75-.75v-4.19a3 3 0 0 0-.879-2.121l-2.56-2.56A3 3 0 0 0 16.939 8.25H15V6.375A1.875 1.875 0 0 0 13.125 4.5H3.375ZM15 9.75h1.94a1.5 1.5 0 0 1 1.06.44l2.56 2.56a1.5 1.5 0 0 1 .44 1.06v.19H15v-4.25Z",
  certified:
    "m9 12.75 2.25 2.25 4.5-4.5m4.5 2.25a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
};

export default function UspIcon({ kind }: { kind: keyof typeof PATHS }) {
  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-brand-blue-deep">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={kind === "delivery" ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={PATHS[kind]} />
      </svg>
    </div>
  );
}
