import { Request, Response } from 'express';
import { Report } from '../../entity/Report';

const ReportContoller = {
  async createReport(req: Request, res: Response) {
    const { title, text } = req.body;

    try {
      const report = await Report.create({
        title,
        text
      }).save();

      res.json({ status: 200, report });
    } catch (error) {
      res.json({ status: 400, error });
    }
  },
  async updateReport(req: Request, res: Response) {
    const { id, title, text } = req.body;

    try {
      const report = await Report.findOne({
        where: { id }
      });

      if (!report) {
        throw { msg: 'No report with that ID' };
      }

      report.title = !title ? report.title : title.toLowerCase();
      report.text = !text ? report.text : text.toLowerCase();

      const updatedReport = await Report.save(report);

      res.json({ status: 200, report: { updatedReport } });
    } catch (error) {
      res.json({ status: 400, error });
    }
  },
  async getReports(req: Request, res: Response) {
    try {
      const reports = await Report.find();

      if (!reports) {
        throw { msg: 'No reports exists' };
      }

      res.json({ status: 200, reports });
    } catch (error) {
      res.json({ status: 400, error });
    }
  },
  async singleReport(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const report = await Report.findOne({
        where: { id }
      });

      if (!report) {
        throw { msg: 'No report exists' };
      }

      res.json({ status: 200, report });
    } catch (error) {
      res.json({ status: 400, error });
    }
  }
};

export default ReportContoller;
