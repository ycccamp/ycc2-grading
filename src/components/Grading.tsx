import { FormControl, Stack, FormLabel, Input, Button, Box, Flex, BoxProps } from '@chakra-ui/core';
import CandidateGradingViewProps from '../@types/CandidateGradingViewProps';

const Th: React.FC<BoxProps> = ({ children, as }) => (
  <Box py={2} fontFamily="heading" as={as || 'th'} bg="pink.700" color="white">
    {children}
  </Box>
);

const Tr: React.FC<BoxProps> = ({ children }) => (
  <Box as="tr" p={4} bg="pink.300" color="black">
    {children}
  </Box>
);

const Td: React.FC<BoxProps> = ({ children }) => (
  <Box textAlign="center" fontFamily="body" color="black" as="td" bg="pink.300" py={2}>
    {children}
  </Box>
);

const Grading: React.FC<Partial<CandidateGradingViewProps>> = ({ mode, candidate }) => {
  return (
    <Box>
      <FormControl w="100%">
        <Stack width="100%" spacing={4}>
          <Flex width="100%">
            <FormLabel width="39%">ให้คะแนนคำถามที 1</FormLabel>
            <Input max="10" mx={2} type="number" width="10%" />
            <Button variantColor="green" width="20%">
              บันทึกคะแนน
            </Button>
          </Flex>
          <Flex width="100%">
            <FormLabel width="39%">ให้คะแนนคำถามที 2</FormLabel>
            <Input max="10" mx={2} type="number" width="10%" />
            <Button variantColor="green" width="20%">
              บันทึกคะแนน
            </Button>
          </Flex>
          <Flex width="100%">
            <FormLabel width="39%">ให้คะแนนคำถามที 3</FormLabel>
            <Input max="10" mx={2} type="number" width="10%" />
            <Button variantColor="green" width="20%">
              บันทึกคะแนน
            </Button>
          </Flex>
        </Stack>
      </FormControl>
      <Box mt={4} w="100%" as="table">
        <Tr>
          <Th>คนให้คะแนน</Th>
          <Th>Q1</Th>
          <Th>Q2</Th>
          <Th>Q3</Th>
        </Tr>
        <Tr>
          <Td>โมส</Td>
          <Td>8</Td>
          <Td>7</Td>
          <Td>7</Td>
        </Tr>
      </Box>
    </Box>
  );
};

export default Grading;
