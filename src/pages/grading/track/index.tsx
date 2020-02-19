import { NextPage } from 'next';
import CandidateView from '../../../components/CandidateView';
import { SelectorMode } from '../../../@types/CandidateSelectorProps';

const Grading: NextPage = () => <CandidateView title="ให้คะแนนคำถามสาขา" mode={SelectorMode.Track} />;

export default Grading;
