import React, {
  InputHTMLAttributes,
  useState,
  useCallback,
  useRef,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isErrored, setIisErrored] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
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
      <input
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onError={handleError}
        ref={inputRef}
      />
    </Container>
  );
};

export default Input;
