"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchConsoleLog = exports.redefinitionLogger = exports.logger = void 0;
const os_1 = require("os");
const path_1 = require("path");
const colors = {
    fg: {
        reset: '\x1b[0m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        purple: '\x1b[35m',
    },
    bg: {
        reset: '\x1b[40m',
        white: '\x1b[47m',
    },
};
function converMessageToString(msg) {
    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            // eslint-disable-next-line consistent-return
            return value;
        };
    };
    let acc = ``;
    msg.forEach((val) => {
        if (val instanceof Error) {
            acc += `${val.stack} `;
        }
        if (typeof val === 'object') {
            acc += `${JSON.stringify(val, null, 4)} `;
        }
        acc += `${val} `;
    });
    return acc;
}
function getTrace(level = 4) {
    const stack = new Error().stack.split(os_1.EOL);
    let trace;
    if (stack.length >= 4) {
        trace = `${stack[level].replace('\t', '').trim()}`;
    }
    else {
        trace = `${stack[stack.length - 1].replace('\t', '').trim()}`;
    }
    return trace || ``;
}
/**
 * Функция отдает данные необходимые данные для работы логгирующих функций
 */
function getLoggerData() {
    const date = `[${new Date().toISOString()}]`;
    const trace = getTrace();
    const regArr = trace.match(/\/.*\.(\w)*/);
    const memoryUsageInMb = Math.floor(process.memoryUsage().heapUsed / 1024 / 1024);
    let memoryUsageColor = colors.fg.green;
    if (memoryUsageInMb > 220 && memoryUsageInMb < 320) {
        memoryUsageColor = colors.fg.yellow;
    }
    else if (memoryUsageInMb > 320) {
        memoryUsageColor = colors.fg.red;
    }
    let moduleName = ``;
    if (regArr && regArr.length) {
        const pathToFile = regArr[0].replace(`(`, ``);
        moduleName = path_1.basename(pathToFile, path_1.extname(pathToFile)).toUpperCase();
    }
    return { date, trace, moduleName, memoryUsageInMb, memoryUsageColor };
}
exports.logger = {
    info: (...msg) => {
        const { date, trace, moduleName, memoryUsageInMb, memoryUsageColor, } = getLoggerData();
        const level = 'INFO';
        process.stdout.write(`${colors.fg.green}${level}${colors.fg.reset} ${date}${memoryUsageColor}[${memoryUsageInMb} MB]${colors.fg.reset}[${moduleName}] ${colors.fg.blue}${converMessageToString(msg)}${colors.fg.reset}${process.env.LOGGER_TRACE ? trace : ''}${os_1.EOL}`);
    },
    debug: (...msg) => {
        if (process.env.DEBUG) {
            // if (process.env.DEBUG) {
            //  const modules = process.env.DEBUG.split(',').map(
            //    (x) => x && x.trim().toUpperCase(),
            //  );
            const { date, trace, moduleName, memoryUsageInMb, memoryUsageColor, } = getLoggerData();
            const level = 'DEBUG';
            /**
             * Делаем проверку не звезду(*) <- специальный символ
             *   или на конкретный модуль из переменной окружения DEBUG
             *   если проверка проходит то логгируем
             */
            // if (modules.includes(`*`) || modules.includes(moduleName)) {
            process.stdout.write(`${colors.bg.white}${level}${colors.bg.reset}${colors.fg.reset} ${date}${memoryUsageColor}[${memoryUsageInMb} MB]${colors.fg.reset}[${moduleName}] ${converMessageToString(msg)}${process.env.LOGGER_TRACE ? trace : ''}${os_1.EOL}`);
            //  }
            // }
        }
    },
    warn: (...msg) => {
        const { date, trace, moduleName, memoryUsageInMb, memoryUsageColor, } = getLoggerData();
        const level = 'WARN';
        process.stdout.write(`${colors.fg.yellow}${level}${colors.fg.reset} ${date}${memoryUsageColor}[${memoryUsageInMb} MB]${colors.fg.reset}[${moduleName}] ${converMessageToString(msg)}${process.env.LOGGER_TRACE ? trace : ''}${os_1.EOL}`);
    },
    error: (...msg) => {
        const { date, trace, moduleName, memoryUsageInMb, memoryUsageColor, } = getLoggerData();
        const level = 'ERROR';
        process.stderr.write(`${colors.fg.red}${level}${colors.fg.reset} ${date}${memoryUsageColor}[${memoryUsageInMb} MB]${colors.fg.reset}[${moduleName}] ${colors.fg.red}${converMessageToString(msg)}${process.env.LOGGER_TRACE ? trace : ''}${colors.fg.reset}${os_1.EOL}`);
    },
};
/**
 * Переопределяет стандартные методы логгирования
 * @param newLoggerFunctions объект переопределнных функций логгирования
 */
function redefinitionLogger(newLoggerFunctions) {
    exports.logger.info = newLoggerFunctions.info;
    exports.logger.debug = newLoggerFunctions.debug;
    exports.logger.warn = newLoggerFunctions.warn;
    exports.logger.error = newLoggerFunctions.error;
}
exports.redefinitionLogger = redefinitionLogger;
/**
 * Патчит стандартные методы console. Добавляет в конец лога место вызова
 */
function patchConsoleLog() {
    console.log = (...args) => {
        process.stdout.write(`[console.log] ${args.join(' ')}${getTrace()}${os_1.EOL}`);
    };
    console.debug = (...args) => {
        process.stdout.write(`[console.debug] ${args.join(' ')}${getTrace()}${os_1.EOL}`);
    };
    console.warn = (...args) => {
        process.stdout.write(`[console.warn] ${args.join(' ')}${getTrace()}${os_1.EOL}`);
    };
    console.error = (...args) => {
        process.stderr.write(`[console.error] ${args.join(' ')}${getTrace()}${os_1.EOL}`);
    };
}
exports.patchConsoleLog = patchConsoleLog;
//# sourceMappingURL=logger.js.map