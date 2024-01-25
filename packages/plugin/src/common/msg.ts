export type NormalizedVar = Pick<
  Variable,
  | "id"
  | "name"
  | "key"
  | "description"
  | "resolvedType"
  | "remote"
  | "scopes"
  | "valuesByMode"
  | "variableCollectionId"
>;

export type VarMap = Record<string, NormalizedVar>;

export type NormalizedCollection = Pick<
  VariableCollection,
  "id" | "key" | "name" | "remote" | "modes" | "defaultModeId" | "variableIds"
> & {
  variables: NormalizedVar[];
};

export type PostMessage =
  | {
      type: "refreshFigmaData";
    }
  | {
      type: "log";
      payload: {
        count: number;
        foo: boolean;
      };
    }
  | {
      type: "create";
    }
  | {
      type: "close";
    }
  | {
      type: "notifiy";
      payload: {
        message: string;
        options?: NotificationOptions;
      };
    };

export type UIPostMessagePayload = {
  fileKey: string;
  currentUser: string;
  collections: NormalizedCollection[];
  variables: VarMap;
};

export type UIPostMessage = {
  data: {
    pluginId: string;
    pluginMessage: UIPostMessagePayload;
  };
};

export const postToUI = (msg: UIPostMessagePayload) => {
  console.log("POST TO UI");
  figma.ui.postMessage(msg);
};

export const postToFigma = (msg: PostMessage) => {
  parent.postMessage({ pluginMessage: msg }, "*");
};
