import { NextPage } from 'next';
import CandidateGradingView from '../../../../components/CandidateGradingView';
import { GradingMode } from '../../../../@types/CandidateGradingViewProps';
import Authorization from '../../../../components/Authorization';

const PersonTrackGrading: NextPage = () => {
  return (
    <Authorization accessibleRoles={['admin', 'creative', 'developer', 'designer']}>
      <CandidateGradingView mode={GradingMode.Track} />
    </Authorization>
  );
};

export default PersonTrackGrading;
