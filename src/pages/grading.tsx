import { NextPage } from 'next';
import CandidateView from '../components/CandidateView';
import { SelectorMode } from '../@types/CandidateSelectorProps';

const TrackGrading: NextPage = () => <CandidateView title="ให้คะแนน" mode={SelectorMode.Grading} />;

export default TrackGrading;
