import { NextPage } from 'next';
import { useRouter } from 'next/router';
import CandidateGradingView from '../../../../components/CandidateGradingView';
import { GradingMode } from '../../../../@types/CandidateGradingViewProps';
import { useStore } from '../../../../components/StoreProvider';
// import Authorization from '../../../../components/Authorization';
// Remove temporary for testing

const PersonGeneralGrading: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <CandidateGradingView id={id as string} mode={GradingMode.General} />;
};

export default PersonGeneralGrading;
