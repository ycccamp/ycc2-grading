import { Box, BoxProps, Button } from '@chakra-ui/core';

import Router from 'next/router';
import React from 'react';
import CandidateSelectorProps, { SelectorMode } from '../@types/CandidateSelectorProps';
import { getAverageScore } from '../core/utils';
import { useStore } from './StoreProvider';

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

const Td: React.FC<BoxProps> = ({ children, bg }) => (
  <Box textAlign="center" fontFamily="body" color="black" as="td" bg={bg} py={2}>
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
  return 'ตรวจสอบประวัติ';
};

const handleClickByMode = (mode: SelectorMode, id: string): void => {
  if (mode === SelectorMode.Track) {
    Router.push('/grading/track/[id]', `/grading/track/${id}`);
  } else if (mode === SelectorMode.General) {
    Router.push('/grading/general/[id]', `/grading/general/${id}`);
  }
};

const CandidateSelector: React.FC<CandidateSelectorProps> = ({ mode, candidates }) => {
  const store = useStore();
  return (
    <>
      <Box as="table" w="100%">
        <Tr bg="pink.700">
          <Th>รหัสอ้างอิง</Th>
          <Th>สาขา</Th>
          <Th>คะแนนคำถามกลาง</Th>
          <Th>คะแนนคำถามสาขา</Th>
          <Th>ผู้ตรวจคำถามกลาง</Th>
          <Th>ผู้ตรวจคำถามสาขา</Th>
          <Th>สถานะ</Th>
          <Th>{displayMode(mode)}</Th>
        </Tr>
        {store.candidateStore.candidates.map(candidate => {
          return (
            <Tr bg="pink.100" key={candidate.id}>
              <Td>{candidate.id}</Td>
              <Td>{candidate.track}</Td>
              <Td>
                {getAverageScore([
                  candidate.gradingData.general.score.Q1,
                  candidate.gradingData.general.score.Q2,
                  candidate.gradingData.general.score.Q3,
                ])}
              </Td>
              <Td>{getAverageScore([candidate.gradingData.track.score.Q1, candidate.gradingData.track.score.Q2])}</Td>
              <Td>{candidate.gradingData.general.grader}</Td>
              <Td>{candidate.gradingData.track.grader}</Td>
              <Td>{candidate.status}</Td>
              <Td>
                <Button
                  onClick={(): void => {
                    handleClickByMode(mode, candidate.id);
                  }}
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
    </>
  );
};

export default React.memo(CandidateSelector);
