import { generateFromString } from 'generate-avatar';

class AvatarUtilities {
  private static instance = new AvatarUtilities();

  private constructor() {}

  public static getInstance(): AvatarUtilities {
    return this.instance;
  }

  public generate(id: string) : string {
    return `data:image/svg+xml;utf8,${generateFromString(id)}`;
  }
}

export const AvatarUtils = AvatarUtilities.getInstance();
