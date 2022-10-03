import { Quasar, Loading, AppFullscreen } from "quasar";
import { createI18n } from "vue-i18n";
const quasarLang = {
  isoName: "zh-CN",
  nativeName: "\u4E2D\u6587(\u7B80\u4F53)",
  label: {
    clear: "\u6E05\u7A7A",
    ok: "\u786E\u5B9A",
    cancel: "\u53D6\u6D88",
    close: "\u5173\u95ED",
    set: "\u8BBE\u7F6E",
    select: "\u9009\u62E9",
    reset: "\u91CD\u7F6E",
    remove: "\u79FB\u9664",
    update: "\u66F4\u65B0",
    create: "\u521B\u5EFA",
    search: "\u641C\u7D22",
    filter: "\u8FC7\u6EE4",
    refresh: "\u5237\u65B0",
    expand: (label) => label ? `\u5C55\u5F00"${label}"` : "\u6269\u5F20",
    collapse: (label) => label ? `\u6298\u53E0"${label}"` : "\u574D\u584C"
  },
  date: {
    days: "\u661F\u671F\u65E5_\u661F\u671F\u4E00_\u661F\u671F\u4E8C_\u661F\u671F\u4E09_\u661F\u671F\u56DB_\u661F\u671F\u4E94_\u661F\u671F\u516D".split("_"),
    daysShort: "\u5468\u65E5_\u5468\u4E00_\u5468\u4E8C_\u5468\u4E09_\u5468\u56DB_\u5468\u4E94_\u5468\u516D".split("_"),
    months: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"),
    monthsShort: "\u4E00\u6708_\u4E8C\u6708_\u4E09\u6708_\u56DB\u6708_\u4E94\u6708_\u516D\u6708_\u4E03\u6708_\u516B\u6708_\u4E5D\u6708_\u5341\u6708_\u5341\u4E00\u6708_\u5341\u4E8C\u6708".split("_"),
    headerTitle: (date) => new Intl.DateTimeFormat("zh-CN", {
      weekday: "short",
      month: "short",
      day: "numeric"
    }).format(date),
    firstDayOfWeek: 0,
    format24h: false,
    pluralDay: "\u5929"
  },
  table: {
    noData: "\u6CA1\u6709\u53EF\u7528\u6570\u636E",
    noResults: "\u627E\u4E0D\u5230\u5339\u914D\u7684\u6570\u636E",
    loading: "\u6B63\u5728\u52A0\u8F7D...",
    selectedRecords: (rows) => "\u5DF2\u9009\u62E9" + rows + "\u884C",
    recordsPerPage: "\u6BCF\u9875\u7684\u884C\u6570:",
    allRows: "\u5168\u90E8",
    pagination: (start, end, total) => start + "-" + end + " / " + total,
    columns: "\u5217"
  },
  editor: {
    url: "URL",
    bold: "\u7C97\u4F53",
    italic: "\u659C\u4F53",
    strikethrough: "\u5220\u9664\u7EBF",
    underline: "\u4E0B\u5212\u7EBF",
    unorderedList: "\u65E0\u5E8F\u5217\u8868",
    orderedList: "\u6709\u5E8F\u5217\u8868",
    subscript: "\u4E0B\u6807",
    superscript: "\u4E0A\u6807",
    hyperlink: "\u8D85\u94FE\u63A5",
    toggleFullscreen: "\u5168\u5C4F\u5207\u6362",
    quote: "\u5F15\u53F7",
    left: "\u5DE6\u5BF9\u9F50",
    center: "\u5C45\u4E2D\u5BF9\u9F50",
    right: "\u53F3\u5BF9\u9F50",
    justify: "\u4E24\u7AEF\u5BF9\u9F50",
    print: "\u6253\u5370",
    outdent: "\u51CF\u5C11\u7F29\u8FDB",
    indent: "\u589E\u52A0\u7F29\u8FDB",
    removeFormat: "\u6E05\u9664\u6837\u5F0F",
    formatting: "\u683C\u5F0F\u5316",
    fontSize: "\u5B57\u4F53\u5927\u5C0F",
    align: "\u5BF9\u9F50",
    hr: "\u63D2\u5165\u6C34\u5E73\u7EBF",
    undo: "\u64A4\u6D88",
    redo: "\u91CD\u505A",
    heading1: "\u6807\u9898\u4E00",
    heading2: "\u6807\u9898\u4E8C",
    heading3: "\u6807\u9898\u4E09",
    heading4: "\u6807\u9898\u56DB",
    heading5: "\u6807\u9898\u4E94",
    heading6: "\u6807\u9898\u516D",
    paragraph: "\u6BB5\u843D",
    code: "\u4EE3\u7801",
    size1: "\u975E\u5E38\u5C0F",
    size2: "\u6BD4\u8F83\u5C0F",
    size3: "\u6B63\u5E38",
    size4: "\u4E2D\u7B49\u504F\u5927",
    size5: "\u5927",
    size6: "\u975E\u5E38\u5927",
    size7: "\u8D85\u7EA7\u5927",
    defaultFont: "\u9ED8\u8BA4\u5B57\u4F53",
    viewSource: "\u67E5\u770B\u8D44\u6599"
  },
  tree: {
    noNodes: "\u6CA1\u6709\u53EF\u7528\u8282\u70B9",
    noResults: "\u627E\u4E0D\u5230\u5339\u914D\u7684\u8282\u70B9"
  }
};
const quasarIconSet = {
  name: "mdi-v6",
  type: {
    positive: "mdi-check-circle",
    negative: "mdi-alert",
    info: "mdi-information",
    warning: "mdi-exclamation"
  },
  arrow: {
    up: "mdi-arrow-up",
    right: "mdi-arrow-right",
    down: "mdi-arrow-down",
    left: "mdi-arrow-left",
    dropdown: "mdi-menu-down"
  },
  chevron: {
    left: "mdi-chevron-left",
    right: "mdi-chevron-right"
  },
  colorPicker: {
    spectrum: "mdi-gradient-vertical",
    tune: "mdi-tune",
    palette: "mdi-palette-swatch"
  },
  pullToRefresh: {
    icon: "mdi-refresh"
  },
  carousel: {
    left: "mdi-chevron-left",
    right: "mdi-chevron-right",
    up: "mdi-chevron-up",
    down: "mdi-chevron-down",
    navigationIcon: "mdi-circle"
  },
  chip: {
    remove: "mdi-close-circle",
    selected: "mdi-check"
  },
  datetime: {
    arrowLeft: "mdi-chevron-left",
    arrowRight: "mdi-chevron-right",
    now: "mdi-clock-outline",
    today: "mdi-calendar-today"
  },
  editor: {
    bold: "mdi-format-bold",
    italic: "mdi-format-italic",
    strikethrough: "mdi-format-strikethrough-variant",
    underline: "mdi-format-underline",
    unorderedList: "mdi-format-list-bulleted",
    orderedList: "mdi-format-list-numbered",
    subscript: "mdi-format-subscript",
    superscript: "mdi-format-superscript",
    hyperlink: "mdi-link",
    toggleFullscreen: "mdi-fullscreen",
    quote: "mdi-format-quote-close",
    left: "mdi-format-align-left",
    center: "mdi-format-align-center",
    right: "mdi-format-align-right",
    justify: "mdi-format-align-justify",
    print: "mdi-printer",
    outdent: "mdi-format-indent-decrease",
    indent: "mdi-format-indent-increase",
    removeFormat: "mdi-format-clear",
    formatting: "mdi-format-color-text",
    fontSize: "mdi-format-size",
    align: "mdi-format-align-left",
    hr: "mdi-minus",
    undo: "mdi-undo",
    redo: "mdi-redo",
    heading: "mdi-format-size",
    heading1: "mdi-format-header-1",
    heading2: "mdi-format-header-2",
    heading3: "mdi-format-header-3",
    heading4: "mdi-format-header-4",
    heading5: "mdi-format-header-5",
    heading6: "mdi-format-header-6",
    code: "mdi-code-tags",
    size: "mdi-format-size",
    size1: "mdi-numeric-1-box",
    size2: "mdi-numeric-2-box",
    size3: "mdi-numeric-3-box",
    size4: "mdi-numeric-4-box",
    size5: "mdi-numeric-5-box",
    size6: "mdi-numeric-6-box",
    size7: "mdi-numeric-7-box",
    font: "mdi-format-font",
    viewSource: "mdi-code-tags"
  },
  expansionItem: {
    icon: "mdi-chevron-down",
    denseIcon: "mdi-menu-down"
  },
  fab: {
    icon: "mdi-plus",
    activeIcon: "mdi-close"
  },
  field: {
    clear: "mdi-close-circle",
    error: "mdi-alert-circle"
  },
  pagination: {
    first: "mdi-chevron-double-left",
    prev: "mdi-chevron-left",
    next: "mdi-chevron-right",
    last: "mdi-chevron-double-right"
  },
  rating: {
    icon: "mdi-star"
  },
  stepper: {
    done: "mdi-check",
    active: "mdi-pencil",
    error: "mdi-alert"
  },
  tabs: {
    left: "mdi-chevron-left",
    right: "mdi-chevron-right",
    up: "mdi-chevron-up",
    down: "mdi-chevron-down"
  },
  table: {
    arrowUp: "mdi-arrow-up",
    warning: "mdi-alert",
    firstPage: "mdi-chevron-double-left",
    prevPage: "mdi-chevron-left",
    nextPage: "mdi-chevron-right",
    lastPage: "mdi-chevron-double-right"
  },
  tree: {
    icon: "mdi-play"
  },
  uploader: {
    done: "mdi-check",
    clear: "mdi-close",
    add: "mdi-plus-box",
    upload: "mdi-cloud-upload",
    removeQueue: "mdi-notification-clear-all",
    removeUploaded: "mdi-check-all"
  }
};
const materialIcons = "";
const mdiV6 = "";
const quasar = "";
const setupQuasar = (app) => {
  app.use(Quasar, {
    plugins: { Loading, AppFullscreen },
    lang: quasarLang,
    iconSet: quasarIconSet,
    config: {
      loading: {
        color: "primary",
        size: "100px",
        spinnerColor: "primary"
      }
    }
  });
};
const en_US = {
  validations: {
    alpha: "The {property} property may only contain alphabetic characters",
    alpha_num: "The {property} property may only contain alpha-numeric characters",
    alpha_dash: "The {property} property may contain alpha-numeric characters as well as dashes and underscores",
    alpha_spaces: "The {property} property may only contain alphabetic characters as well as spaces",
    between: "The {property} property must be between 0:{min} and 1:{max}",
    confirmed: "The {property} property confirmation does not match",
    digits: "The {property} property must be numeric and exactly contain 0:{length} digits",
    dimensions: "The {property} property must be 0:{width} pixels by 1:{height} pixels",
    email: "The {property} property must be a valid email",
    excluded: "The {property} property is not a valid value",
    ext: "The {property} property is not a valid file",
    image: "The {property} property must be an image",
    integer: "The {property} property must be an integer",
    length: "The {property} property must be 0:{length} long",
    max_value: "The {property} property must be 0:{max} or less",
    max: "The {property} property may not be greater than 0:{length} characters",
    mimes: "The {property} property must have a valid file type",
    min_value: "The {property} property must be 0:{min} or more",
    min: "The {property} property must be at least 0:{length} characters",
    numeric: "The {property} property may only contain numeric characters",
    one_of: "The {property} property is not a valid value",
    regex: "The {property} property format is invalid",
    required_if: "The {property} property is required",
    required: "The {property} property is required",
    size: "The {property} property size must be less than 0:{size}KB",
    url: "The {property} property is not a valid URL"
  }
};
const zh_CN = {
  validations: {
    alpha: "{property}\u53EA\u80FD\u5305\u542B\u5B57\u6BCD\u5B57\u7B26",
    alpha_dash: "{property}\u80FD\u591F\u5305\u542B\u5B57\u6BCD\u6570\u5B57\u5B57\u7B26\u3001\u7834\u6298\u53F7\u548C\u4E0B\u5212\u7EBF",
    alpha_num: "{property}\u53EA\u80FD\u5305\u542B\u5B57\u6BCD\u6570\u5B57\u5B57\u7B26",
    alpha_spaces: "{property}\u53EA\u80FD\u5305\u542B\u5B57\u6BCD\u5B57\u7B26\u548C\u7A7A\u683C",
    between: "{property}\u5FC5\u987B\u57280:{min}\u4E0E1:{max}\u4E4B\u95F4",
    confirmed: "{property}\u4E0D\u80FD\u548C0:{target}\u5339\u914D",
    digits: "{property}\u5FC5\u987B\u662F\u6570\u5B57\uFF0C\u4E14\u7CBE\u786E\u52300:{length}\u4F4D\u6570",
    dimensions: "{property}\u5FC5\u987B\u57280:{width}\u50CF\u7D20\u4E0E1:{height}\u50CF\u7D20\u4E4B\u95F4",
    email: "{property}\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684\u90AE\u7BB1",
    excluded: "{property}\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u503C",
    ext: "{property}\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684\u6587\u4EF6",
    image: "{property}\u4E0D\u662F\u4E00\u5F20\u6709\u6548\u7684\u56FE\u7247",
    one_of: "{property}\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u503C",
    integer: "{property}\u5FC5\u987B\u662F\u6574\u6570",
    length: "{property}\u957F\u5EA6\u5FC5\u987B\u4E3A0:{length}",
    max: "{property}\u4E0D\u80FD\u8D85\u8FC70:{length}\u4E2A\u5B57\u7B26",
    max_value: "{property}\u5FC5\u987B\u5C0F\u4E8E\u6216\u7B49\u4E8E0:{max}",
    mimes: "{property}\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684\u6587\u4EF6\u7C7B\u578B",
    min: "{property}\u5FC5\u987B\u81F3\u5C11\u67090:{length}\u4E2A\u5B57\u7B26",
    min_value: "{property}\u5FC5\u987B\u5927\u4E8E\u6216\u7B49\u4E8E0:{min}",
    numeric: "{property}\u53EA\u80FD\u5305\u542B\u6570\u5B57\u5B57\u7B26",
    regex: "{property}\u683C\u5F0F\u65E0\u6548",
    required: "{property}\u4E0D\u80FD\u4E3A\u7A7A",
    required_if: "{property}\u662F\u5FC5\u987B\u7684",
    size: "{property}\u5FC5\u987B\u5C0F\u4E8E0:{size}KB",
    url: "{property}\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684URL"
  }
};
const i18n = createI18n({
  legacy: false,
  locale: "zh",
  fallbackLocale: "en",
  messages: {
    en: en_US,
    zh: zh_CN
  }
});
const setupI18n = (app) => {
  app.use(i18n);
};
export {
  setupI18n,
  setupQuasar
};
