import { FlowContext } from "@/context/FlowContext";
import { useContext } from "react";

export const useFlow = () => {
	return useContext(FlowContext);
};
