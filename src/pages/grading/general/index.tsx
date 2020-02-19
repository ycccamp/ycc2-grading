import { NextPage } from 'next';
import CandidateView from '../../../components/CandidateView';
import { SelectorMode } from '../../../@types/CandidateSelectorProps';

const GeneralGrading: NextPage = () => <CandidateView title="ให้คะแนนคำถามกลาง" mode={SelectorMode.General} />;

export default GeneralGrading;
