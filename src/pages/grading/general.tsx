import { NextPage } from 'next';
import { observer } from 'mobx-react';
import CandidateView from '../../components/CandidateView';
import { SelectorMode } from '../../@types/CandidateSelectorProps';
import { useStore } from '../../components/StoreProvider';

const GeneralGrading: NextPage = () => {
  const store = useStore();
  return (
    <CandidateView title="ให้คะแนนคำถามกลาง" candidates={store.candidateStore.candidates} mode={SelectorMode.General} />
  );
};

export default observer(GeneralGrading);
