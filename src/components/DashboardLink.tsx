import { Link as UILink } from '@chakra-ui/core';
import Link from 'next/link';
import DashbaordLinkProps from '../@types/DashboardLinkProps';

const DashbaordLink: React.FC<DashbaordLinkProps> = ({ link, text }) => (
  <Link passHref href={link}>
    <UILink _hover={{ bg: 'gray.800' }} py={4} px={6} width="100%" display="block" color="gray.200">
      {text}
    </UILink>
  </Link>
);

export default DashbaordLink;
