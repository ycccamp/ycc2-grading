import { Box, BoxProps, Button, Stack, Input, InputGroup, InputLeftElement, Icon, Select } from '@chakra-ui/core';

import Router from 'next/router';
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import CandidateSelectorProps, { SelectorMode } from '../@types/CandidateSelectorProps';
import { getAverageScore, paginate, getMaxPage } from '../core/utils';
import { useStore } from './StoreProvider';
import Candidate from '../@types/Candidate';

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

const handleClickByMode = (mode: SelectorMode, id: string): void => {
  if (mode === SelectorMode.Track) {
    Router.push('/grading/track/[id]', `/grading/track/${id}`);
  } else if (mode === SelectorMode.General) {
    Router.push('/grading/general/[id]', `/grading/general/${id}`);
  }
};

const CandidateSelector: React.FC<CandidateSelectorProps> = ({ mode, candidates }) => {
  const store = useStore();
  const [search, setSearch] = useState<string>('');
  const [track, setTrack] = useState<string>('all');
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    if (page >= getMaxPage(searchForMatch(search, filterCandidateByTrack(track, candidates)), 10)) {
      setPage(1);
    }
  }, [page]);
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
        <Select
          w="20%"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => setPage((e.target.value as unknown) as number)}
        >
          {[...Array(getMaxPage(searchForMatch(search, candidates), 10))].map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </Select>
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
          <Th>คะแนนคำถามกลาง</Th>
          <Th>คะแนนคำถามสาขา</Th>
          <Th>ผู้ตรวจคำถามกลาง</Th>
          <Th>ผู้ตรวจคำถามสาขา</Th>
          <Th>สถานะ</Th>
          <Th>{displayMode(mode)}</Th>
        </Tr>
        {paginate(searchForMatch(search, filterCandidateByTrack(track, candidates)), 10, page)
          .slice(0, 10)
          .map(candidate => {
            return (
              <Tr bg="pink.100" key={candidate.id}>
                <Td>{candidate.id}</Td>
                <Td>{candidate.track}</Td>
                <Td>0</Td>
                <Td>0</Td>
                <Td>โมส</Td>
                <Td>ไก่</Td>
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

export default observer(CandidateSelector);
