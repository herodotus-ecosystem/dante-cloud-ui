## lib 文件夹内容说明

lib 文件夹中，存放非常通用和核心的代码，其代码均是没有任何个性化内容的通用代码。

### declarations

1. declarations 文件夹内，主要放置的是 Typescript 声明代码。
2. 与 types 文件下的内容的区别是： types 文件夹下内容为全局声明，无须 Import；declarations 中的声明需要 Import

### definitions

1. 通用的核心代码。
2. 与 utils 文件下的内容的区别是： utils 也是通用的工具型代码，但是存在针对某个项目或者某个情况的个性化代码；definitions 中的代码，是放之四海而皆准的代码（放到其它工程中，直接拷贝一点都不需要改的代码）
