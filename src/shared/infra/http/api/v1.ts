import * as express from 'express';
import {userRouter} from "../../../../modules/users/infra/http/routes";
import {pricingRouter} from '../../../../modules/pricing/infra/http/routes';
import {bookAnApointmentRouter} from '../../../../modules/bookAnApointment/infra/http/routes';

const v1Router = express.Router();

v1Router.use('/users', userRouter);

v1Router.use('/pricing', pricingRouter);

v1Router.use('/book', bookAnApointmentRouter);

v1Router.get('/', (req, res) => {
  return res.json({ message: "Success /api/v1" });
});

export { v1Router }
