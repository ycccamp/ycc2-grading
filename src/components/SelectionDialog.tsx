import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/core';
import SelectionDialogProps from '../@types/SelectionDialogProps';
import { useStore } from './StoreProvider';

const SelectionDialog: React.FC<SelectionDialogProps> = ({ isOpen, id, onClose }) => {
  const { candidateStore } = useStore();
  const cancelRef = useRef();
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={(): void => onClose}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold" fontFamily="heading">
          {`คัดเลือกผู้สมัครรหัส ${id}`}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variantColor="green" onClick={(): void => candidateStore.selectCandidate(id, 'selected')}>
            ตัวจริง
          </Button>
          <Button variantColor="yellow" onClick={(): void => candidateStore.selectCandidate(id, 'alternate')}>
            ตัวสำรอง
          </Button>
          <Button variantColor="red" onClick={(): void => candidateStore.selectCandidate(id, 'delisted')}>
            คัดออก
          </Button>
          <Button ref={cancelRef} variantColor="red" variant="outline" onClick={(): void => onClose()}>
            ยกเลิก
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SelectionDialog;
