
import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { useMounted } from '../../hooks/useMounted';

export default function ClientOnlyPortal({ children }: PropsWithChildren) {
  const [mounted] = useMounted();
  return mounted
    ? createPortal(children, document.getElementById('portal')!)
    : null;
}
