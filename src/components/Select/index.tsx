/* eslint-disable no-underscore-dangle */
import React, {
  SelectHTMLAttributes,
  useState,
  useCallback,
  useRef,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface ClassRoomProps {
  name: string;
  _id: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  options?: Array<ClassRoomProps>;
}

const Select: React.FC<SelectProps> = ({ icon: Icon, options, ...rest }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isErrored, setIisErrored] = useState(false);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!selectRef.current?.value);
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
      <select
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onError={handleError}
        ref={selectRef}
      >
        <option value="" disabled selected hidden>
          Selecione uma opção
        </option>
        {options?.map(option => {
          return (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          );
        })}
      </select>
    </Container>
  );
};

export default Select;
