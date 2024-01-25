import { HiCog } from "react-icons/hi";
// import { Tb123, TbAbc, TbPalette, TbRegexOff } from "react-icons/tb";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ControlButton,
  Controls,
  Handle,
  Node,
  Position,
  SelectionMode,
} from "reactflow";

import "../styles/flow.css";
import { useFigmaData } from "../hooks";
import { useMemo } from "react";

const classesForType = {
  BOOLEAN: "bg-neutral text-neutral-content",
  COLOR: "bg-primary text-primary-content",
  FLOAT: "bg-secondary text-secondary-content",
  STRING: "bg-accent text-accent-content",
};

const FigmaVarNode = ({
  data,
  selected,
}: {
  data: { label: string; v: Variable };
  selected: boolean;
}) => {
  return (
    <>
      <div
        className={`collapse collapse-arrow ${
          selected ? "collapse-open" : "collapse-close"
        } border border-base-300 bg-base-100 text-base-content
        ${classesForType[data.v.resolvedType]}
        `}
      >
        <input type="checkbox" />
        <div className="collapse-title">
          <h2
            title={data.label}
            className={`${
              selected
                ? ""
                : "whitespace-nowrap overflow-hidden text-ellipsis z-10"
            } font-medium`}
          >
            {data.label}
          </h2>
        </div>
        <div className="collapse-content bg-base-100 text-base-content">
          <div className=" p-4">
            <p>data</p>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Right} id="a" />
    </>
  );
};
const nodeTypes = { figmaVarNode: FigmaVarNode };

const Flow = () => {
  const { collections, variables } = useFigmaData();

  const nodes = useMemo(() => {
    const n: Node[] = [];

    collections.forEach((collection, i) => {
      n.push({
        id: collection.id,
        position: { x: 270 * i, y: 0 },
        type: "group",
        data: {
          label: collection.name,
        },
        style: {
          width: 220,
          height: collection.variables.length * 100 + 20,
        },
        className: "bg-base-100/60 text-base-content",
      });

      const { variables } = collection;
      variables.forEach((v, j) => {
        n.push({
          id: v.id,
          parentNode: collection.id,
          position: { x: 10, y: 110 + 100 * j },
          type: "figmaVarNode",
          data: {
            label: v.name,
            v,
          },
          extent: "parent",
          style: {
            width: 200,
            height: 100,
          },
        });
      });
    });

    return n;
  }, [collections]);

  const edges = useMemo(() => {
    return [];
  }, [variables]);

  console.log({ nodes, edges });

  return (
    <div className="border border-base-content/20 border-t-0 w-[800px] h-[600px]">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        fitView
        panOnScroll
        selectionOnDrag
        panOnDrag={[1, 2]}
        selectionMode={SelectionMode.Partial}
        nodesDraggable={false}
        nodesConnectable={false}
        edgesFocusable={false}
      >
        <Background
          color="rgba(100, 100, 100, .5)"
          variant={BackgroundVariant.Cross}
        />
        <Controls showInteractive={false}>
          <ControlButton>
            <label htmlFor="drawer">
              <HiCog className="w-[16] h-[16] max-h-[16] max-w-[16] text-primary-content cursor-pointer" />
            </label>
          </ControlButton>
        </Controls>
      </ReactFlow>
    </div>
  );
};

export default Flow;
