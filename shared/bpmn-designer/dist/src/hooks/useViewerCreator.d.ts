export default function useViewerCreator(containerHtmlId: string, height: string | number | undefined, width: string | number | undefined, highlightNodes: Array<string>): {
    init: (diagram: string) => void;
    destroy: () => void;
};
