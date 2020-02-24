import { useState, useEffect } from 'react';
import { Image, Box } from '@chakra-ui/core';
import DesignerAnswerProps from '../@types/DesignerAnswerProps';
import firebase from '../constants/firebase';

const storage = firebase().storage();
const imageRef = storage.ref().child('design');

const DesignerAnswer: React.FC<DesignerAnswerProps> = ({ candidate }) => {
  const [url, setUrl] = useState<string>('');
  useEffect(() => {
    if (candidate.track === 'designer') {
      imageRef
        .child(candidate.id)
        .listAll()
        .then(c => {
          c.items[0].getDownloadURL().then(retrievedUrl => {
            setUrl(retrievedUrl);
          });
        });
    }
  }, []);
  if (candidate.track === 'designer') {
    return (
      <Box>
        <Image src={url} alt="YCC Logo by candidate" />
      </Box>
    );
  }
  return <></>;
};

export default DesignerAnswer;
