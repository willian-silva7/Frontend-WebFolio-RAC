import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { Container } from './styles';

interface Props {
  onFileUpload: (file: Array<File>) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUpload }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(
    acceptedFiles => {
      const files = acceptedFiles;

      // eslint-disable-next-line array-callback-return
      files.map((file: File): void => {
        const filesUrl = URL.createObjectURL(file);

        setSelectedFileUrl(filesUrl);
        onFileUpload(files);
      });
    },
    [onFileUpload],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Container>
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} multiple />

        {selectedFileUrl ? (
          <img src={selectedFileUrl} alt="Point Thumbnail" />
        ) : (
          <p>
            {' '}
            <FiUpload />
            Clique aqui para adicionar arquivos ou arraste um arquivo aqui
          </p>
        )}
      </div>
    </Container>
  );
};

export default Dropzone;
