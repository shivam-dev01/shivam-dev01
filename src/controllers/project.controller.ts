import { ProjectId } from "aws-sdk/clients/codestar";
import { Request, Response } from "express";
import { Helper } from "../classes/Helper";
import { HttpResponse } from "../classes/HttpResponse";
import { Messages } from "../constants/Messages";
import { RequestMethod } from "../interfaces/IExternalApi";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { ProjectModel } from "../models/project.model";
import { UserType } from "../models/user.model";
import { ProjectService } from "../services/project.service";

export const createProject = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    projectName: body.projectName,
    deadlineDate: body.deadlineDate,
    // releaseCount: body.releaseCount,
    projectDocuments: body.projectDocuments,
    projectDescription: body.projectDescription,
    department: body.department,
  };
  try {
    ProjectService.createProject(data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Project created successfully."
          : result === "exist"
          ? "Project already exist."
          : result === "false"
          ? "Error while creating project."
          : "Error while creating project.",
        result,
        result === "true"
          ? HttpStatuses.CREATED
          : result === "exist"
          ? HttpStatuses.CONFLICT
          : result === "false"
          ? HttpStatuses.BAD_REQUEST
          : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const body = req.body;
  const data = {
    projectName: body.projectName,
    deadlineDate: body.deadlineDate,
    // releaseCount: body.releaseCount,
    projectDocuments: body.projectDocuments,
    projectDescription: body.projectDescription,
    department: body.department,
  };
  try {
    ProjectService.updateProject(data, req.params.projectId, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Project details updated successfully."
          : result === "exist"
          ? "Project already exist."
          : result === "false"
          ? "Error while creating project."
          : "Error while creating project.",
        result,
        result === "true"
          ? HttpStatuses.OK
          : result === "exist"
          ? HttpStatuses.CONFLICT
          : result === "false"
          ? HttpStatuses.BAD_REQUEST
          : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

// export const getProjectListing = async (req: Request, res: Response) => {
//   try {
//     const projectId = req.params.projectId;
//     let employeeId = null;

//     if (Helper.getUserRole(res) === UserType.EMPLOYEE) {
//       employeeId = Helper.getUserId(res);
//     }

//     const users = await ProjectService.fetchProjects(projectId, employeeId);
//     new HttpResponse(
//       res,
//       "Project fetched successfully.",
//       users
//     ).sendResponse();
//   } catch (error) {
//     new HttpResponse(res).sendErrorResponse(error);
//   }
// };

// export const employeesInProject = async (req: Request, res: Response) => {
//   try {
//     const query = req.query.projectId as ProjectId;
//     ProjectService.employeesInProject(query, (result: any) => {
//       new HttpResponse(
//         res,
//         result ? "Employees fetched successfully." : "Failed.",
//         result,
//         result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
//       ).sendResponse();
//     });
//   } catch (error) {
//     new HttpResponse(res).sendErrorResponse(error);
//   }
// };

export const addPhase = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      projectId: body.projectId,
      phaseName: body.phaseName,
      services: body.services,
      description: body.description,
      deadlineDate: body.deadlineDate,
      team: body.team,
      member: body.member,
      attachment: body.attachment,
    };

    ProjectService.addPhase(data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Phase created successfully."
          : result === "false"
          ? "Error while creating phase."
          : result === "exists"
          ? "Phase already exists."
          : "Error while creating phase.",
        result,
        result === "true"
          ? HttpStatuses.CREATED
          : result === "exists"
          ? HttpStatuses.CONFLICT
          : result === "false"
          ? HttpStatuses.BAD_REQUEST
          : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const updatePhase = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      projectId: body.projectId,
      phaseName: body.phaseName,
      services: body.services,
      description: body.description,
      deadlineDate: body.deadlineDate,
      team: body.team,
      member: body.member,
      attachment: body.attachment,
    };

    ProjectService.updatePhase(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Phase updated successfully."
          : result === "false"
          ? "Error while updating phases."
          : result === "exist"
          ? "Phase already exists."
          : "Error while updating phases.",
        result,
        result === "true"
          ? HttpStatuses.OK
          : result === "false"
          ? HttpStatuses.BAD_REQUEST
          : result === "exist"
          ? HttpStatuses.CONFLICT
          : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const getPhase = async (req: Request, res: Response) => {
  try {
    ProjectService.getPhase(req.query.id, (result: any) => {
      new HttpResponse(
        res,
        result.length >= 1
          ? "phase lists fetched successfully."
          : result.length === 0
          ? "No records found."
          : "Error while fetching phase list.",
        result,
        result.length >= 0 ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const deletePhase = async (req: Request, res: Response) => {
  try {
    ProjectService.deletePhase(req.params.id, (result: any) => {
      new HttpResponse(
        res,
        result ? "Phase deleted successfully." : "Error while deleting phase",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    ProjectService.deleteProject(req.params.id, (result: any) => {
      new HttpResponse(
        res,
        result
          ? "Project deleted successfully."
          : "Error while deleting project",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const projectList = async (req: Request, res: Response) => {
  try {
    ProjectService.projectList(req.query.id, (result: any) => {
      new HttpResponse(
        res,
        result.length >= 1
          ? "Project lists fetched successfully."
          : result.length === 0
          ? "No records found."
          : "Error while fetching project list.",
        result,
        result.length >= 0 ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};
