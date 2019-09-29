import { flow, types, destroy } from 'mobx-state-tree';
import { ReportModel } from '../models/Report';
import apiService from '../api/apiService';
import formatError from '../utils/formatError';

import { stores } from './index';

export const ReportStore = types
  .model('ReportStore', {
    reports: types.optional(types.array(ReportModel), []),
    report: types.maybe(ReportModel),
    isLoading: types.maybe(types.boolean),
    error: types.maybe(types.string)
  })
  .views(self => ({
    get checkLoading() {
      return self.isLoading;
    }
  }))
  .actions(self => ({
    loadReports: flow(function*() {
      self.isLoading = true;
      try {
        self.reports = (yield apiService.Report.getReports(
          stores.authStore.authToken
        )).reports;
      } catch (error) {
        self.error = error.message;
      }
      self.isLoading = false;
    }),
    loadReport: flow(function*(id) {
      self.isLoading = true;
      try {
        self.report = (yield apiService.Report.getReport(
          id,
          stores.authStore.authToken
        )).report;
      } catch (error) {
        self.error = error.message;
      }
      self.isLoading = false;
    }),
    updateReport: flow(function*(report) {
      self.isLoading = true;
      try {
        const res = yield apiService.Report.updateReport(
          report,
          stores.authStore.authToken
        );
        if (res.report) {
          const index = self.reports.findIndex(
            report => report.id === res.report.id
          );
          self.reports[index] = res.report;
        } else {
          return formatError(res);
        }
      } catch (error) {
        self.error = error.message;
      }
      self.isLoading = false;
    }),
    createReport: flow(function*(report) {
      self.isLoading = true;
      try {
        const res = yield apiService.Report.createReport(
          report,
          stores.authStore.authToken
        );
        if (res.report) {
          self.reports.push(res.report);
        } else {
          return formatError(res);
        }
      } catch (error) {
        self.error = error.message;
      }
      self.isLoading = false;
    }),
    deleteReport: flow(function*(report) {
      self.isLoading = true;
      try {
        yield apiService.Report.deleteReport(
          report.id,
          stores.authStore.authToken
        );
        destroy(report);
      } catch (error) {
        self.error = error.message;
      }
      self.isLoading = false;
    })
  }));
