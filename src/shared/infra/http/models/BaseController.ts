import {Request, Response} from 'express';
import {logger} from "../../../../lib/logger";

export abstract class BaseController {
  protected abstract executeImpl (req: Request, res: Response): Promise<void | any>;

  public async execute (req: Request, res: Response): Promise<void> {
    try {
      await this.executeImpl(req, res);
    } catch (err) {
      logger.info(`[BaseController]: Uncaught controller error`);
      logger.info(err);
      this.fail(res, 'An unexpected error occurred')
    }
  }

  public static jsonResponse (res: Response, code: number, message: string) {
    return res.status(code).json({ message })
  }

  public ok<T> (res: Response, dto?: T) {
    if (!!dto) {
      res.type('application/json');
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public static created (res: Response) {
    return res.sendStatus(201);
  }

  public static clientError (res: Response, message?: string) {
    return BaseController.jsonResponse(res, 400, message ? message : 'Unauthorized');
  }

  public static unauthorized (res: Response, message?: string) {
    return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized');
  }

  public static paymentRequired (res: Response, message?: string) {
    return BaseController.jsonResponse(res, 402, message ? message : 'Payment required');
  }

  public static forbidden (res: Response, message?: string) {
    return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden');
  }

  public static notFound (res: Response, message?: string) {
    return BaseController.jsonResponse(res, 404, message ? message : 'Not found');
  }

  public conflict (res: Response, message?: string) {
    return BaseController.jsonResponse(res, 409, message ? message : 'Conflict');
  }

  public static tooMany (res: Response, message?: string) {
    return BaseController.jsonResponse(res, 429, message ? message : 'Too many requests');
  }

  public static todo (res: Response) {
    return BaseController.jsonResponse(res, 400, 'TODO');
  }

  public fail (res: Response, error: Error | string) {
    logger.error(error);
    return res.status(500).json({
      message: error.toString()
    })
  }
}
