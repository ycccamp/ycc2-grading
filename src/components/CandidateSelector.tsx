import { Box, BoxProps, Button, Stack, Input, InputGroup, InputLeftElement, Icon, Select } from '@chakra-ui/core';

import Router from 'next/router';
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import CandidateSelectorProps, { SelectorMode } from '../@types/CandidateSelectorProps';
import { getAverageScore, paginate, getMaxPage } from '../core/utils';
import { useStore } from './StoreProvider';
import Candidate, { statusDisplay } from '../@types/Candidate';
import SelectionDialog from './SelectionDialog';
import { GradingMode } from '../@types/CandidateGradingViewProps';

const Th: React.FC<BoxProps> = ({ children, bg }) => (
  <Box textAlign="center" fontFamily="heading" color="white" as="th" bg={bg} py={2}>
    {children}
  </Box>
);

const Tr: React.FC<BoxProps> = ({ children, bg }) => (
  <Box as="tr" bg={bg} p={4}>
    {children}
  </Box>
);

const Td: React.FC<BoxProps> = ({ children, bg, color }) => (
  <Box textAlign="center" fontFamily="body" as="td" bg={bg} color={color || 'black'} py={2}>
    {children}
  </Box>
);

const displayMode = (mode: SelectorMode): string => {
  if (mode === SelectorMode.Track || mode === SelectorMode.General) {
    return 'ให้คะแนน';
  }
  if (mode === SelectorMode.Selecting) {
    return 'คัดเลือกผู้สมัคร';
  }
  return 'ไม่มีอะไร';
};

const searchForMatch = (search: string, candidates: Array<Candidate>): Array<Candidate> => {
  if (search.length) {
    return candidates.filter(c => c.id.includes(search));
  }
  return candidates;
};

const filterCandidateByTrack = (track: string, candidates: Array<Candidate>): Array<Candidate> => {
  if (track === 'all') {
    return candidates;
  }
  return candidates.filter(c => c.track === track);
};

const handleClickByMode = (mode: SelectorMode, id: string, openPopup?: Function): void => {
  if (mode === SelectorMode.Track) {
    Router.push('/grading/track/[id]', `/grading/track/${id}`);
  } else if (mode === SelectorMode.General) {
    Router.push('/grading/general/[id]', `/grading/general/${id}`);
  } else if (mode === SelectorMode.Selecting) {
    openPopup(id);
  }
};

const displayColor = (status: string): string => {
  if (status === 'selected') {
    return 'green.600';
  }
  if (status === 'alternate') {
    return 'orange.600';
  }
  if (status === 'delisted') {
    return 'red.600';
  }
  return 'black';
};

const CandidateSelector: React.FC<CandidateSelectorProps> = ({ mode, candidates }) => {
  const store = useStore();
  const [search, setSearch] = useState<string>('');
  const [track, setTrack] = useState<string>('all');
  const [isPopupOpened, setPopupOpened] = useState<boolean>(false);
  const [popupId, setPopupId] = useState<string>('');
  const openPopup = (id: string): void => {
    setPopupId(id);
    setPopupOpened(true);
  };
  useEffect(() => {
  }, []);
  return (
    <>
      <Stack w="100%" py={2} isInline spacing={4}>
        <InputGroup w="30%" border="pink.400">
          <InputLeftElement>
            <Icon name="search" color="pink.300" />
          </InputLeftElement>
          <Input
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSearch(e.target.value)}
            type="text"
          />
        </InputGroup>
        <Button leftIcon="arrow-left" variantColor="blue">
          ก่อนหน้า
        </Button>
        <Button rightIcon="arrow-right" variantColor="blue">
          ถัดไป
        </Button>
        <Select
          w="20%"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => setTrack(e.target.value as string)}
        >
          <option value="all">All</option>
          <option value="creative">Creative</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
        </Select>
      </Stack>
      <Box as="table" w="100%">
        <Tr bg="pink.700">
          <Th>รหัสอ้างอิง</Th>
          <Th>สาขา</Th>
          {mode === SelectorMode.Selecting ? (
            <>
              <Th>คะแนนคำถามกลาง</Th>
              <Th>คะแนนคำถามสาขา</Th>
            </>
          ) : (
            <></>
          )}
          <Th>ผู้ตรวจคำถามกลาง</Th>
          <Th>ผู้ตรวจคำถามสาขา</Th>
          <Th>สถานะ</Th>
          <Th>{displayMode(mode)}</Th>
        </Tr>
        {searchForMatch(search, filterCandidateByTrack(track, candidates))
          .slice(0, 10)
          .map(candidate => {
            return (
              <Tr bg="pink.100" key={candidate.id}>
                <Td>{candidate.id}</Td>
                <Td>{candidate.track}</Td>
                {mode === SelectorMode.Selecting ? (
                  <>
                    <Td>
                      {candidate.forms.general.score.length
                        ? store.candidateStore.getCandidateAverageScoreByMode(candidate, GradingMode.General).toFixed(2)
                        : '-'}
                    </Td>
                    <Td>
                      {candidate.forms.track.score.length
                        ? store.candidateStore.getCandidateAverageScoreByMode(candidate, GradingMode.Track).toFixed(2)
                        : '-'}
                    </Td>
                  </>
                ) : (
                  <></>
                )}
                <Td>{candidate.forms.general.score.map(s => s.grader).join(', ') || 'ยังไม่มี'}</Td>
                <Td>{candidate.forms.track.score.map(s => s.grader).join(', ') || 'ยังไม่มี'}</Td>
                <Td color={displayColor(candidate.status)}>{statusDisplay[candidate.status]}</Td>
                <Td>
                  <Button
                    onClick={(): void => {
                      handleClickByMode(mode, candidate.id, openPopup);
                    }}
                    isDisabled={mode === SelectorMode.Display}
                    variantColor="blue"
                  >
                    {displayMode(mode)}
                  </Button>
                </Td>
              </Tr>
            );
          })}
      </Box>
      <Button
        onClick={(): void => {
          store.candidateStore.fetchCandidate();
        }}
        variantColor="red"
        mt={4}
      >
        โหลดข้อมูลใหม่
      </Button>
      <SelectionDialog isOpen={isPopupOpened} id={popupId} onClose={(): void => setPopupOpened(false)} />
    </>
  );
};

export default observer(CandidateSelector);
