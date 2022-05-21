export type ContainerOption = {
    cols: number;
    slot: string;
    class: string;
};

export type ActionButtonOption = {
    color: string;
    icon: string;
    class: string;
    tooltip: string;
};

export type HttpSwitcher = 'GET' | 'PUT' | 'POST' | 'DEL';
