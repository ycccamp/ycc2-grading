import { Flex, Box, Stack, Button } from '@chakra-ui/core';
import DashbaordLink from './DashboardLink';

const Layout: React.FC = ({ children }) => (
  <Flex justify="flex-start" width="100vw" height="100%">
    <Box bg="gray.700" color="gray.100" height="100%" width={1 / 6}>
      <Stack spacing={4} width="100%">
        <DashbaordLink text="Dashboard" link="/dashboard" />
        <DashbaordLink text="คัดเลือกผู้สมัคร" link="/select" />
        <DashbaordLink text="ให้คะแนนคำถามกลาง" link="/grading/general" />
        <DashbaordLink text="ให้คะแนนคำถามสาขา" link="/grading/track" />
        <DashbaordLink text="ผู้ผ่านการคัดเลือก" link="/selected" />
      </Stack>
      <Stack mt={10} alignItems="center" width="100%">
        <Button textAlign="center" width="90%" variantColor="red" mt="auto">
          ออกจากระบบ
        </Button>
      </Stack>
    </Box>
    <Box width={5 / 6} p={6}>
      {children}
    </Box>
  </Flex>
);

export default Layout;
