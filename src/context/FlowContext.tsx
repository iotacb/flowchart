import { ReactFlowInstance } from "@xyflow/react";
import { createContext } from "react";

export type FlowContextType = {
	onSomethingChanged: (id?: number | string) => void;
	flowInstance: ReactFlowInstance | undefined;
};

export const FlowContext = createContext<FlowContextType>({
	onSomethingChanged: (id?: number | string) => {},
	flowInstance: undefined,
});

export const FlowContextProvider = FlowContext.Provider;
