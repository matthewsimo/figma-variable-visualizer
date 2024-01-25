import { postToUI, PostMessage, VarMap } from "./common/msg";
import { getNormalizedCollections } from "./common/utils";
// Figma Documentation Links:
// https://www.figma.com/plugin-docs/how-plugins-run
// https://www.figma.com/plugin-docs/api/api-reference/

figma.showUI(__html__, { themeColors: true });
figma.ui.resize(800, 600);

const settings = {
  includeLibraries: false,
};

const getFigmaData = async () => {
  console.log("GET FIGMA DATA", settings);
  const collections = getNormalizedCollections();
  const variables: VarMap = {};
  collections.forEach((collection) => {
    collection.variables.forEach((variable) => {
      variables[variable.id] = variable;
    });
  });

  const payload = {
    fileKey: figma.fileKey || "Unknown",
    currentUser: (figma.currentUser && figma.currentUser.name) || "Unknown",
    collections,
    variables,
  };
  console.log("Plugin:");
  console.log(payload);
  postToUI(payload);
};

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async (msg: PostMessage) => {
  console.log(`"${msg.type}" Message Received!`);

  switch (msg.type) {
    case "refreshFigmaData":
      await getFigmaData();
      break;
    case "log": // Demonstrate UI passing data to code.ts
      console.log("payload:");
      console.log(msg.payload);
      break;
    case "close":
      figma.closePlugin();
      break;
    case "notifiy":
      figma.notify(msg.payload.message, msg.payload.options || {});
      break;
    default:
      console.log("Unknown PostMessage Received");
      console.log({ msg });
  }
};
