type Dictionary<T> = { [key: string]: T };

type EmptyObject = {
    [K in string]: never;
};
