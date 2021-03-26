import React, {
  TextareaHTMLAttributes,
  useState,
  useCallback,
  useRef,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Textarea: React.FC<TextareaProps> = ({ icon: Icon, ...rest }) => {
  const texteareaRef = useRef<HTMLTextAreaElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isErrored, setIisErrored] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!texteareaRef.current?.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleError = useCallback(() => {
    setIisErrored(true);
  }, []);

  return (
    <Container
      isErrored={!!isErrored}
      isFocused={isFocused}
      isFilled={isFilled}
    >
      {Icon && <Icon size={20} />}
      <textarea
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onError={handleError}
        ref={texteareaRef}
      />
    </Container>
  );
};

export default Textarea;
