import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  Button,
  Stack,
} from '@chakra-ui/core';
import SelectionDialogProps from '../@types/SelectionDialogProps';
import { useStore } from './StoreProvider';
import { SelectionType } from '../@types/Candidate';

const SelectionDialog: React.FC<SelectionDialogProps> = ({ isOpen, id, onClose }) => {
  const { candidateStore } = useStore();
  const cancelRef = useRef();
  const select = (selectionType: SelectionType): void => {
    candidateStore.selectCandidate(id, selectionType);
    onClose();
  }
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={(): void => onClose()}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold" fontFamily="heading">
          {`คัดเลือกผู้สมัครรหัส ${id}`}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Stack isInline spacing={3}>
            <Button variantColor="green" onClick={(): void => select('selected')}>
              ตัวจริง
            </Button>
            <Button variantColor="yellow" onClick={(): void => select('alternate')}>
              ตัวสำรอง
            </Button>
            <Button variantColor="red" onClick={(): void => select('delisted')}>
              คัดออก
            </Button>
            <Button ref={cancelRef} variantColor="red" variant="outline" onClick={(): void => onClose()}>
              ยกเลิก
            </Button>
          </Stack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SelectionDialog;
