import Vue from "vue";
import Vuetify from "vuetify/lib";
import VueI18n from "vue-i18n";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.use(Vuetify);
Vue.use(VueI18n);

const messages = {
    en: {
        $vuetify: {
            badge: "Badge",
            close: "Close",
            dataIterator: {
                noResultsText: "No matching records found",
                loadingText: "Loading items...",
            },
            dataTable: {
                itemsPerPageText: "Rows per page:",
                ariaLabel: {
                    sortDescending: "Sorted descending.",
                    sortAscending: "Sorted ascending.",
                    sortNone: "Not sorted.",
                    activateNone: "Activate to remove sorting.",
                    activateDescending: "Activate to sort descending.",
                    activateAscending: "Activate to sort ascending.",
                },
                sortBy: "Sort by",
            },
            dataFooter: {
                itemsPerPageText: "Items per page:",
                itemsPerPageAll: "All",
                nextPage: "Next page",
                prevPage: "Previous page",
                firstPage: "First page",
                lastPage: "Last page",
                pageText: "{0}-{1} of {2}",
            },
            datePicker: {
                itemsSelected: "{0} selected",
            },
            noDataText: "No data available",
            carousel: {
                prev: "Previous visual",
                next: "Next visual",
                ariaLabel: {
                    delimiter: "Carousel slide {0} of {1}",
                },
            },
            calendar: {
                moreEvents: "{0} more",
            },
            fileInput: {
                counter: "{0} files",
                counterSize: "{0} files ({1} in total)",
            },
            timePicker: {
                am: "AM",
                pm: "PM",
            },
        },
    },
    zh: {
        $vuetify: {
            badge: "徽章",
            close: "关闭",
            dataIterator: {
                noResultsText: "没有符合条件的结果",
                loadingText: "加载中……",
            },
            dataTable: {
                itemsPerPageText: "每页数目：",
                ariaLabel: {
                    sortDescending: "：降序排列。",
                    sortAscending: "：升序排列。",
                    sortNone: "：未排序。",
                    activateNone: "点击以移除排序。",
                    activateDescending: "点击以降序排列。",
                    activateAscending: "点击以升序排列。",
                },
                sortBy: "排序方式",
            },
            dataFooter: {
                itemsPerPageText: "每页数目：",
                itemsPerPageAll: "全部",
                nextPage: "下一页",
                prevPage: "上一页",
                firstPage: "首页",
                lastPage: "尾页",
                pageText: "{0}-{1} 共 {2}",
            },
            datePicker: {
                itemsSelected: "已选择 {0}",
            },
            noDataText: "没有数据",
            carousel: {
                prev: "上一张",
                next: "下一张",
                ariaLabel: {
                    delimiter: "Carousel slide {0} of {1}",
                },
            },
            calendar: {
                moreEvents: "还有 {0} 项",
            },
            fileInput: {
                counter: "{0} 个文件",
                counterSize: "{0} 个文件（共 {1}）",
            },
            timePicker: {
                am: "AM",
                pm: "PM",
            },
        },
    },
};

const i18n = new VueI18n({
    locale: "zh", // set locale
    messages, // set locale messages
});

export default new Vuetify({
    icons: {
        iconfont: "md",
    },
    lang: {
        t: (key, ...params) => i18n.t(key, params),
    },
});
