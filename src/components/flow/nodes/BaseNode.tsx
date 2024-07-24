import React from "react";
import NodeTitle from "./components/NodeTitle";
import NodeBody from "./components/NodeBody";

type Props = {
	data: {
		label: string;
		noClick?: boolean;
	};
	id: string;
};

export default function BaseNode({ data, id }: Props) {
	return (
		<NodeBody noClick={data.noClick} id={id}>
			<NodeTitle data={data} id={id} />
		</NodeBody>
	);
}
