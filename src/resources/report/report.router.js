import { Router } from 'express';
import * as reportController from "./report.controller";

export const reportRouter = new Router()
reportRouter.route('/reports/getReportsPerProduct')
    .get( reportController.getReportsPerProduct )
reportRouter.route('/reports/getReportsPerStaff')
    .get( reportController.getReportsPerStaff )