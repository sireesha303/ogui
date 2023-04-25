"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTable = void 0;
var react_1 = __importStar(require("react"));
var material_1 = require("@mui/material");
var utils_1 = require("@mui/utils");
var DoneAll_1 = __importDefault(require("@mui/icons-material/DoneAll"));
var tableStyles_1 = require("./tableStyles");
var Row_1 = require("./Row");
var SearchFilterSideMenu_1 = require("./SearchFilterSideMenu");
var DataTableFooter_1 = require("./DataTableFooter");
var components_1 = require("@otosense/components");
var renderHeaders = function (columns, orderBy, order, onOrderChange) {
    return (react_1.default.createElement(react_1.default.Fragment, null, columns.map(function (c, i) {
        if (c.orderBy != null) {
            return (react_1.default.createElement(material_1.TableCell, { key: "header-".concat(i), sx: { background: '#fff' }, sortDirection: orderBy === c.orderBy ? order : false },
                react_1.default.createElement(material_1.TableSortLabel, { active: orderBy === c.orderBy, direction: orderBy === c.orderBy ? order : 'asc', onClick: function () {
                        onOrderChange(c.orderBy);
                    } },
                    c.label,
                    orderBy === c.orderBy
                        ? (react_1.default.createElement(material_1.Box, { component: "span", sx: utils_1.visuallyHidden }, order === 'desc' ? 'sorted descending' : 'sorted ascending'))
                        : null)));
        }
        return react_1.default.createElement(material_1.TableCell, { key: "header-".concat(i), sx: { background: '#fff' } }, c.label);
    })));
};
var DataTable = function (props) {
    var _a, _b, _c;
    var _d = (0, react_1.useState)(-1), expandedRow = _d[0], setExpandedRow = _d[1];
    var _e = (0, react_1.useState)(new Set()), selectedItems = _e[0], setSelectedItems = _e[1];
    var onChangeSelectItem = function (item) {
        if (props.isMultiSelect === true) {
            var _difference = new Set(selectedItems);
            if (_difference.has(item)) {
                _difference.delete(item);
            }
            else {
                _difference.add(item);
            }
            setSelectedItems(_difference);
            props.onSelectItems(Array.from(_difference));
        }
        else {
            setSelectedItems(new Set([item]));
            props.onSelectItems([item]);
        }
    };
    var addOrRemoveAllItemsInView = function () {
        var _a;
        if (((_a = props.data) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            var firstItem = props.data[0];
            var _difference_1 = new Set(selectedItems);
            if (selectedItems.has(firstItem)) {
                props.data.forEach(function (v) { return _difference_1.delete(v); });
            }
            else {
                props.data.forEach(function (v) { return _difference_1.add(v); });
            }
            setSelectedItems(_difference_1);
            props.onSelectItems(Array.from(_difference_1));
        }
    };
    var collapseWrap = function (f) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            setExpandedRow(-1);
            f.apply(void 0, args);
        };
    };
    return (react_1.default.createElement(material_1.ThemeProvider, { theme: (_a = props.theme) !== null && _a !== void 0 ? _a : components_1.otosenseTheme2022 },
        react_1.default.createElement(material_1.Box, { sx: { minHeight: '720px', backgroundColor: '#fff' } },
            react_1.default.createElement(SearchFilterSideMenu_1.Filter, { clearFilters: props.clearFilters, submitFilters: collapseWrap(props.submitFilters), filterOptions: props.filterOptions }),
            react_1.default.createElement(tableStyles_1.DataTableContainer, { sx: { borderTop: '1px solid #eee', width: '100%' } },
                react_1.default.createElement(material_1.Table, { size: "small", sx: { marginBottom: 1 }, stickyHeader: true },
                    react_1.default.createElement(material_1.TableHead, { sx: { borderBottom: '1px solid #eee' } },
                        react_1.default.createElement(material_1.TableRow, null,
                            (props.isMultiSelect === true)
                                ? react_1.default.createElement(material_1.TableCell, { sx: {
                                        paddingLeft: 0.3,
                                        paddingRight: 0.3,
                                        maxWidth: 24,
                                        backgroundColor: '#fff'
                                    } },
                                    react_1.default.createElement(components_1.CenterBox, null,
                                        react_1.default.createElement(DoneAll_1.default, { color: "primary", onClick: addOrRemoveAllItemsInView })))
                                : react_1.default.createElement(material_1.TableCell, { sx: { background: '#fff' }, colSpan: 1 }),
                            react_1.default.createElement(material_1.TableCell, { sx: { background: '#fff' }, colSpan: 1 }),
                            renderHeaders(props.columns, props.orderBy, props.order, collapseWrap(props.onOrderChange)))),
                    react_1.default.createElement(material_1.TableBody, { sx: { marginBottom: 64 } }, ((_b = props.data) === null || _b === void 0 ? void 0 : _b.length) > 0
                        ? react_1.default.createElement(react_1.default.Fragment, null, props.data.map(function (v, i) { return (react_1.default.createElement(Row_1.Row, { key: "row-".concat(i), id: "row-".concat(i), data: v, columns: props.columns, isExpanded: i === expandedRow, onClickExpand: function () { setExpandedRow(i !== expandedRow ? i : -1); }, onSelectItem: function () {
                                onChangeSelectItem(v);
                            }, isSelected: selectedItems.has(v), renderExpandedData: function () { return props.renderExpandedData(v); } })); }))
                        : react_1.default.createElement(material_1.TableRow, null,
                            react_1.default.createElement(material_1.TableCell, { colSpan: props.columns.length + 2, sx: { textAlign: 'center' } }, 'No Data'))),
                    react_1.default.createElement(DataTableFooter_1.DataTableFooter, { rowsPerPage: props.rowsPerPage, onRowsPerPageChange: collapseWrap(props.onRowsPerPageChange), page: props.page, onPageChange: collapseWrap(props.onPageChange), count: (_c = props.totalCount) !== null && _c !== void 0 ? _c : -1, selectedItemsCount: selectedItems.size }))))));
};
exports.DataTable = DataTable;
//# sourceMappingURL=DataTable.js.map