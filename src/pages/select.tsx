import { NextPage } from 'next';
import CandidateView from '../components/CandidateView';
import { SelectorMode } from '../@types/CandidateSelectorProps';

const Select: NextPage = () => <CandidateView title="ให้คะแนน" mode={SelectorMode.Selecting} />;

export default Select;
