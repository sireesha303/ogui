import React, { useEffect, useState } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import * as API from '../API/API';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface Child {
    id: string;
    name?: string;
    children?: Child[];
    bt?: number[];
    tt?: number[];
    [key: string]: any;
}

interface Device {
    id: string;
    name?: string;
    children?: Child[];
    bt?: number[];
    tt?: number[];
}

const handleCopy = (label: string) => {
    navigator.clipboard.writeText(label)
        .then(() => {
            console.log("Text copied to clipboard: ", label);
            // Add your desired feedback or notification here
            // return <h1>Copied</h1>;
            alert("Id Copied" + ' ' + label);
        })
        .catch((error) => {
            console.error("Failed to copy text: ", error);
            // Add your desired error handling here
        });
};

const renderTree = (nodes: any, isRoot: boolean, i: number) => (
    <section key={i}>
        {isRoot && <button className='copy' onClick={() => handleCopy(`${nodes.id}`)}>
            {/* <img src={InfoOutlinedIcon} alt='copyButton' /> */}
            <InfoOutlinedIcon />
        </button>}
        <TreeItem key={nodes.id} nodeId={nodes.id} label={`${nodes.id}`}>
            {console.log('nodes', nodes)}

            {Object.entries(nodes).map(([key, value], index) => {
                if (key !== 'id' && key !== 'name' && key !== 'children' && key !== 'channels' && key !== 'annotations') {
                    return (
                        <>
                            <TreeItem key={`${nodes.id}-${key}`} nodeId={`${nodes.id}-${key}`} label={`${key}: ${value}`} />

                        </>

                    );
                }
                return null;
            })}
            {Array.isArray(nodes.children) ? (
                nodes.children.map((node: any, i: any) => renderTree(node, true, i))
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
                    {nodes.annotations.length > 0 ? (
                        nodes.annotations.map((annotation: any, index: number) => (
                            Object.entries(annotation).map(([key, value], index) => (
                                <>
                                    <TreeItem key={`${nodes.id}-${key}`} nodeId={`${nodes.id}-${key}`} label={`${key}: ${value}`} />
                                    {/* <button className='copy' onClick={() => handleCopy(`${key}: ${value}`)} style={{ border: "none", background: "transparent", padding: "0", cursor: "pointer" }}>i</button> */}
                                </>
                            ))
                        ))
                    ) : (
                        <TreeItem nodeId={`${nodes.id}-no-annotations`} label="[]">
                        </TreeItem>
                    )}
                </TreeItem>
            ) : null}
        </TreeItem>
    </section>
);


const transformData = (annotation: any[]): Device[] => {
    const transformedNodes: Device[] = [];

    for (const key in annotation) {
        const element = annotation[key];
        const children: Child[] = [];
        const child: Child = {
            id: element.id?.toString(),
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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log('StoreConfig', StoreConfig);
        const transformedNodes = transformData(StoreConfig);
        setDeviceNodes(transformedNodes);
    }, [StoreConfig]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await API.StoreConfig({ from_: Number(0), to_: Number(100) });
        console.log('response', response);
        setStoreConfig(response?.data || response);
        setIsLoading(false);
    };

    return (
        <>
            {isLoading ? (
                // Show the loader while loading
                <div>Loading...</div>
            ) : (
                // Render the tree view once the data is loaded
                <TreeView
                    aria-label="Store View"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >
                    {deviceNodes.map((node, i) => renderTree(node, false, i))}
                </TreeView>
            )}
        </>
    );
};

export default React.memo(StoreView);