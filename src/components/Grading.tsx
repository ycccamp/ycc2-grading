import { FormControl, Stack, FormLabel, Input, Button, Box, Flex } from '@chakra-ui/core';
import CandidateGradingViewProps from '../@types/CandidateGradingViewProps';

const Grading: React.FC<Partial<CandidateGradingViewProps>> = ({ mode, candidate }) => {
  return (
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
  );
};

export default Grading;
