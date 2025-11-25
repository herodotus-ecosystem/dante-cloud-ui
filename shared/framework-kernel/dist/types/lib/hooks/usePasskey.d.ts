export default function usePasskey(): {
    isSupported: () => Promise<boolean>;
    registration: (label: string) => Promise<boolean>;
    authenticator: () => Promise<boolean>;
};
