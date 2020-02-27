import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  Button,
  Stack,
  useToast,
} from '@chakra-ui/core';
import SelectionDialogProps from '../@types/SelectionDialogProps';
import { useStore } from './StoreProvider';
import { SelectionType } from '../@types/Candidate';

const SelectionDialog: React.FC<SelectionDialogProps> = ({ isOpen, id, onClose }) => {
  const toast = useToast();
  const { candidateStore } = useStore();
  const cancelRef = useRef();
  const toastTitle = (selectionType: SelectionType) => {
    if (selectionType === 'selected') {
      return `เลือกผู้สมัคร ${id} เป็นตัวจริง`;
    }
    if (selectionType === 'alternate') {
      return `เลือกผู้สมัคร ${id} เป็นตัวสำรอง`;
    }
    return `คัดผู้สมัคร ${id} ออก`;
  };
  const select = (selectionType: SelectionType): void => {
    candidateStore.selectCandidate(id, selectionType);
    onClose();
    toast({
      title: toastTitle(selectionType),
      status: 'success',
      isClosable: true,
      position: 'bottom-right',
    });
  };
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
