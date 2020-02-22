import { NextPage } from 'next';
import CandidateGradingView from '../../../../components/CandidateGradingView';
import { GradingMode } from '../../../../@types/CandidateGradingViewProps';
import { useStore } from '../../../../components/StoreProvider';
import Authorization from '../../../../components/Authorization';

const PersonGeneralGrading: NextPage = () => {
  return (
    <Authorization accessibleRoles={['admin', 'general']}>
      <CandidateGradingView mode={GradingMode.General} />
    </Authorization>
  );
};

export default PersonGeneralGrading;
