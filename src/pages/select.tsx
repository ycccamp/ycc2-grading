import { NextPage } from 'next';
import { useEffect } from 'react';
import CandidateView from '../components/CandidateView';
import { SelectorMode } from '../@types/CandidateSelectorProps';
import { useStore } from '../components/StoreProvider';

const Select: NextPage = () => {
  const store = useStore();
  return <CandidateView title="ให้คะแนน" mode={SelectorMode.Selecting} candidates={store.candidateStore.candidates} />;
};

export default Select;
