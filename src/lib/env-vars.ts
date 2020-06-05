/* eslint-disable guard-for-in */
/**
 * Переменные окружения
 */
interface Variables {
  /**
   * Обязательные, для указания, переменные
   */
  required?: string[];
  /**
   * Опциональные, для указания, переменные. Ключ - имя переменной. Значение - значение переменной
   * по умолчанию
   */
  optional?: { [variable: string]: string | null };
}

/**
 * Класс предназанчен для работы с переменными окружения проекта
 */
export default class EnvVars {
  /**
   * Обязательные переменные окружения
   */
  private requiredArray: Variables['required'];

  private optionalArray: string[] = [];

  /**
   * Опциональные переменные окружения
   */
  private readonly optionalObject: Variables['optional'];

  /**
   * Конструктор проверит на существование обязательные переменные, а так же установит значения
   * по-умолчанию для
   * опциональных переменных окружения
   * @param vars Переменные окружения
   * @param callback функция обратного вызова будет вызвана в случае ошибки валидации
   */
  public constructor(vars: Variables, callback?: (err: Error) => any) {
    this.requiredArray = vars.required || [];
    const missingVariables = [];
    this.requiredArray.forEach((variable) => {
      if (
        // eslint-disable-next-line no-prototype-builtins
        !process.env.hasOwnProperty(variable) ||
        process.env[variable] === ''
      ) {
        missingVariables.push(variable);
      }
    });

    if (missingVariables.length > 0) {
      const err = new Error(
        `The following environment variables are not defined: ${missingVariables.join(
          ', ',
        )}`,
      );
      if (callback) {
        callback(err);
        process.exit(1);
      } else {
        throw err;
      }
    }

    this.optionalObject = vars.optional || {};
    // Устанавливаем значения по-умолчанию
    // eslint-disable-next-line no-restricted-syntax
    for (const variable in this.optionalObject) {
      // eslint-disable-next-line no-prototype-builtins
      if (!process.env.hasOwnProperty(variable)) {
        process.env[variable] = this.optionalObject[variable];
      }
      this.optionalArray.push(variable);
    }
  }

  /**
   * Возвращает список всех переменных окружения
   * @param hide массив переменных, значения которых необходимо скрыть. Все символы будут заменены
   * символом "*"
   */
  public getList(hide?: string[]) {
    return [...this.requiredArray, ...this.optionalArray].map(
      (variable) =>
        `${variable} = ${
          hide && hide.indexOf(variable) !== -1
            ? process.env[variable].replace(/./g, '*')
            : process.env[variable]
          }`,
    );
  }

  /**
   * Возвращает объект, где ключ - это имя пременной, а значение - это значение
   * этой пременной
   * @param hide массив переменных, значения которых необходимо скрыть. Все символы будут заменены
   * символом "*"
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getMap(hide?: string[]): { [envName: string]: string } {
    return this.getList().reduce((acc, val) => {
      const result = val.split('=');
      const envName = result[0];
      const envVal = [...result.filter((v, i) => i > 0)].join('=');
      acc[envName.trim()] = envVal.trim();
      return acc;
    }, {});
  }

  /**
   * Возвращает значение переменной окружения. Если она не была указана, то бросит ошибку
   * @param varName имя переменной окружения значение которой требуется получить
   */
  public get(varName: string): string {
    const value = [...this.requiredArray, ...this.optionalArray].find(
      (name) => name === varName,
    );
    if (!value) {
      throw new Error(
        `Can not get value of the environment variable "${varName}" because it vas not initialized by` +
        ` ${this.constructor.name}`,
      );
    }
    // eslint-disable-next-line no-nested-ternary
    return process.env[varName] === 'null'
      ? null
      : process.env[varName] === 'undefined'
        ? undefined
        : process.env[varName];
  }
}
