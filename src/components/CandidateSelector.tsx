import { Box, BoxProps, Button } from '@chakra-ui/core';

import CandidateSelectorProps, { SelectorMode } from '../@types/CandidateSelectorProps';

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
  if (mode === SelectorMode.Grading) {
    return 'ให้คะแนน';
  }
  if (mode === SelectorMode.Selecting) {
    return 'คัดเลือกผู้สมัคร';
  }
  return 'ตรวจสอบประวัติ';
};

const CandidateSelector: React.FC<CandidateSelectorProps> = ({ mode, candidates }) => {
  return (
    <Box as="table" w="100%">
      <Tr bg="pink.700">
        <Th>รหัสอ้างอิง</Th>
        <Th>สาขา</Th>
        <Th>ผู้ตรวจคำถามกลาง</Th>
        <Th>ผู้ตรวจคำถามสาขา</Th>
        <Th>สถานะ</Th>
        <Th>{displayMode(mode)}</Th>
      </Tr>
      {candidates.map(candidate => {
        return (
          <Tr bg="pink.100" key={candidate.id}>
            <Td>{candidate.id}</Td>
            <Td>{candidate.track}</Td>
            <Td>{candidate.graders.general}</Td>
            <Td>{candidate.graders.track}</Td>
            <Td>{candidate.status}</Td>
            <Td>
              <Button variantColor="blue">{displayMode(mode)}</Button>
            </Td>
          </Tr>
        );
      })}
    </Box>
  );
};

export default CandidateSelector;
