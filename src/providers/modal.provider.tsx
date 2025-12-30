import { createContext, useContext, useState, type ReactNode } from 'react';

type ModalContextType = {
  openModal: (options: { title?: ReactNode; body?: ReactNode; footer?: ReactNode; onClose?: () => void }) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside ModalProvider');
  return ctx;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  // todo fix old dat blinking on modal open
  const [isOpen, setIsOpen] = useState(false);
  const [header, setHeader] = useState<ReactNode>(null);
  const [body, setBody] = useState<ReactNode>(null);
  const [footer, setFooter] = useState<ReactNode>(null);
  const [onCloseCallback, setOnCloseCallback] = useState<(() => void) | null>(null);

  const openModal = ({ title, body, footer, onClose }: { title?: ReactNode; body?: ReactNode; footer?: ReactNode; onClose?: () => void }) => {
    setHeader(title ?? null);
    setBody(body ?? null);
    setFooter(footer ?? null);
    setOnCloseCallback(() => onClose ?? null);
    setIsOpen(true);
  };

  const closeModal = () => {
    onCloseCallback?.();
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {isOpen && (
        <dialog
          className='modal fixed inset-0 z-50 modal-open'
          onClick={(e) => {
            e.stopPropagation();
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}>
          <div className='modal-box max-w-none w-fit' onClick={(e) => e.stopPropagation()}>
            {header && <div className='modal-header'>{header}</div>}
            <div className='modal-body py-4'>{body}</div>
            {footer && <div className='modal-action'>{footer}</div>}
          </div>
        </dialog>
      )}
    </ModalContext.Provider>
  );
};
