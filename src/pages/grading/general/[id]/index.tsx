import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import CandidateGradingView from '../../../../components/CandidateGradingView';
import { GradingMode } from '../../../../@types/CandidateGradingViewProps';
import Candidate from '../../../../@types/Candidate';
import { useStore } from '../../../../components/StoreProvider';

const PersonGeneralGrading: NextPage = () => {
  const store = useStore();
  return <CandidateGradingView mode={GradingMode.General} />;
};

export default PersonGeneralGrading;
