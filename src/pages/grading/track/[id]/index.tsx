import { NextPage } from 'next';
import CandidateGradingView from '../../../../components/CandidateGradingView';
import { GradingMode } from '../../../../@types/CandidateGradingViewProps';
// import Authorization from '../../../../components/Authorization';
// Remove temporary for testing

const PersonTrackGrading: NextPage = () => {
  return <CandidateGradingView mode={GradingMode.Track} />;
};

export default PersonTrackGrading;
