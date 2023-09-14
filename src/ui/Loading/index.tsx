import { FC } from 'react';

const Loading: FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-brand border-opacity-50">
        &nbsp;
      </div>
    </div>
  );
};

export default Loading;
