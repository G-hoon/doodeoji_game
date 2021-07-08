/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./source/main.ts":
/*!************************!*\
  !*** ./source/main.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.validateMoleCount = exports.formData = void 0;\nconst validationErrorMessage = {\n    row: {\n        required: '행 값을 입력해주세요.',\n        min: '행 값은 2보다 크거나 같아야 합니다.',\n        max: '행 값은 6보다 작거나 같아야 합니다.',\n    },\n    cell: {\n        required: '열 값을 입력해주세요.',\n        min: '열 값은 2보다 크거나 같아야 합니다.',\n        max: '열 값은 6보다 작거나 같아야 합니다.',\n    },\n    mole: {\n        required: '두더지 값을 입력해주세요.',\n        min: '두더지 값은 1보다 크거나 같아야 합니다.',\n        max: '두더지 값은 18보다 작거나 같아야 합니다.',\n        rangeViloation(validMoleCount) {\n            return `두더지 값을 잘 못 입력하셨습니다. '\\n ${validMoleCount}마리 미만 이어야 합니다.`;\n        },\n    },\n};\nconst formData = (form) => {\n    const inputs = form.querySelectorAll('input');\n    const values = {};\n    inputs.forEach((input) => {\n        values[input.id] = input.value;\n    });\n    return values;\n};\nexports.formData = formData;\nconst validateMoleCount = (form) => {\n    let valid = true;\n    const mole = form.querySelector('#mole');\n    const row = form.querySelector('#row');\n    const cell = form.querySelector('#cell');\n    const moleErrorPanel = form.querySelector('#moleError');\n    const rowErrorPanel = form.querySelector('#rowError');\n    const cellErrorPanel = form.querySelector('#cellError');\n    moleErrorPanel.textContent = '';\n    rowErrorPanel.textContent = '';\n    cellErrorPanel.textContent = '';\n    const validMoleCount = Math.round(Number(row.value * cell.value) / 2);\n    if (row.value.length === 0) {\n        valid = false;\n        rowErrorPanel.textContent = validationErrorMessage.row.required;\n    }\n    else if (Number(row.value) < 2) {\n        valid = false;\n        rowErrorPanel.textContent = validationErrorMessage.row.min;\n    }\n    else if (Number(row.value) > 6) {\n        valid = false;\n        rowErrorPanel.textContent = validationErrorMessage.row.max;\n    }\n    if (cell.value.length === 0) {\n        valid = false;\n        cellErrorPanel.textContent = validationErrorMessage.cell.required;\n    }\n    else if (Number(cell.value) < 2) {\n        valid = false;\n        cellErrorPanel.textContent = validationErrorMessage.cell.min;\n    }\n    else if (Number(cell.value) > 6) {\n        valid = false;\n        cellErrorPanel.textContent = validationErrorMessage.cell.max;\n    }\n    if (mole.value.length === 0) {\n        valid = false;\n        moleErrorPanel.textContent = validationErrorMessage.mole.required;\n    }\n    else if (Number(mole.value) < 1) {\n        valid = false;\n        moleErrorPanel.textContent = validationErrorMessage.mole.min;\n    }\n    else if (Number(mole.value) > 18) {\n        valid = false;\n        moleErrorPanel.textContent = validationErrorMessage.mole.max;\n    }\n    else if (row.value.length !== 0 && cell.value.length !== 0\n        && validMoleCount <= Number(mole.value)) {\n        valid = false;\n        moleErrorPanel.innerText = validationErrorMessage.mole.rangeViloation(validMoleCount);\n    }\n    return valid;\n};\nexports.validateMoleCount = validateMoleCount;\n\n\n//# sourceURL=webpack://doodeoji_game/./source/main.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./source/main.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;