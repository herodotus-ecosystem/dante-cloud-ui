import { lodash } from './base';

class BpmnLog {
  private static instance = new BpmnLog();
  private static types: string[] = ['primary', 'success', 'warn', 'error', 'info'];

  private constructor() {}

  public static getInstance(): BpmnLog {
    return this.instance;
  }

  private isArray(obj: any): boolean {
    return lodash.isArray(obj);
  }

  private switchColor = (type: string): string => {
    switch (type) {
      case 'primary':
        return '#2d8cf0';
      case 'success':
        return '#19be6b';
      case 'info':
        return '#909399';
      case 'warn':
        return '#ff9900';
      case 'error':
        return '#f03f14';
      default:
        return '#35495E';
    }
  };

  public print(type = 'default', text: any, back = false): void {
    if (typeof text === 'object') {
      this.isArray(text) ? console.table(text) : console.dir(text);
      return;
    }
    if (back) {
      // 如果是打印帶背景圖的
      console.log(
        `%c ${text} `,
        `background:${this.switchColor(type)}; padding: 2px; border-radius: 4px; color: #fff;`
      );
    } else {
      console.log(
        `%c ${text} `,
        `border: 1px solid ${this.switchColor(type)};
          padding: 2px; border-radius: 4px;
          color: ${this.switchColor(type)};`
      );
    }
  }

  public printBack(type = 'primary', text: string): void {
    this.print(type, text, true);
  }

  public pretty(type = 'primary', title: string, text: string): void {
    if (typeof text === 'object') {
      console.group('Console Group', title);
      console.log(
        `%c ${title}`,
        `background:${this.switchColor(type)};border:1px solid ${this.switchColor(type)};
          padding: 1px; border-radius: 4px; color: #fff;`
      );
      this.isArray(text) ? console.table(text) : console.dir(text);
      console.groupEnd();
      return;
    }
    console.log(
      `%c ${title} %c ${text} %c`,
      `background:${this.switchColor(type)};border:1px solid ${this.switchColor(type)};
        padding: 1px; border-radius: 4px 0 0 4px; color: #fff;`,
      `border:1px solid ${this.switchColor(type)};
        padding: 1px; border-radius: 0 4px 4px 0; color: ${this.switchColor(type)};`,
      'background:transparent'
    );
  }

  public prettyPrimary(title: string, ...text: any[]): void {
    text.forEach(t => this.pretty('primary', title, t));
  }

  public prettySuccess(title: string, ...text: any[]): void {
    text.forEach(t => this.pretty('success', title, t));
  }

  public prettyWarn(title: string, ...text: any[]): void {
    text.forEach(t => this.pretty('warn', title, t));
  }

  public prettyError(title: string, ...text: any[]): void {
    text.forEach(t => this.pretty('error', title, t));
  }

  public prettyInfo(title: string, ...text: any[]): void {
    text.forEach(t => this.pretty('info', title, t));
  }
}

export const Logger = BpmnLog.getInstance();
