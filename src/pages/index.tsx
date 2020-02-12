import { Flex, Box, Heading, Stack, Button } from '@chakra-ui/core';

const Index: React.FC = () => (
  <Flex height="100vh" width="100vw" justify="center" alignItems="center" bg="pink.300" color="pink.800">
    <Box borderRadius="4px" textAlign="center" bg="white" p={16}>
      <Stack alignItems="center" spacing={6}>
        <Heading size="2xl">YCC Grading</Heading>
        <Button size="lg" variantColor="green">
          เข้าสู่ระบบ
        </Button>
      </Stack>
    </Box>
  </Flex>
);

export default Index;
