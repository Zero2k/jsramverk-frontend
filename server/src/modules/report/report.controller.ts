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

      res.status(200).json({ status: 200, report });
    } catch (error) {
      res.status(400).json({ status: 400, error });
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

      report.title = !title ? report.title : title;
      report.text = !text ? report.text : text;

      const updatedReport = await Report.save(report);

      res.status(200).json({ status: 200, report: { updatedReport } });
    } catch (error) {
      res.status(400).json({ status: 400, error });
    }
  },
  async getReports(_req: Request, res: Response) {
    try {
      const reports = await Report.find({
        order: {
          title: 'ASC'
        }
      });

      if (!reports) {
        throw { msg: 'No reports exists' };
      }

      res.status(200).json({ status: 200, reports });
    } catch (error) {
      res.status(400).json({ status: 400, error });
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

      res.status(200).json({ status: 200, report });
    } catch (error) {
      res.status(400).json({ status: 400, error });
    }
  },
  async deleteReport(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const report = await Report.findOne({
        where: { id }
      });

      if (!report) {
        throw { msg: 'No report exists' };
      }

      await Report.remove(report);

      res.status(200).json({ status: 200 });
    } catch (error) {
      res.status(400).json({ status: 400, error });
    }
  }
};

export default ReportContoller;
