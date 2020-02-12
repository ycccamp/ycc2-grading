/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
import { Flex, Box, Heading, Stack, Button } from '@chakra-ui/core';
import Link from 'next/link';
import React from 'react';

// TODO: Add proper type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LinkButton = React.forwardRef((props: any, ref) => {
  return (
    <Button as="a" href={props.href} onClick={props.onClick} ref={ref} {...props}>
      {props.children}
    </Button>
  );
});

const Index: React.FC = () => (
  <Flex height="100vh" width="100vw" justify="center" alignItems="center" bg="pink.300" color="pink.800">
    <Box borderRadius="4px" textAlign="center" bg="white" p={16}>
      <Stack alignItems="center" spacing={6}>
        <Heading size="2xl">YCC Grading</Heading>
        <Link href="/dashboard" passHref>
          <LinkButton as="a" size="lg" variantColor="green">
            เข้าสู่ระบบ
          </LinkButton>
        </Link>
      </Stack>
    </Box>
  </Flex>
);

export default Index;
