"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/pages/projects/[id]/page",{

/***/ "(app-pages-browser)/./app/components/projects/ImpactSection.tsx":
/*!***************************************************!*\
  !*** ./app/components/projects/ImpactSection.tsx ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _barrel_optimize_names_GitCompareArrows_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! __barrel_optimize__?names=GitCompareArrows!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/git-compare-arrows.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _s = $RefreshSig$();\n\n\nconst ImpactSection = (props)=>{\n    _s();\n    const { products, project } = props;\n    const [impactSelect, setImpactSelect] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"global\");\n    const [isCompare, setIsCompare] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [session, setSession] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchProjects = async ()=>{\n            const res = await fetch(\"/api/session\", {\n                method: \"GET\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                }\n            });\n            const data = await res.json();\n            setSession(data.session);\n        };\n        fetchProjects();\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"impact flex flex-col items-start gap-5 my-[2%] mx-[5%]\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"btn-compare cursor-pointer transition-all hover:opacity-80\",\n                onClick: ()=>{\n                    setIsCompare(!isCompare);\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_GitCompareArrows_lucide_react__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        size: 25\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                        lineNumber: 38,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-lg font-bold\",\n                        children: isCompare ? \"Arr\\xeater de comparer\" : \"Comparer \\xe0 un autre projet\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                        lineNumber: 39,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                lineNumber: 32,\n                columnNumber: 7\n            }, undefined),\n            isCompare ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col-6\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex items-center gap-5\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"font-bold text-lg\",\n                            children: project.name\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                            lineNumber: 48,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"font-bold text-sm\",\n                            children: \"avec\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                            lineNumber: 49,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"relative h-10 w-72 min-w-[200px]\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                                    className: \"peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                            value: \"brazil\",\n                                            children: \"Brazil\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                                            lineNumber: 52,\n                                            columnNumber: 17\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                            value: \"bucharest\",\n                                            children: \"Bucharest\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                                            lineNumber: 53,\n                                            columnNumber: 17\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                            value: \"london\",\n                                            children: \"London\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                                            lineNumber: 54,\n                                            columnNumber: 17\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                            value: \"washington\",\n                                            children: \"Washington\"\n                                        }, void 0, false, {\n                                            fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                                            lineNumber: 55,\n                                            columnNumber: 17\n                                        }, undefined)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                                    lineNumber: 51,\n                                    columnNumber: 15\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                    className: \"before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500\",\n                                    children: \"Select a City\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                                    lineNumber: 57,\n                                    columnNumber: 15\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                            lineNumber: 50,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                    lineNumber: 47,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                lineNumber: 45,\n                columnNumber: 9\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    children: \"PAS COMPARER\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                    lineNumber: 65,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                lineNumber: 64,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n        lineNumber: 30,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ImpactSection, \"Fh8v8w6sK3IsYzFqrk1zX+LD64Q=\");\n_c = ImpactSection;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ImpactSection);\nvar _c;\n$RefreshReg$(_c, \"ImpactSection\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL3Byb2plY3RzL0ltcGFjdFNlY3Rpb24udHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFZ0Q7QUFDSjtBQUU1QyxNQUFNRyxnQkFBZ0IsQ0FBQ0M7O0lBSXJCLE1BQU0sRUFBRUMsUUFBUSxFQUFFQyxPQUFPLEVBQUUsR0FBR0Y7SUFDOUIsTUFBTSxDQUFDRyxjQUFjQyxnQkFBZ0IsR0FBR04sK0NBQVFBLENBQUM7SUFDakQsTUFBTSxDQUFDTyxXQUFXQyxhQUFhLEdBQUdSLCtDQUFRQSxDQUFDO0lBQzNDLE1BQU0sQ0FBQ1MsU0FBU0MsV0FBVyxHQUFHViwrQ0FBUUEsQ0FBQztJQUV2Q0QsZ0RBQVNBLENBQUM7UUFDUixNQUFNWSxnQkFBZ0I7WUFDcEIsTUFBTUMsTUFBTSxNQUFNQyxNQUFNLGdCQUFnQjtnQkFDdENDLFFBQVE7Z0JBQ1JDLFNBQVM7b0JBQ1AsZ0JBQWdCO2dCQUNsQjtZQUNGO1lBQ0EsTUFBTUMsT0FBTyxNQUFNSixJQUFJSyxJQUFJO1lBQzNCUCxXQUFXTSxLQUFLUCxPQUFPO1FBQ3pCO1FBQ0FFO0lBQ0Y7SUFFQSxxQkFDRSw4REFBQ087UUFBSUMsV0FBVTs7MEJBRWIsOERBQUNEO2dCQUNDQyxXQUFVO2dCQUNWQyxTQUFTO29CQUNQWixhQUFhLENBQUNEO2dCQUNoQjs7a0NBRUEsOERBQUNULDRGQUFnQkE7d0JBQUN1QixNQUFNOzs7Ozs7a0NBQ3hCLDhEQUFDQzt3QkFBRUgsV0FBVTtrQ0FDVlosWUFBWSwyQkFBd0I7Ozs7Ozs7Ozs7OztZQUl4Q0EsMEJBQ0MsOERBQUNXO2dCQUFJQyxXQUFVOzBCQUViLDRFQUFDRDtvQkFBSUMsV0FBVTs7c0NBQ2IsOERBQUNHOzRCQUFFSCxXQUFVO3NDQUFxQmYsUUFBUW1CLElBQUk7Ozs7OztzQ0FDOUMsOERBQUNEOzRCQUFFSCxXQUFVO3NDQUFvQjs7Ozs7O3NDQUNqQyw4REFBQ0Q7NEJBQUlDLFdBQVU7OzhDQUNiLDhEQUFDSztvQ0FBT0wsV0FBVTs7c0RBQ2hCLDhEQUFDTTs0Q0FBT0MsT0FBTTtzREFBUzs7Ozs7O3NEQUN2Qiw4REFBQ0Q7NENBQU9DLE9BQU07c0RBQVk7Ozs7OztzREFDMUIsOERBQUNEOzRDQUFPQyxPQUFNO3NEQUFTOzs7Ozs7c0RBQ3ZCLDhEQUFDRDs0Q0FBT0MsT0FBTTtzREFBYTs7Ozs7Ozs7Ozs7OzhDQUU3Qiw4REFBQ0M7b0NBQU1SLFdBQVU7OENBQXV1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQ0FPOXZDLDhEQUFDRDswQkFDQyw0RUFBQ0k7OEJBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS2I7R0FoRU1yQjtLQUFBQTtBQWtFTiwrREFBZUEsYUFBYUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvY29tcG9uZW50cy9wcm9qZWN0cy9JbXBhY3RTZWN0aW9uLnRzeD9lOTI2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFkZFByb2R1Y3RUeXBlIH0gZnJvbSBcIkBtb2RlbHMvQWRkUHJvZHVjdFwiO1xyXG5pbXBvcnQgeyBQcm9qZWN0VHlwZSB9IGZyb20gXCJAbW9kZWxzL1Byb2plY3RcIjtcclxuaW1wb3J0IHsgR2l0Q29tcGFyZUFycm93cyB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcclxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuY29uc3QgSW1wYWN0U2VjdGlvbiA9IChwcm9wczoge1xyXG4gIHByb2R1Y3RzOiBBZGRQcm9kdWN0VHlwZVtdO1xyXG4gIHByb2plY3Q6IFByb2plY3RUeXBlO1xyXG59KSA9PiB7XHJcbiAgY29uc3QgeyBwcm9kdWN0cywgcHJvamVjdCB9ID0gcHJvcHM7XHJcbiAgY29uc3QgW2ltcGFjdFNlbGVjdCwgc2V0SW1wYWN0U2VsZWN0XSA9IHVzZVN0YXRlKFwiZ2xvYmFsXCIpO1xyXG4gIGNvbnN0IFtpc0NvbXBhcmUsIHNldElzQ29tcGFyZV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Nlc3Npb24sIHNldFNlc3Npb25dID0gdXNlU3RhdGUobnVsbCk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBmZXRjaFByb2plY3RzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChcIi9hcGkvc2Vzc2lvblwiLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcclxuICAgICAgc2V0U2Vzc2lvbihkYXRhLnNlc3Npb24pO1xyXG4gICAgfTtcclxuICAgIGZldGNoUHJvamVjdHMoKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiaW1wYWN0IGZsZXggZmxleC1jb2wgaXRlbXMtc3RhcnQgZ2FwLTUgbXktWzIlXSBteC1bNSVdXCI+XHJcbiAgICAgIHsvKiBpc0NvbXBhcmUgKi99XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJidG4tY29tcGFyZSBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWFsbCBob3ZlcjpvcGFjaXR5LTgwXCJcclxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICBzZXRJc0NvbXBhcmUoIWlzQ29tcGFyZSk7XHJcbiAgICAgICAgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxHaXRDb21wYXJlQXJyb3dzIHNpemU9ezI1fSAvPlxyXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkXCI+XHJcbiAgICAgICAgICB7aXNDb21wYXJlID8gXCJBcnLDqnRlciBkZSBjb21wYXJlclwiIDogXCJDb21wYXJlciDDoCB1biBhdXRyZSBwcm9qZXRcIn1cclxuICAgICAgICA8L3A+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge2lzQ29tcGFyZSA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wtNlwiPlxyXG4gICAgICAgICAgey8qIFNlbGVjdCBwcm9qZWN0IGZvciBjb21wYXJlICovfVxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNVwiPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1sZ1wiPntwcm9qZWN0Lm5hbWV9PC9wPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1zbVwiPmF2ZWM8L3A+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgaC0xMCB3LTcyIG1pbi13LVsyMDBweF1cIj5cclxuICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cInBlZXIgaC1mdWxsIHctZnVsbCByb3VuZGVkLVs3cHhdIGJvcmRlciBib3JkZXItYmx1ZS1ncmF5LTIwMCBib3JkZXItdC10cmFuc3BhcmVudCBiZy10cmFuc3BhcmVudCBweC0zIHB5LTIuNSBmb250LXNhbnMgdGV4dC1zbSBmb250LW5vcm1hbCB0ZXh0LWJsdWUtZ3JheS03MDAgb3V0bGluZSBvdXRsaW5lLTAgdHJhbnNpdGlvbi1hbGwgcGxhY2Vob2xkZXItc2hvd246Ym9yZGVyIHBsYWNlaG9sZGVyLXNob3duOmJvcmRlci1ibHVlLWdyYXktMjAwIHBsYWNlaG9sZGVyLXNob3duOmJvcmRlci10LWJsdWUtZ3JheS0yMDAgZW1wdHk6IWJnLWdyYXktOTAwIGZvY3VzOmJvcmRlci0yIGZvY3VzOmJvcmRlci1ncmF5LTkwMCBmb2N1czpib3JkZXItdC10cmFuc3BhcmVudCBmb2N1czpvdXRsaW5lLTAgZGlzYWJsZWQ6Ym9yZGVyLTAgZGlzYWJsZWQ6YmctYmx1ZS1ncmF5LTUwXCI+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYnJhemlsXCI+QnJhemlsPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYnVjaGFyZXN0XCI+QnVjaGFyZXN0PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibG9uZG9uXCI+TG9uZG9uPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwid2FzaGluZ3RvblwiPldhc2hpbmd0b248L29wdGlvbj5cclxuICAgICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmVmb3JlOmNvbnRlbnRbJyAnXSBhZnRlcjpjb250ZW50WycgJ10gcG9pbnRlci1ldmVudHMtbm9uZSBhYnNvbHV0ZSBsZWZ0LTAgLXRvcC0xLjUgZmxleCBoLWZ1bGwgdy1mdWxsIHNlbGVjdC1ub25lIHRleHQtWzExcHhdIGZvbnQtbm9ybWFsIGxlYWRpbmctdGlnaHQgdGV4dC1ibHVlLWdyYXktNDAwIHRyYW5zaXRpb24tYWxsIGJlZm9yZTpwb2ludGVyLWV2ZW50cy1ub25lIGJlZm9yZTptdC1bNi41cHhdIGJlZm9yZTptci0xIGJlZm9yZTpib3gtYm9yZGVyIGJlZm9yZTpibG9jayBiZWZvcmU6aC0xLjUgYmVmb3JlOnctMi41IGJlZm9yZTpyb3VuZGVkLXRsLW1kIGJlZm9yZTpib3JkZXItdCBiZWZvcmU6Ym9yZGVyLWwgYmVmb3JlOmJvcmRlci1ibHVlLWdyYXktMjAwIGJlZm9yZTp0cmFuc2l0aW9uLWFsbCBhZnRlcjpwb2ludGVyLWV2ZW50cy1ub25lIGFmdGVyOm10LVs2LjVweF0gYWZ0ZXI6bWwtMSBhZnRlcjpib3gtYm9yZGVyIGFmdGVyOmJsb2NrIGFmdGVyOmgtMS41IGFmdGVyOnctMi41IGFmdGVyOmZsZXgtZ3JvdyBhZnRlcjpyb3VuZGVkLXRyLW1kIGFmdGVyOmJvcmRlci10IGFmdGVyOmJvcmRlci1yIGFmdGVyOmJvcmRlci1ibHVlLWdyYXktMjAwIGFmdGVyOnRyYW5zaXRpb24tYWxsIHBlZXItcGxhY2Vob2xkZXItc2hvd246dGV4dC1zbSBwZWVyLXBsYWNlaG9sZGVyLXNob3duOmxlYWRpbmctWzMuNzVdIHBlZXItcGxhY2Vob2xkZXItc2hvd246dGV4dC1ibHVlLWdyYXktNTAwIHBlZXItcGxhY2Vob2xkZXItc2hvd246YmVmb3JlOmJvcmRlci10cmFuc3BhcmVudCBwZWVyLXBsYWNlaG9sZGVyLXNob3duOmFmdGVyOmJvcmRlci10cmFuc3BhcmVudCBwZWVyLWZvY3VzOnRleHQtWzExcHhdIHBlZXItZm9jdXM6bGVhZGluZy10aWdodCBwZWVyLWZvY3VzOnRleHQtZ3JheS05MDAgcGVlci1mb2N1czpiZWZvcmU6Ym9yZGVyLXQtMiBwZWVyLWZvY3VzOmJlZm9yZTpib3JkZXItbC0yIHBlZXItZm9jdXM6YmVmb3JlOmJvcmRlci1ncmF5LTkwMCBwZWVyLWZvY3VzOmFmdGVyOmJvcmRlci10LTIgcGVlci1mb2N1czphZnRlcjpib3JkZXItci0yIHBlZXItZm9jdXM6YWZ0ZXI6Ym9yZGVyLWdyYXktOTAwIHBlZXItZGlzYWJsZWQ6dGV4dC10cmFuc3BhcmVudCBwZWVyLWRpc2FibGVkOmJlZm9yZTpib3JkZXItdHJhbnNwYXJlbnQgcGVlci1kaXNhYmxlZDphZnRlcjpib3JkZXItdHJhbnNwYXJlbnQgcGVlci1kaXNhYmxlZDpwZWVyLXBsYWNlaG9sZGVyLXNob3duOnRleHQtYmx1ZS1ncmF5LTUwMFwiPlxyXG4gICAgICAgICAgICAgICAgU2VsZWN0IGEgQ2l0eVxyXG4gICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxwPlBBUyBDT01QQVJFUjwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbXBhY3RTZWN0aW9uO1xyXG4iXSwibmFtZXMiOlsiR2l0Q29tcGFyZUFycm93cyIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiSW1wYWN0U2VjdGlvbiIsInByb3BzIiwicHJvZHVjdHMiLCJwcm9qZWN0IiwiaW1wYWN0U2VsZWN0Iiwic2V0SW1wYWN0U2VsZWN0IiwiaXNDb21wYXJlIiwic2V0SXNDb21wYXJlIiwic2Vzc2lvbiIsInNldFNlc3Npb24iLCJmZXRjaFByb2plY3RzIiwicmVzIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiZGF0YSIsImpzb24iLCJkaXYiLCJjbGFzc05hbWUiLCJvbkNsaWNrIiwic2l6ZSIsInAiLCJuYW1lIiwic2VsZWN0Iiwib3B0aW9uIiwidmFsdWUiLCJsYWJlbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/projects/ImpactSection.tsx\n"));

/***/ })

});