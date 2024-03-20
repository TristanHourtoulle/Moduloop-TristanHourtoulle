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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _barrel_optimize_names_GitCompareArrows_lucide_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! __barrel_optimize__?names=GitCompareArrows!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/git-compare-arrows.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _s = $RefreshSig$();\n\n\nconst ImpactSection = (props)=>{\n    _s();\n    const { products, project } = props;\n    const [projects, setProjects] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [impactSelect, setImpactSelect] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"global\");\n    const [isCompare, setIsCompare] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [session, setSession] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [compareWith, setCompareWith] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchProjects = async ()=>{\n            let res = await fetch(\"/api/session\", {\n                method: \"GET\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                }\n            });\n            let data = await res.json();\n            setSession(data.session);\n            console.log(data.session);\n            res = await fetch(\"/api/project/list?id=\".concat(encodeURIComponent(data.session.user.id)), {\n                method: \"GET\"\n            });\n            data = await res.json();\n            if (data.success) {\n                setProjects(data.data);\n                console.log(data.data);\n            }\n        };\n        fetchProjects();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"impact flex flex-col items-start gap-5 my-[2%] mx-[5%]\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"btn-compare cursor-pointer transition-all hover:opacity-80\",\n                onClick: ()=>{\n                    setIsCompare(!isCompare);\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_GitCompareArrows_lucide_react__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        size: 25\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                        lineNumber: 53,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        className: \"text-lg font-bold\",\n                        children: isCompare ? \"Arr\\xeater de comparer\" : \"Comparer \\xe0 un autre projet\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                        lineNumber: 54,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                lineNumber: 47,\n                columnNumber: 7\n            }, undefined),\n            isCompare && project ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col-6\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex items-center gap-5\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"font-bold text-lg\",\n                            children: project.name\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                            lineNumber: 63,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            className: \"font-bold text-sm\",\n                            children: \"avec\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                            lineNumber: 64,\n                            columnNumber: 13\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"h-10 w-72 min-w-[200px]\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                                className: \"w-[100%] h-full rounded-[8px] font-bold text-lg px-[5%]\",\n                                onChange: (event)=>{\n                                    setCompareWith(event.target.value);\n                                },\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                        selected: true,\n                                        value: \"-1\",\n                                        children: \"Choisir un projet\"\n                                    }, void 0, false, {\n                                        fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                                        lineNumber: 72,\n                                        columnNumber: 17\n                                    }, undefined),\n                                    projects === null || projects === void 0 ? void 0 : projects.map((temp)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                            value: temp.id,\n                                            children: temp.name\n                                        }, temp.id, false, {\n                                            fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                                            lineNumber: 76,\n                                            columnNumber: 19\n                                        }, undefined))\n                                ]\n                            }, void 0, true, {\n                                fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                                lineNumber: 66,\n                                columnNumber: 15\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                            lineNumber: 65,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                    lineNumber: 62,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                lineNumber: 60,\n                columnNumber: 9\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    children: \"PAS COMPARER\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                    lineNumber: 86,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n                lineNumber: 85,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\trist\\\\Moduloop\\\\Moduloop-TristanHourtoulle\\\\app\\\\components\\\\projects\\\\ImpactSection.tsx\",\n        lineNumber: 45,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ImpactSection, \"RDITpTSOoncEx5o4AlCbJXXfJ5c=\");\n_c = ImpactSection;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ImpactSection);\nvar _c;\n$RefreshReg$(_c, \"ImpactSection\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL3Byb2plY3RzL0ltcGFjdFNlY3Rpb24udHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFZ0Q7QUFDSjtBQUU1QyxNQUFNRyxnQkFBZ0IsQ0FBQ0M7O0lBSXJCLE1BQU0sRUFBRUMsUUFBUSxFQUFFQyxPQUFPLEVBQUUsR0FBR0Y7SUFDOUIsTUFBTSxDQUFDRyxVQUFVQyxZQUFZLEdBQUdOLCtDQUFRQSxDQUFDO0lBQ3pDLE1BQU0sQ0FBQ08sY0FBY0MsZ0JBQWdCLEdBQUdSLCtDQUFRQSxDQUFDO0lBQ2pELE1BQU0sQ0FBQ1MsV0FBV0MsYUFBYSxHQUFHViwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNLENBQUNXLFNBQVNDLFdBQVcsR0FBR1osK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxDQUFDYSxhQUFhQyxlQUFlLEdBQUdkLCtDQUFRQSxDQUFDO0lBRS9DRCxnREFBU0EsQ0FBQztRQUNSLE1BQU1nQixnQkFBZ0I7WUFDcEIsSUFBSUMsTUFBTSxNQUFNQyxNQUFNLGdCQUFnQjtnQkFDcENDLFFBQVE7Z0JBQ1JDLFNBQVM7b0JBQ1AsZ0JBQWdCO2dCQUNsQjtZQUNGO1lBQ0EsSUFBSUMsT0FBTyxNQUFNSixJQUFJSyxJQUFJO1lBQ3pCVCxXQUFXUSxLQUFLVCxPQUFPO1lBQ3ZCVyxRQUFRQyxHQUFHLENBQUNILEtBQUtULE9BQU87WUFFeEJLLE1BQU0sTUFBTUMsTUFDVix3QkFBaUUsT0FBekNPLG1CQUFtQkosS0FBS1QsT0FBTyxDQUFDYyxJQUFJLENBQUNDLEVBQUUsSUFDL0Q7Z0JBQ0VSLFFBQVE7WUFDVjtZQUVGRSxPQUFPLE1BQU1KLElBQUlLLElBQUk7WUFDckIsSUFBSUQsS0FBS08sT0FBTyxFQUFFO2dCQUNoQnJCLFlBQVljLEtBQUtBLElBQUk7Z0JBQ3JCRSxRQUFRQyxHQUFHLENBQUNILEtBQUtBLElBQUk7WUFDdkI7UUFDRjtRQUNBTDtJQUNGLEdBQUcsRUFBRTtJQUVMLHFCQUNFLDhEQUFDYTtRQUFJQyxXQUFVOzswQkFFYiw4REFBQ0Q7Z0JBQ0NDLFdBQVU7Z0JBQ1ZDLFNBQVM7b0JBQ1BwQixhQUFhLENBQUNEO2dCQUNoQjs7a0NBRUEsOERBQUNYLDRGQUFnQkE7d0JBQUNpQyxNQUFNOzs7Ozs7a0NBQ3hCLDhEQUFDQzt3QkFBRUgsV0FBVTtrQ0FDVnBCLFlBQVksMkJBQXdCOzs7Ozs7Ozs7Ozs7WUFJeENBLGFBQWFMLHdCQUNaLDhEQUFDd0I7Z0JBQUlDLFdBQVU7MEJBRWIsNEVBQUNEO29CQUFJQyxXQUFVOztzQ0FDYiw4REFBQ0c7NEJBQUVILFdBQVU7c0NBQXFCekIsUUFBUTZCLElBQUk7Ozs7OztzQ0FDOUMsOERBQUNEOzRCQUFFSCxXQUFVO3NDQUFvQjs7Ozs7O3NDQUNqQyw4REFBQ0Q7NEJBQUlDLFdBQVU7c0NBQ2IsNEVBQUNLO2dDQUNDTCxXQUFVO2dDQUNWTSxVQUFVLENBQUNDO29DQUNUdEIsZUFBZXNCLE1BQU1DLE1BQU0sQ0FBQ0MsS0FBSztnQ0FDbkM7O2tEQUVBLDhEQUFDQzt3Q0FBT0MsUUFBUTt3Q0FBQ0YsT0FBTTtrREFBSzs7Ozs7O29DQUczQmpDLHFCQUFBQSwrQkFBQUEsU0FBVW9DLEdBQUcsQ0FBQyxDQUFDQyxxQkFDZCw4REFBQ0g7NENBQXFCRCxPQUFPSSxLQUFLaEIsRUFBRTtzREFDakNnQixLQUFLVCxJQUFJOzJDQURDUyxLQUFLaEIsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MENBUzlCLDhEQUFDRTswQkFDQyw0RUFBQ0k7OEJBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS2I7R0FyRk0vQjtLQUFBQTtBQXVGTiwrREFBZUEsYUFBYUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvY29tcG9uZW50cy9wcm9qZWN0cy9JbXBhY3RTZWN0aW9uLnRzeD9lOTI2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFkZFByb2R1Y3RUeXBlIH0gZnJvbSBcIkBtb2RlbHMvQWRkUHJvZHVjdFwiO1xyXG5pbXBvcnQgeyBQcm9qZWN0VHlwZSB9IGZyb20gXCJAbW9kZWxzL1Byb2plY3RcIjtcclxuaW1wb3J0IHsgR2l0Q29tcGFyZUFycm93cyB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcclxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuY29uc3QgSW1wYWN0U2VjdGlvbiA9IChwcm9wczoge1xyXG4gIHByb2R1Y3RzOiBBZGRQcm9kdWN0VHlwZVtdO1xyXG4gIHByb2plY3Q6IFByb2plY3RUeXBlO1xyXG59KSA9PiB7XHJcbiAgY29uc3QgeyBwcm9kdWN0cywgcHJvamVjdCB9ID0gcHJvcHM7XHJcbiAgY29uc3QgW3Byb2plY3RzLCBzZXRQcm9qZWN0c10gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbaW1wYWN0U2VsZWN0LCBzZXRJbXBhY3RTZWxlY3RdID0gdXNlU3RhdGUoXCJnbG9iYWxcIik7XHJcbiAgY29uc3QgW2lzQ29tcGFyZSwgc2V0SXNDb21wYXJlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2Vzc2lvbiwgc2V0U2Vzc2lvbl0gPSB1c2VTdGF0ZShudWxsKTtcclxuICBjb25zdCBbY29tcGFyZVdpdGgsIHNldENvbXBhcmVXaXRoXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgZmV0Y2hQcm9qZWN0cyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgbGV0IHJlcyA9IGF3YWl0IGZldGNoKFwiL2FwaS9zZXNzaW9uXCIsIHtcclxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcclxuICAgICAgc2V0U2Vzc2lvbihkYXRhLnNlc3Npb24pO1xyXG4gICAgICBjb25zb2xlLmxvZyhkYXRhLnNlc3Npb24pO1xyXG5cclxuICAgICAgcmVzID0gYXdhaXQgZmV0Y2goXHJcbiAgICAgICAgYC9hcGkvcHJvamVjdC9saXN0P2lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGRhdGEuc2Vzc2lvbi51c2VyLmlkKX1gLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICAgIGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xyXG4gICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgc2V0UHJvamVjdHMoZGF0YS5kYXRhKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmRhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgZmV0Y2hQcm9qZWN0cygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiaW1wYWN0IGZsZXggZmxleC1jb2wgaXRlbXMtc3RhcnQgZ2FwLTUgbXktWzIlXSBteC1bNSVdXCI+XHJcbiAgICAgIHsvKiBpc0NvbXBhcmUgKi99XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJidG4tY29tcGFyZSBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWFsbCBob3ZlcjpvcGFjaXR5LTgwXCJcclxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICBzZXRJc0NvbXBhcmUoIWlzQ29tcGFyZSk7XHJcbiAgICAgICAgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxHaXRDb21wYXJlQXJyb3dzIHNpemU9ezI1fSAvPlxyXG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkXCI+XHJcbiAgICAgICAgICB7aXNDb21wYXJlID8gXCJBcnLDqnRlciBkZSBjb21wYXJlclwiIDogXCJDb21wYXJlciDDoCB1biBhdXRyZSBwcm9qZXRcIn1cclxuICAgICAgICA8L3A+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge2lzQ29tcGFyZSAmJiBwcm9qZWN0ID8gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbC02XCI+XHJcbiAgICAgICAgICB7LyogU2VsZWN0IHByb2plY3QgZm9yIGNvbXBhcmUgKi99XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC01XCI+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWxnXCI+e3Byb2plY3QubmFtZX08L3A+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXNtXCI+YXZlYzwvcD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLTEwIHctNzIgbWluLXctWzIwMHB4XVwiPlxyXG4gICAgICAgICAgICAgIDxzZWxlY3RcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctWzEwMCVdIGgtZnVsbCByb3VuZGVkLVs4cHhdIGZvbnQtYm9sZCB0ZXh0LWxnIHB4LVs1JV1cIlxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBzZXRDb21wYXJlV2l0aChldmVudC50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHNlbGVjdGVkIHZhbHVlPVwiLTFcIj5cclxuICAgICAgICAgICAgICAgICAgQ2hvaXNpciB1biBwcm9qZXRcclxuICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAge3Byb2plY3RzPy5tYXAoKHRlbXApID0+IChcclxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e3RlbXAuaWR9IHZhbHVlPXt0ZW1wLmlkfT5cclxuICAgICAgICAgICAgICAgICAgICB7dGVtcC5uYW1lfVxyXG4gICAgICAgICAgICAgICAgICA8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8cD5QQVMgQ09NUEFSRVI8L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW1wYWN0U2VjdGlvbjtcclxuIl0sIm5hbWVzIjpbIkdpdENvbXBhcmVBcnJvd3MiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkltcGFjdFNlY3Rpb24iLCJwcm9wcyIsInByb2R1Y3RzIiwicHJvamVjdCIsInByb2plY3RzIiwic2V0UHJvamVjdHMiLCJpbXBhY3RTZWxlY3QiLCJzZXRJbXBhY3RTZWxlY3QiLCJpc0NvbXBhcmUiLCJzZXRJc0NvbXBhcmUiLCJzZXNzaW9uIiwic2V0U2Vzc2lvbiIsImNvbXBhcmVXaXRoIiwic2V0Q29tcGFyZVdpdGgiLCJmZXRjaFByb2plY3RzIiwicmVzIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiZGF0YSIsImpzb24iLCJjb25zb2xlIiwibG9nIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwidXNlciIsImlkIiwic3VjY2VzcyIsImRpdiIsImNsYXNzTmFtZSIsIm9uQ2xpY2siLCJzaXplIiwicCIsIm5hbWUiLCJzZWxlY3QiLCJvbkNoYW5nZSIsImV2ZW50IiwidGFyZ2V0IiwidmFsdWUiLCJvcHRpb24iLCJzZWxlY3RlZCIsIm1hcCIsInRlbXAiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/projects/ImpactSection.tsx\n"));

/***/ })

});