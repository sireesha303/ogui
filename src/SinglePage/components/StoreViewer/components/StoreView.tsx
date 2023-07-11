import React, { useEffect, useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import * as API from '../API/API';

interface Child {
    id: string;
    name?: string;
    children?: Child[];
    bt?: number[];
    tt?: number[];
}

interface Device {
    id: string;
    name?: string;
    children?: Child[];
    bt?: number[];
    tt?: number[];
}
const renderTree = (nodes: any) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={`${nodes.id}`}>
        {Object.entries(nodes).map(([key, value], index) => {
            if (key !== 'id' && key !== 'name' && key !== 'children' && key !== 'channels' && key !== 'annotations') {
                return (
                    <TreeItem key={`${nodes.id}-${key}`} nodeId={`${nodes.id}-${key}`} label={`${key}: ${value}`} />
                );
            }
            return null;
        })}
        {Array.isArray(nodes.children) ? (
            nodes.children.map((node: any, i: any) => renderTree(node, i))
        ) : null}
        {Array.isArray(nodes.channels) ? (
            <TreeItem nodeId={`${nodes.id}-channels`} label="Channels">
                {nodes.channels.map((channel: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined, index: any) => (
                    <TreeItem
                        key={`${nodes.id}-channel-${index}`}
                        nodeId={`${nodes.id}-channel-${index}`}
                        label={channel}
                    />
                ))}
            </TreeItem>
        ) : null}
        {Array.isArray(nodes.annotations) ? (
            <TreeItem nodeId={`${nodes.id}-annotations`} label="Annotations">
                {nodes.annotations.map((annotation: any, index: number) => (
                    Object.entries(annotation).map(([key, value], index) => {
                        return (
                            <TreeItem key={`${nodes.id}-${key}`} nodeId={`${nodes.id}-${key}`} label={`${key}: ${value}`} />
                        );
                    })
                ))}
            </TreeItem>
        ) : null}
    </TreeItem>
);


const transformData = (annotation: any[]): Device[] => {
    const transformedNodes: Device[] = [];

    for (const key in annotation) {
        const element = annotation[key];
        const children: Child[] = [];
        const child: Child = {
            id: element.id.toString(),
        };

        for (const field in element) {
            if (Array.isArray(element[field])) {
                child[field] = element[field];
            }
            if (
                field !== 'annotations' &&
                field !== 'channels'
            ) {
                child[field] = element[field];
            }
        }
        children.push(child);

        const deviceNode: Device = {
            id: key,
            name: key,
            children,
        };

        transformedNodes.push(deviceNode);
    }

    return transformedNodes;
};

const StoreView = () => {
    const [deviceNodes, setDeviceNodes] = useState<Device[]>([]);
    const [StoreConfig, setStoreConfig] = useState<Device[]>([]);

    useEffect(() => {
        const transformedNodes = transformData(StoreConfig);
        setDeviceNodes(transformedNodes);
    }, [StoreConfig]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await API.StoreConfig();
        console.log('response', response);
        setStoreConfig(response.data);
    };

    return (
        <TreeView
            aria-label="Store View"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {deviceNodes.map((node, i) => renderTree(node, i))}
        </TreeView>
    );
};

export default React.memo(StoreView);
