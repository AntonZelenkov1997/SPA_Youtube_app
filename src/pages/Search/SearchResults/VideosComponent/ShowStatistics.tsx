import React, { FC } from 'react';

interface IShowStatistics {
  nmb: number,
}

const ShowStatistics: FC<IShowStatistics> = ({ nmb }) => {
  const nmbLength = String(nmb).length;

  if (nmbLength > 3 && nmbLength <= 6) return <>{`${(nmb / 1000).toFixed()} тыс. просмотров`}</>;
  else if (nmbLength > 6 && nmbLength <= 9) return <>{`${(nmb / 1000000).toFixed()} млн. просмотров`}</>;
  else if (nmbLength > 9 && nmbLength <= 12) return <>{`${(nmb / 1000000000).toFixed()} млрд. просмотров`}</>;
  return <>{`${nmb} просмотров`}</>;
};

export default ShowStatistics;
