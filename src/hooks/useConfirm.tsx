import { useState } from 'react';
import ConfirmationModal from '../components/сonfirmationModal/ConfirmationModal';

const useConfirm = (): [() => JSX.Element, (messages: string[]) => Promise<boolean>] => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    const confirm = (messages: string[]) => {
        setMessages(messages);
        return new Promise<boolean>((resolve) => {
            setPromise({ resolve });
        });
    };

    const handleConfirm = () => {
        promise?.resolve(true);
        setPromise(null);
    };

    const handleCancel = () => {
        promise?.resolve(false);
        setPromise(null);
    };

    const ConfirmationModalWrapper = () => (
        <ConfirmationModal
            open={promise !== null}
            messages={messages}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        />
    );

    return [ConfirmationModalWrapper, confirm];
};

export default useConfirm;
