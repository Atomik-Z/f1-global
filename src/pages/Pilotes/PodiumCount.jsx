import React from 'react';
import { useGetDriverCareerPodiumsQuery } from '../../services/f1Api';

function PodiumCount({ driverId }) {
  const { data: p1Pilote, isLoading } = useGetDriverCareerPodiumsQuery({driverId: driverId, position: '1'});
  const { data: p2Pilote } = useGetDriverCareerPodiumsQuery({driverId: driverId, position: '2'});
  const { data: p3Pilote } = useGetDriverCareerPodiumsQuery({driverId: driverId, position: '3'});


  const totalPodiums = parseInt(p1Pilote?.MRData.total) + parseInt(p2Pilote?.MRData.total) + parseInt(p3Pilote?.MRData.total);

  return !isLoading && (
      <p>Podiums : {totalPodiums}</p>
  );
}

export default PodiumCount;