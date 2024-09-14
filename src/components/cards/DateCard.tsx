import { useMemo } from 'react';

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

type Props = {
  date: Date;
};
function DateCard({ date }: Props) {
  const formattedPublishDate = useMemo(
    () => new Date(date).toLocaleDateString('en-US', dateOptions),
    [date],
  );

  return (
    <small className="text-gray-400 font-semibold">
      {formattedPublishDate}
    </small>
  );
}

export default DateCard;
