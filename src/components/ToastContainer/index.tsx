import React, { useCallback } from 'react';
// import { useTransition } from 'react-spring';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';
import { useToast } from '../../hooks/ToastContext';
import { Container, Toast } from './styles';

interface ToastMessage {
  id: string;
  type?: string;
  title: string;
  description: string;
}

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const { removeToast } = useToast();

  // const messageWithTransitions = useTransition(
  //   messages,
  //   message => message.id,
  //   {
  //     from: { right: '-120%' },
  //     enter: { right: '0%' },
  //     leave: { right: '-120%' },
  //   },
  // );

  const HandleTimer = useCallback(
    id => {
      const timer = setTimeout(() => {
        removeToast(id);
      }, 4000);

      return () => {
        clearTimeout(timer);
      };
    },
    [removeToast],
  );

  return (
    // <Container>
    //   {messageWithTransitions.map(({ state, key, props, item }) => (
    //     <Toast key={item.id} type={item.type}>
    //       {item.type === 'success' ? <FiCheckCircle size={20} /> : null}
    //       {item.type === 'error' ? <FiAlertCircle size={20} /> : null}
    //       {!item.type && <FiInfo size={20} />}

    //       <div>
    //         <strong>{item.title}</strong>
    //         <p>{item.description}</p>
    //       </div>

    //       <button onClick={() => removeToast(item.id)} type="button">
    //         <FiXCircle size={18} />
    //       </button>

    //       {item.id && HandleTimer(item.id)}
    //     </Toast>
    //   ))}
    // </Container>
    <Container>
      {messages.map(message => (
        <Toast key={message.id} type={message.type}>
          {message.type === 'success' ? <FiCheckCircle size={20} /> : null}
          {message.type === 'error' ? <FiAlertCircle size={20} /> : null}
          {!message.type && <FiInfo size={20} />}

          <div>
            <strong>{message.title}</strong>
            <p>{message.description}</p>
          </div>

          <button onClick={() => removeToast(message.id)} type="button">
            <FiXCircle size={18} />
          </button>

          {message.id && HandleTimer(message.id)}
        </Toast>
      ))}
    </Container>
  );
};

export default ToastContainer;
