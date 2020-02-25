import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import CandidateView from '../components/CandidateView';
import { SelectorMode } from '../@types/CandidateSelectorProps';
import { useStore } from '../components/StoreProvider';

const Select: NextPage = () => {
  const store = useStore();
  return <CandidateView title="ให้คะแนน" mode={SelectorMode.Selecting} candidates={store.candidateStore.candidates} />;
};

export default observer(Select);
