class Http {
    private static instance = new Http();

    private constructor() {}

    public static getInstance(): Http {
        return this.instance;
    }

    private display = {
        PUT: { color: 'warning', icon: 'mdi-book-minus-multiple' },
        DELETE: { color: 'error', icon: 'mdi-book-remove-multiple' },
        POST: { color: 'success', icon: 'mdi-book-plus-multiple' },
        GET: { color: 'info', icon: 'mdi-book-multiple' },
    };

    private defaultDisplay = { color: 'success', icon: 'mdi-book-multiple' };

    private displaySwitcher(type, property): string {
        const switcher = this.display[type];
        if (switcher) {
            return switcher[property];
        } else {
            return this.defaultDisplay[property];
        }
    }

    public colorSwitcher(type: string): string {
        return this.displaySwitcher(type, 'color');
    }

    public iconSwitcher(type: string): string {
        return this.displaySwitcher(type, 'icon');
    }
}

export const HTTP: Http = Http.getInstance();
