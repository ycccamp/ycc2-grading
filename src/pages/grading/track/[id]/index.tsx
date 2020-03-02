import { NextPage } from 'next';
import { useRouter } from 'next/router';
import CandidateGradingView from '../../../../components/CandidateGradingView';
import { GradingMode } from '../../../../@types/CandidateGradingViewProps';
// import Authorization from '../../../../components/Authorization';
// Remove temporary for testing

const PersonTrackGrading: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <CandidateGradingView candidateId={id as string} mode={GradingMode.Track} />;
};

export default PersonTrackGrading;
