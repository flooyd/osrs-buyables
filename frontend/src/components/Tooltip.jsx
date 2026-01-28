export function Tooltip({ children, content }) {
  return (
    <div className="relative group inline-block">
      {children}
      {/* Tooltip positioned to the right */}
      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 hidden group-hover:block z-50 pointer-events-none">
        <div className="bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg py-2 px-3 shadow-xl border border-gray-700 min-w-max">
          {content}
          {/* Arrow pointing left */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-px">
            <div className="border-[6px] border-transparent border-r-gray-900 dark:border-r-gray-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
