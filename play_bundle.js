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

/***/ "./source/mole.ts":
/*!************************!*\
  !*** ./source/mole.ts ***!
  \************************/
/***/ (() => {

eval("\nclass MoleObject extends HTMLElement {\n    // ToDo: css code into this custom component with shadow root\n    connectedCallback() {\n        this.innerHTML = `\n      <div class=\"cell\">\n          <div class=\"hole\"></div>\n          <div class=\"mole hidden\"></div>\n          <div class=\"hole_front\"></div>\n      </div>\n    `;\n    }\n}\ncustomElements.define('mole-object', MoleObject);\n\n\n//# sourceURL=webpack://doodeoji_game/./source/mole.ts?");

/***/ }),

/***/ "./source/play.ts":
/*!************************!*\
  !*** ./source/play.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n__webpack_require__(/*! ./mole */ \"./source/mole.ts\");\nlet score = 0;\nlet time = 60;\nlet timerId;\nlet tickId;\nlet pausedGame = false;\nlet moles = 0;\nconst holes = [];\nfunction getRandomValueWithRange(minValue, maxValue) {\n    const min = Math.ceil(minValue);\n    const max = Math.floor(maxValue);\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n}\nfunction switchMole(status, cell) {\n    const singleMole = cell.querySelector('.mole');\n    const holeFront = cell.querySelector('.hole_front');\n    const holeEmpty = cell.querySelector('.hole');\n    holeFront.style.display = 'block';\n    holeEmpty.style.display = 'none';\n    if (status === 'show') {\n        singleMole.classList.add('hidden');\n        // ToDo: For natural change of image after mole hidden or displayed\n        // holeFront.style.display = 'none';\n        // holeEmpty.style.display = 'block';\n    }\n    else {\n        singleMole.classList.remove('hidden');\n        // holeFront.style.display = 'block';\n        // holeEmpty.style.display = 'none';\n    }\n}\nfunction switchMonster(status, cell) {\n    // const singleMole = cell.querySelector('.mole') as HTMLDivElement;\n    // const holeFront = cell.querySelector('.hole_front') as HTMLDivElement;\n    // const holeEmpty = cell.querySelector('.hole') as HTMLDivElement;\n    // holeFront.style.display = 'block';\n    // holeEmpty.style.display = 'none';\n    // if (status === 'show') {\n    //   singleMole.classList.add('hidden');\n    // } else {\n    //   singleMole.classList.remove('hidden');\n    // }\n}\nfunction switchDisplay(status) {\n    const playingButtonsDiv = document.querySelector('#playing');\n    const initButtonsDiv = document.querySelector('#init');\n    const resultButtonsDiv = document.querySelector('#result');\n    const timeAndScoreScreenDiv = document.querySelector('#info_screen');\n    const gameScreenDiv = document.querySelector('#game_screen');\n    const resultScreenDiv = document.querySelector('#result_screen');\n    if (status === 'init') {\n        playingButtonsDiv.style.display = 'none';\n        initButtonsDiv.style.display = 'block';\n        resultButtonsDiv.style.display = 'none';\n        gameScreenDiv.style.display = 'block';\n        resultScreenDiv.style.display = 'none';\n        timeAndScoreScreenDiv.style.display = 'block';\n    }\n    else if (status === 'playing') {\n        playingButtonsDiv.style.display = 'block';\n        initButtonsDiv.style.display = 'none';\n        resultButtonsDiv.style.display = 'none';\n        gameScreenDiv.style.display = 'block';\n        resultScreenDiv.style.display = 'none';\n        timeAndScoreScreenDiv.style.display = 'block';\n    }\n    else if (status === 'result') {\n        playingButtonsDiv.style.display = 'none';\n        initButtonsDiv.style.display = 'none';\n        resultButtonsDiv.style.display = 'block';\n        gameScreenDiv.style.display = 'none';\n        resultScreenDiv.style.display = 'block';\n        timeAndScoreScreenDiv.style.display = 'none';\n    }\n}\nfunction catchMole(cells) {\n    const scoreDiv = document.querySelector('#score');\n    cells.forEach((cell, index) => {\n        cell.querySelector('.mole').addEventListener('click', (event) => {\n            if (!event.target.classList.contains('dead')) {\n                score += 1;\n                scoreDiv.textContent = score.toString();\n            }\n            event.target.classList.add('dead');\n            event.target.classList.add('hidden');\n            clearTimeout(holes[index]); // 기존 내려가는 타이머 제거\n            setTimeout(() => {\n                holes[index] = 0;\n                event.target.classList.remove('dead');\n            }, 1000);\n        });\n    });\n}\nfunction generateRandomMoles(cells) {\n    tickId = setInterval(() => {\n        if (!pausedGame) {\n            holes.forEach((hole, index) => {\n                if (hole)\n                    return;\n                const randomValue = getRandomValueWithRange(0, holes.length);\n                if (randomValue < moles) {\n                    // ToDo: 가끔씩 예상보다 더 많은 두더지가 나타나는 이슈\n                    setTimeout(() => {\n                        switchMole('show', cells[index]);\n                        holes[index] = 0;\n                    }, 1000);\n                    switchMole('hide', cells[index]);\n                }\n                else if (randomValue === moles) {\n                    setTimeout(() => {\n                        switchMonster('show', cells[index]);\n                        holes[index] = 0;\n                    }, 1000);\n                    switchMonster('hide', cells[index]);\n                }\n            });\n        }\n    }, 1000);\n}\nfunction timerStart() {\n    const timer = document.querySelector('#timer');\n    time = 60;\n    timerId = setInterval(() => {\n        if (!pausedGame) {\n            time = (time * 10 - 1) / 10;\n            timer.textContent = time.toString();\n        }\n        if (time === 0) {\n            clearInterval(timerId);\n            clearInterval(tickId);\n            setTimeout(() => {\n                switchDisplay('init');\n                exportResult();\n            }, 50);\n        }\n    }, 100);\n}\nfunction initInfo() {\n    const timerDiv = document.querySelector('#timer');\n    const scoresDiv = document.querySelector('#score');\n    time = 0;\n    score = 0;\n    timerDiv.textContent = time.toString();\n    scoresDiv.textContent = score.toString();\n}\nfunction initialize(firstInitalize = false) {\n    const cells = document.querySelectorAll('.cell');\n    const stopButton = document.querySelector('#end_game');\n    const playButton = document.querySelector('#play_game');\n    const playAgainButton = document.querySelector('#play_game_again');\n    const pauseButton = document.querySelector('#pause_game');\n    const resumeButton = document.querySelector('#resume_game');\n    if (firstInitalize) {\n        switchDisplay('init');\n    }\n    stopButton.onclick = () => {\n        clearInterval(timerId);\n        clearInterval(tickId);\n        switchDisplay('init');\n        initInfo();\n    };\n    playButton.onclick = () => {\n        timerStart();\n        switchDisplay('playing');\n        generateRandomMoles(cells);\n        catchMole(cells);\n        resumeButton.style.display = 'none';\n        pauseButton.style.display = 'block';\n    };\n    playAgainButton.onclick = () => {\n        clearInterval(timerId);\n        clearInterval(tickId);\n        switchDisplay('init');\n        initInfo();\n    };\n    pauseButton.onclick = () => {\n        pausedGame = true;\n        resumeButton.style.display = 'block';\n        pauseButton.style.display = 'none';\n    };\n    resumeButton.onclick = () => {\n        pausedGame = false;\n        resumeButton.style.display = 'none';\n        pauseButton.style.display = 'block';\n    };\n}\nfunction exportResult() {\n    switchDisplay('result');\n    const rsultScoreScreen = document.querySelector('#result_score_screen');\n    rsultScoreScreen.textContent = score.toString();\n    initialize();\n}\nfunction buildTable(data) {\n    const contentDiv = document.querySelector('#game_screen');\n    const rowLength = data.row;\n    const colLength = data.cell;\n    for (let index = 0; index < rowLength; index += 1) {\n        const row = document.createElement('div');\n        row.className = 'row';\n        for (let j = 0; j < colLength; j += 1) {\n            const mole = document.createElement('mole-object');\n            row.appendChild(mole);\n            holes.push(0);\n        }\n        contentDiv.appendChild(row);\n    }\n    initialize(true);\n    moles = data.mole;\n}\nexports.default = buildTable;\n\n\n//# sourceURL=webpack://doodeoji_game/./source/play.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./source/play.ts");
/******/ 	
/******/ })()
;