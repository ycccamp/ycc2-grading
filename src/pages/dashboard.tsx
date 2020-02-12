import { NextPage } from 'next';
import { Heading, Flex, Box, Text } from '@chakra-ui/core';
import Layout from '../components/Layout';

const Dashboard: NextPage = () => (
  <Layout>
    <Heading size="2xl">แดชบอร์ด</Heading>
    <Flex flexWrap="wrap" py={6}>
      <Box p={5} borderWidth="2px" borderColor="gray.200" borderStyle="solid" width={2 / 4}>
        <Heading mb={5} size="xl">
          จำนวนผู้สมัครรวม 23 คน
        </Heading>
        <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
          Programming 10 คน
        </Text>
        <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
          Design 5 คน
        </Text>
        <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
          Creative 8 คน
        </Text>
      </Box>
      <Box p={5} borderWidth="2px" borderColor="gray.200" borderStyle="solid" width={2 / 4}>
        <Heading mb={5} size="xl">
          สถานะการสมัคร
        </Heading>
        <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
          เรียบร้อย 5 คน
        </Text>
        <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
          กำลังกรอก 8 คน
        </Text>
        <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
          รอกดยืนยัน 10 คน
        </Text>
      </Box>
      <Box p={5} borderWidth="2px" borderColor="gray.200" borderStyle="solid" width={2 / 4}>
        <Heading mb={5} size="xl">
          สถานะการให้คะแนน
        </Heading>
        <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
          ตรวจเสร็จเรียบร้อย 5 คน
        </Text>
        <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
          กำลังตรวจ 10 คน
        </Text>
        <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
          ยังไม่เริ่ม 8 คน
        </Text>
      </Box>
      <Box p={5} borderWidth="2px" borderColor="gray.200" borderStyle="solid" width={2 / 4}>
        <Heading mb={5} size="xl">
          สถานะการคัดเลือก
        </Heading>
        <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
          ผ่านการคัดเลือก 1 คน
        </Text>
        <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
          ไม่ผ่านการคัดเลือก 3 คน
        </Text>
        <Text fontWeight="bold" fontSize="lg" fontFamily="heading">
          กำลังพิจารณา 19 คน
        </Text>
      </Box>
    </Flex>
  </Layout>
);

export default Dashboard;
