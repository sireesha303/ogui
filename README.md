# ogui

## to use yarn link in the intalled 
1. install @otosense/ogui (yarn add @otosense/ogui)
2. ./client run 'yarn link @otosense/ogui'

## components' props

### Pipeline maker
```
interface IProps {
  options: string[];
  handleSelectChange: (val: string, i: number) => void;
  handleSave: VoidFunction;
  selectedValues: string[];
  setSelectedValues: (arr: string[]) => void;
  isMixedData?: boolean;
  mixedData?: any;
  filterMixedDataFunc?: (data: any) => string[];
}
```
### Stream2pyChart
```
interface IProps {
  arr: {X: number}[];
  setArr: VoidFunction;
  speed: number;
}
```
speed is in millisecond (1000 is 1 sec)


### DataTable
If you want to run the DataTable. please go to the Index.html file. and uncomment this or add this line if its not explicitly specified
```
<script type="module" src="/src/DataTable/main.tsx"></script>
```

Goto the DataTable Folder in Terminal and Start the server
```bash
  yarn dev
```

### DPP
If you want to run the DPP. please go to the Index.html file. and uncomment this or add this line if its not explicitly specified
```
<script type="module" src="/src/DPP/main.tsx"></script>
```

```bash
  yarn dev
```

### DataVisualizer
If you want to run the DataVisualizer. please go to the Index.html file. and uncomment this or add this line if its not explicitly specified

If you want to run the DataVisualizer Backend. Please see the Backend Folder there do 

```bash
  yarn 
  node ./index.js
```

```
<script type="module" src="/src/DataVisualizer/main.tsx"></script>
```

```bash
  yarn dev
```

Note We need to run Backend also, so please find the 'Backend' folder and open the folder in Terminal and run the command

```bash
  node index.js
```

### Table JSON maker
```
interface IFunctionCallerProps {
    schema: Object; // please refer to Schema File inside assets Folder. that how the schema structure is expected 
    liveValidate: boolean;
    func: (...args: any[]) => any | void;
}
```

If you want to run the Table JSON maker. please go to the Index.html file. and uncomment this or add this line if its not explicitly specified
```
<script type="module" src="/src/JsonForm/src/main.tsx"></script>
```

```bash
  yarn dev
```