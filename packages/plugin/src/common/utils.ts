/**
 * Put the utils you need to build your plugin here
 */

import { NormalizedCollection, NormalizedVar } from "./msg";

export const normalizeVar = (v: Variable): NormalizedVar => {
  return {
    id: v.id,
    name: v.name,
    key: v.key,
    description: v.description,
    resolvedType: v.resolvedType,
    remote: v.remote,
    scopes: v.scopes,
    valuesByMode: v.valuesByMode,
    variableCollectionId: v.variableCollectionId,
  };
};

export const getNormalizedCollections = (): NormalizedCollection[] => {
  // Ignore all collections start with a `.`
  const collections = figma.variables
    .getLocalVariableCollections()
    .filter((collection) => !collection.name.startsWith("."));

  collections.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

  // Add all Variables to this collection
  return collections.map((collection) => {
    const variables: NormalizedVar[] = (
      collection.variableIds
        .map((variableId) => figma.variables.getVariableById(variableId))
        .filter((v) => v !== null) as Variable[]
    ).map((v) => normalizeVar(v));

    variables.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

    return {
      id: collection.id,
      key: collection.key,
      name: collection.name,
      remote: collection.remote,
      modes: collection.modes,
      defaultModeId: collection.defaultModeId,
      variableIds: collection.variableIds,
      variables,
    };
  });
};
