const EmptyState = () => {
  return (
    <div className="flex h-full items-center justify-center bg-zinc-100 px-8 py-10 sm:px-6 lg:py-8">
      <div className="flex flex-col items-center text-center">
        <h3 className="mt-2 text-2xl font-semibold text-zinc-900">
          Select a chat or start messaging
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
