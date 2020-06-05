import { EOL } from 'os';
import { basename, extname } from 'path';

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

interface LoggerFunctions {
  info: (...msg: any[]) => void;
  debug: (...msg: any[]) => void;
  warn: (...msg: any[]) => void;
  error: (...msg: any[]) => void;
}

function converMessageToString(msg: any[]) {
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

function getTrace(level: number = 4) {
  const stack = new Error().stack.split(EOL);

  let trace;
  if (stack.length >= 4) {
    trace = `${stack[level].replace('\t', '').trim()}`;
  } else {
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
  const memoryUsageInMb = Math.floor(
    process.memoryUsage().heapUsed / 1024 / 1024,
  );
  let memoryUsageColor = colors.fg.green;

  if (memoryUsageInMb > 220 && memoryUsageInMb < 320) {
    memoryUsageColor = colors.fg.yellow;
  } else if (memoryUsageInMb > 320) {
    memoryUsageColor = colors.fg.red;
  }

  let moduleName = ``;
  if (regArr && regArr.length) {
    const pathToFile = regArr[0].replace(`(`, ``);
    moduleName = basename(pathToFile, extname(pathToFile)).toUpperCase();
  }

  return { date, trace, moduleName, memoryUsageInMb, memoryUsageColor };
}

export const logger: LoggerFunctions = {
  info: (...msg) => {
    const {
      date,
      trace,
      moduleName,
      memoryUsageInMb,
      memoryUsageColor,
    } = getLoggerData();
    const level = 'INFO';
    process.stdout.write(
      `${colors.fg.green}${level}${
        colors.fg.reset
        } ${date}${memoryUsageColor}[${memoryUsageInMb} MB]${
        colors.fg.reset
        }[${moduleName}] ${colors.fg.blue}${converMessageToString(msg)}${
        colors.fg.reset
        }${process.env.LOGGER_TRACE ? trace : ''}${EOL}`,
    );
  },
  debug: (...msg) => {
    if (process.env.DEBUG) {
      // if (process.env.DEBUG) {
      //  const modules = process.env.DEBUG.split(',').map(
      //    (x) => x && x.trim().toUpperCase(),
      //  );
      const {
        date,
        trace,
        moduleName,
        memoryUsageInMb,
        memoryUsageColor,
      } = getLoggerData();
      const level = 'DEBUG';
      /**
       * Делаем проверку не звезду(*) <- специальный символ
       *   или на конкретный модуль из переменной окружения DEBUG
       *   если проверка проходит то логгируем
       */
      // if (modules.includes(`*`) || modules.includes(moduleName)) {
      process.stdout.write(
        `${colors.bg.white}${level}${colors.bg.reset}${
          colors.fg.reset
          } ${date}${memoryUsageColor}[${memoryUsageInMb} MB]${
          colors.fg.reset
          }[${moduleName}] ${converMessageToString(msg)}${
          process.env.LOGGER_TRACE ? trace : ''
          }${EOL}`,
      );
      //  }
      // }
    }
  },
  warn: (...msg) => {
    const {
      date,
      trace,
      moduleName,
      memoryUsageInMb,
      memoryUsageColor,
    } = getLoggerData();
    const level = 'WARN';
    process.stdout.write(
      `${colors.fg.yellow}${level}${
        colors.fg.reset
        } ${date}${memoryUsageColor}[${memoryUsageInMb} MB]${
        colors.fg.reset
        }[${moduleName}] ${converMessageToString(msg)}${
        process.env.LOGGER_TRACE ? trace : ''
        }${EOL}`,
    );
  },
  error: (...msg) => {
    const {
      date,
      trace,
      moduleName,
      memoryUsageInMb,
      memoryUsageColor,
    } = getLoggerData();
    const level = 'ERROR';
    process.stderr.write(
      `${colors.fg.red}${level}${
        colors.fg.reset
        } ${date}${memoryUsageColor}[${memoryUsageInMb} MB]${
        colors.fg.reset
        }[${moduleName}] ${colors.fg.red}${converMessageToString(msg)}${
        process.env.LOGGER_TRACE ? trace : ''
        }${colors.fg.reset}${EOL}`,
    );
  },
};

/**
 * Переопределяет стандартные методы логгирования
 * @param newLoggerFunctions объект переопределнных функций логгирования
 */
export function redefinitionLogger(newLoggerFunctions: LoggerFunctions) {
  logger.info = newLoggerFunctions.info;
  logger.debug = newLoggerFunctions.debug;
  logger.warn = newLoggerFunctions.warn;
  logger.error = newLoggerFunctions.error;
}

/**
 * Патчит стандартные методы console. Добавляет в конец лога место вызова
 */
export function patchConsoleLog() {
  console.log = (...args: any[]) => {
    process.stdout.write(`[console.log] ${args.join(' ')}${getTrace()}${EOL}`);
  };

  console.debug = (...args: any[]) => {
    process.stdout.write(
      `[console.debug] ${args.join(' ')}${getTrace()}${EOL}`,
    );
  };

  console.warn = (...args: any[]) => {
    process.stdout.write(`[console.warn] ${args.join(' ')}${getTrace()}${EOL}`);
  };

  console.error = (...args: any[]) => {
    process.stderr.write(
      `[console.error] ${args.join(' ')}${getTrace()}${EOL}`,
    );
  };
}
