import React from 'react';
import { useGetConstructorCareerPodiumsQuery } from '../../services/f1Api';

function ConstPodiumCount({ constructorId }) {
  const { data: p1Constructeur, isLoading } = useGetConstructorCareerPodiumsQuery({constructorId: constructorId, position: '1'});
  const { data: p2Constructeur } = useGetConstructorCareerPodiumsQuery({constructorId: constructorId, position: '2'});
  const { data: p3Constructeur } = useGetConstructorCareerPodiumsQuery({constructorId: constructorId, position: '3'});


  const totalPodiums = parseInt(p1Constructeur?.MRData.total) + parseInt(p2Constructeur?.MRData.total) + parseInt(p3Constructeur?.MRData.total);

  return !isLoading && (
      <p>Podiums : {totalPodiums}</p>
  );
}

export default ConstPodiumCount;