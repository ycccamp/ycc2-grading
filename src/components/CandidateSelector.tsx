import { Box, BoxProps } from '@chakra-ui/core';

// import CandidateSelectorProps from '../@types/Candidate';

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

const CandidateSelector: React.FC = () => (
  <Box as="table" w="100%">
    <Tr bg="pink.700">
      <Th>รหัสอ้างอิง</Th>
      <Th>สาขา</Th>
      <Th>ผู้ตรวจคำถามกลาง</Th>
      <Th>ผู้ตรวจคำถามสาขา</Th>
      <Th>สถานะ</Th>
    </Tr>
  </Box>
);

export default CandidateSelector;
