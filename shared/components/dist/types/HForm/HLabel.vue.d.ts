interface Props {
    size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'caption' | 'overline' | 'subtitle-1' | 'subtitle-2' | 'body-1' | 'body-2' | '';
    weight?: 'thin' | 'light' | 'regular' | 'medium' | 'bold' | 'bolder';
    align?: 'left' | 'right' | 'center' | 'justify';
    text: string;
}
declare const _default: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "caption" | "overline" | "subtitle-1" | "subtitle-2" | "body-1" | "body-2" | "";
    align: "left" | "right" | "center" | "justify";
    weight: "thin" | "light" | "regular" | "medium" | "bold" | "bolder";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
