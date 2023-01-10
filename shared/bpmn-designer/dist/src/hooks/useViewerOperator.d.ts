export default function useViewerOperator(containerHtmlId: string): {
    init: (diagram: string) => void;
    destroy: () => void;
};
