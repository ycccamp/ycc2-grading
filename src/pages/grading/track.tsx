import { NextPage } from 'next';
import { observer } from 'mobx-react';
import CandidateView from '../../components/CandidateView';
import { SelectorMode } from '../../@types/CandidateSelectorProps';
import { useStore } from '../../components/StoreProvider';

const Grading: NextPage = () => {
  const store = useStore();
  return (
    <CandidateView title="ให้คะแนนคำถามสาขา" candidates={store.candidateStore.candidates} mode={SelectorMode.Track} />
  );
};

export default observer(Grading);
