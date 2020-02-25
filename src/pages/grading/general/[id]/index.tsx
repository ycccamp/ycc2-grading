import { NextPage } from 'next';
import CandidateGradingView from '../../../../components/CandidateGradingView';
import { GradingMode } from '../../../../@types/CandidateGradingViewProps';
import { useStore } from '../../../../components/StoreProvider';
// import Authorization from '../../../../components/Authorization';
// Remove temporary for testing

const PersonGeneralGrading: NextPage = () => {
  return <CandidateGradingView mode={GradingMode.General} />;
};

export default PersonGeneralGrading;
