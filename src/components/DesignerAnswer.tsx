import { useState, useEffect } from 'react';
import { Image, Box } from '@chakra-ui/core';
import DesignerAnswerProps from '../@types/DesignerAnswerProps';
import firebase from '../constants/firebase';

const storage = firebase().storage();
const imageRef = storage.ref().child('registation/design');

const DesignerAnswer: React.FC<DesignerAnswerProps> = ({ candidate }) => {
  const [url, setUrl] = useState<string>('');
  useEffect(() => {
    if (candidate.track === 'designer') {
      imageRef
        .child(`${candidate.id}/image`)
        .listAll()
        .then(async c => {
          if (typeof c === 'undefined') {
            setUrl('https://loremflickr.com/320/240/jojo');
          } else {
            const imageUrl = await c.items[0].getDownloadURL();
            setUrl(imageUrl);
          }
        });
    }
  }, []);
  if (candidate.track === 'designer') {
    return (
      <Box>
        <Image size="300px" src={url} alt="YCC Logo by candidate" />
      </Box>
    );
  }
  return <></>;
};

export default DesignerAnswer;
