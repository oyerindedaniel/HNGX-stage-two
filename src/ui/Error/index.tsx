import { FC } from 'react';
import { MdCancel } from 'react-icons/md';
import { Button } from '../Button';

const Error: FC<{ text: string; refetch?: () => void }> = ({ text, refetch }) => (
  <div className="flex flex-col items-center justify-center space-y-3 p-8">
    <MdCancel className="text-brand" size="60px" />
    <p className="font-semibold text-center capitalize text-md sm:text-lg md:text-xl">{text}</p>
    <Button variant="brand" size="sm" onClick={() => refetch?.()}>
      Refetch
    </Button>
  </div>
);

export default Error;
