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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _barrel_optimize_names_GitCompareArrows_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! __barrel_optimize__?names=GitCompareArrows!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/git-compare-arrows.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _s = $RefreshSig$();\n\n\nconst ImpactSection = (props)=>{\n    _s();\n    const { products, project } = props;\n    const [projects, setProjects] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [impactSelect, setImpactSelect] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"global\");\n    const [isCompare, setIsCompare] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [session, setSession] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchProjects = async ()=>{\n            let res = await fetch(\"/api/session\", {\n                method: \"GET\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                }\n            });\n            let data = await res.json();\n            setSession(data.session);\n            console.log(data.session);\n            res = await fetch(\"/api/project/list?id=\".concat(encodeURIComponent(data.session.user.id)), {\n                method: \"GET\"\n            });\n            data = await res.json();\n            if (data.success) {\n                setProjects(data.data);\n                console.log(data.data);\n            }\n        };\n        fetchProjects();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"impact flex flex-col items-start gap-5 my-[2%] mx-[5%]\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"btn-compare cursor-pointer transition-all hover:opacity-80\",\n                onClick: ()=>{\n                    setIsCompare(!isCompare);\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_GitCompareArrows_lucide_react__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        size: 25\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                        lineNumber: 52,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-lg font-bold\",\n                        children: isCompare ? \"Arr\\xeater de comparer\" : \"Comparer \\xe0 un autre projet\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                        lineNumber: 53,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                lineNumber: 46,\n                columnNumber: 7\n            }, undefined),\n            isCompare && project ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col-6\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex items-center gap-5\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"font-bold text-lg\",\n                            children: project.name\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                            lineNumber: 62,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"font-bold text-sm\",\n                            children: \"avec\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                            lineNumber: 63,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"h-20 w-72 min-w-[200px]\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                                className: \"w-[100%] rounder-full\",\n                                children: projects === null || projects === void 0 ? void 0 : projects.map((temp)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                        value: temp.id,\n                                        children: temp.name\n                                    }, temp.id, false, {\n                                        fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                                        lineNumber: 67,\n                                        columnNumber: 19\n                                    }, undefined))\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                                lineNumber: 65,\n                                columnNumber: 15\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                            lineNumber: 64,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                    lineNumber: 61,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                lineNumber: 59,\n                columnNumber: 9\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    children: \"PAS COMPARER\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                    lineNumber: 77,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                lineNumber: 76,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n        lineNumber: 44,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ImpactSection, \"T5xHjX1K57CyOLdYyBXqFrEomG8=\");\n_c = ImpactSection;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ImpactSection);\nvar _c;\n$RefreshReg$(_c, \"ImpactSection\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL3Byb2plY3RzL0ltcGFjdFNlY3Rpb24udHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFZ0Q7QUFDSjtBQUU1QyxNQUFNRyxnQkFBZ0IsQ0FBQ0M7O0lBSXJCLE1BQU0sRUFBRUMsUUFBUSxFQUFFQyxPQUFPLEVBQUUsR0FBR0Y7SUFDOUIsTUFBTSxDQUFDRyxVQUFVQyxZQUFZLEdBQUdOLCtDQUFRQSxDQUFDO0lBQ3pDLE1BQU0sQ0FBQ08sY0FBY0MsZ0JBQWdCLEdBQUdSLCtDQUFRQSxDQUFDO0lBQ2pELE1BQU0sQ0FBQ1MsV0FBV0MsYUFBYSxHQUFHViwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNLENBQUNXLFNBQVNDLFdBQVcsR0FBR1osK0NBQVFBLENBQUM7SUFFdkNELGdEQUFTQSxDQUFDO1FBQ1IsTUFBTWMsZ0JBQWdCO1lBQ3BCLElBQUlDLE1BQU0sTUFBTUMsTUFBTSxnQkFBZ0I7Z0JBQ3BDQyxRQUFRO2dCQUNSQyxTQUFTO29CQUNQLGdCQUFnQjtnQkFDbEI7WUFDRjtZQUNBLElBQUlDLE9BQU8sTUFBTUosSUFBSUssSUFBSTtZQUN6QlAsV0FBV00sS0FBS1AsT0FBTztZQUN2QlMsUUFBUUMsR0FBRyxDQUFDSCxLQUFLUCxPQUFPO1lBRXhCRyxNQUFNLE1BQU1DLE1BQ1Ysd0JBQWlFLE9BQXpDTyxtQkFBbUJKLEtBQUtQLE9BQU8sQ0FBQ1ksSUFBSSxDQUFDQyxFQUFFLElBQy9EO2dCQUNFUixRQUFRO1lBQ1Y7WUFFRkUsT0FBTyxNQUFNSixJQUFJSyxJQUFJO1lBQ3JCLElBQUlELEtBQUtPLE9BQU8sRUFBRTtnQkFDaEJuQixZQUFZWSxLQUFLQSxJQUFJO2dCQUNyQkUsUUFBUUMsR0FBRyxDQUFDSCxLQUFLQSxJQUFJO1lBQ3ZCO1FBQ0Y7UUFDQUw7SUFDRixHQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ2E7UUFBSUMsV0FBVTs7MEJBRWIsOERBQUNEO2dCQUNDQyxXQUFVO2dCQUNWQyxTQUFTO29CQUNQbEIsYUFBYSxDQUFDRDtnQkFDaEI7O2tDQUVBLDhEQUFDWCw0RkFBZ0JBO3dCQUFDK0IsTUFBTTs7Ozs7O2tDQUN4Qiw4REFBQ0M7d0JBQUVILFdBQVU7a0NBQ1ZsQixZQUFZLDJCQUF3Qjs7Ozs7Ozs7Ozs7O1lBSXhDQSxhQUFhTCx3QkFDWiw4REFBQ3NCO2dCQUFJQyxXQUFVOzBCQUViLDRFQUFDRDtvQkFBSUMsV0FBVTs7c0NBQ2IsOERBQUNHOzRCQUFFSCxXQUFVO3NDQUFxQnZCLFFBQVEyQixJQUFJOzs7Ozs7c0NBQzlDLDhEQUFDRDs0QkFBRUgsV0FBVTtzQ0FBb0I7Ozs7OztzQ0FDakMsOERBQUNEOzRCQUFJQyxXQUFVO3NDQUNiLDRFQUFDSztnQ0FBT0wsV0FBVTswQ0FDZnRCLHFCQUFBQSwrQkFBQUEsU0FBVTRCLEdBQUcsQ0FBQyxDQUFDQyxxQkFDZCw4REFBQ0M7d0NBQXFCQyxPQUFPRixLQUFLVixFQUFFO2tEQUNqQ1UsS0FBS0gsSUFBSTt1Q0FEQ0csS0FBS1YsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQ0FTOUIsOERBQUNFOzBCQUNDLDRFQUFDSTs4QkFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLYjtHQTVFTTdCO0tBQUFBO0FBOEVOLCtEQUFlQSxhQUFhQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9jb21wb25lbnRzL3Byb2plY3RzL0ltcGFjdFNlY3Rpb24udHN4P2U5MjYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWRkUHJvZHVjdFR5cGUgfSBmcm9tIFwiQG1vZGVscy9BZGRQcm9kdWN0XCI7XHJcbmltcG9ydCB7IFByb2plY3RUeXBlIH0gZnJvbSBcIkBtb2RlbHMvUHJvamVjdFwiO1xyXG5pbXBvcnQgeyBHaXRDb21wYXJlQXJyb3dzIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xyXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG5jb25zdCBJbXBhY3RTZWN0aW9uID0gKHByb3BzOiB7XHJcbiAgcHJvZHVjdHM6IEFkZFByb2R1Y3RUeXBlW107XHJcbiAgcHJvamVjdDogUHJvamVjdFR5cGU7XHJcbn0pID0+IHtcclxuICBjb25zdCB7IHByb2R1Y3RzLCBwcm9qZWN0IH0gPSBwcm9wcztcclxuICBjb25zdCBbcHJvamVjdHMsIHNldFByb2plY3RzXSA9IHVzZVN0YXRlKG51bGwpO1xyXG4gIGNvbnN0IFtpbXBhY3RTZWxlY3QsIHNldEltcGFjdFNlbGVjdF0gPSB1c2VTdGF0ZShcImdsb2JhbFwiKTtcclxuICBjb25zdCBbaXNDb21wYXJlLCBzZXRJc0NvbXBhcmVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzZXNzaW9uLCBzZXRTZXNzaW9uXSA9IHVzZVN0YXRlKG51bGwpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZmV0Y2hQcm9qZWN0cyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IHJlcyA9IGF3YWl0IGZldGNoKFwiL2FwaS9zZXNzaW9uXCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcclxuICAgICAgc2V0U2Vzc2lvbihkYXRhLnNlc3Npb24pO1xyXG4gICAgICBjb25zb2xlLmxvZyhkYXRhLnNlc3Npb24pO1xyXG5cclxuICAgICAgcmVzID0gYXdhaXQgZmV0Y2goXHJcbiAgICAgICAgYC9hcGkvcHJvamVjdC9saXN0P2lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGRhdGEuc2Vzc2lvbi51c2VyLmlkKX1gLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xyXG4gICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgc2V0UHJvamVjdHMoZGF0YS5kYXRhKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmRhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgZmV0Y2hQcm9qZWN0cygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiaW1wYWN0IGZsZXggZmxleC1jb2wgaXRlbXMtc3RhcnQgZ2FwLTUgbXktWzIlXSBteC1bNSVdXCI+XHJcbiAgICAgIHsvKiBpc0NvbXBhcmUgKi99XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJidG4tY29tcGFyZSBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWFsbCBob3ZlcjpvcGFjaXR5LTgwXCJcclxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICBzZXRJc0NvbXBhcmUoIWlzQ29tcGFyZSk7XHJcbiAgICAgICAgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxHaXRDb21wYXJlQXJyb3dzIHNpemU9ezI1fSAvPlxyXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkXCI+XHJcbiAgICAgICAgICB7aXNDb21wYXJlID8gXCJBcnLDqnRlciBkZSBjb21wYXJlclwiIDogXCJDb21wYXJlciDDoCB1biBhdXRyZSBwcm9qZXRcIn1cclxuICAgICAgICA8L3A+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge2lzQ29tcGFyZSAmJiBwcm9qZWN0ID8gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbC02XCI+XHJcbiAgICAgICAgICB7LyogU2VsZWN0IHByb2plY3QgZm9yIGNvbXBhcmUgKi99XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC01XCI+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWxnXCI+e3Byb2plY3QubmFtZX08L3A+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXNtXCI+YXZlYzwvcD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLTIwIHctNzIgbWluLXctWzIwMHB4XVwiPlxyXG4gICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwidy1bMTAwJV0gcm91bmRlci1mdWxsXCI+XHJcbiAgICAgICAgICAgICAgICB7cHJvamVjdHM/Lm1hcCgodGVtcCkgPT4gKFxyXG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17dGVtcC5pZH0gdmFsdWU9e3RlbXAuaWR9PlxyXG4gICAgICAgICAgICAgICAgICAgIHt0ZW1wLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxwPlBBUyBDT01QQVJFUjwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbXBhY3RTZWN0aW9uO1xyXG4iXSwibmFtZXMiOlsiR2l0Q29tcGFyZUFycm93cyIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiSW1wYWN0U2VjdGlvbiIsInByb3BzIiwicHJvZHVjdHMiLCJwcm9qZWN0IiwicHJvamVjdHMiLCJzZXRQcm9qZWN0cyIsImltcGFjdFNlbGVjdCIsInNldEltcGFjdFNlbGVjdCIsImlzQ29tcGFyZSIsInNldElzQ29tcGFyZSIsInNlc3Npb24iLCJzZXRTZXNzaW9uIiwiZmV0Y2hQcm9qZWN0cyIsInJlcyIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImRhdGEiLCJqc29uIiwiY29uc29sZSIsImxvZyIsImVuY29kZVVSSUNvbXBvbmVudCIsInVzZXIiLCJpZCIsInN1Y2Nlc3MiLCJkaXYiLCJjbGFzc05hbWUiLCJvbkNsaWNrIiwic2l6ZSIsInAiLCJuYW1lIiwic2VsZWN0IiwibWFwIiwidGVtcCIsIm9wdGlvbiIsInZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/projects/ImpactSection.tsx\n"));

/***/ })

});