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

const SelectionDialog: React.FC<SelectionDialogProps> = ({ isOpen, id, onClose, onSelect, onAlternate, onDelist }) => {
  const cancelRef = useRef();
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold" fontFamily="heading">
          {`คัดเลือกผู้สมัครรหัส ${id}`}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variantColor="green" onClick={onSelect}>
            ตัวจริง
          </Button>
          <Button variantColor="yellow" onClick={onAlternate}>
            ตัวสำรอง
          </Button>
          <Button variantColor="red" onClick={onDelist}>
            คัดออก
          </Button>
          <Button variantColor="red" variant="outline" onClick={onClose}>
            ออก
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SelectionDialog;
