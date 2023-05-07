import { Request, Response } from "express";
import { HttpResponse } from "../classes/HttpResponse";
import { RequestMethod } from "../interfaces/IExternalApi";
import { HttpStatuses } from "../interfaces/IHttpStatuses";
import { TeamService } from "../services/teams.service";

export const createTeam = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      teamName: body.teamName,
      teamLead: body.teamLead,
      teamDepartment: body.teamDepartment,
      assignedProject: body.assignedProject,
      // anotherLeadMember: body.anotherLeadMember,
      teamMember: body.teamMember,
      teamDescription: body.teamDescription,
    };
    TeamService.createTeam(data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Team created successfully."
          : result === "false"
          ? "Error while creating team."
          : result === "exist"
          ? "Team already exist."
          : "Error while creating team.",
        result,
        result === "true"
          ? HttpStatuses.CREATED
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

export const updateTeam = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = {
      teamName: body.teamName,
      teamLead: body.teamLead,
      teamDepartment: body.teamDepartment,
      assignedProject: body.assignedProject,
      // anotherLeadMember: body.anotherLeadMember,
      teamMember: body.teamMember,
      teamDescription: body.teamDescription,
    };
    TeamService.updateTeam(req.params.id, data, (result: any) => {
      new HttpResponse(
        res,
        result === "true"
          ? "Team updated successfully."
          : result === "false"
          ? "Error while creating team."
          : result === "exist"
          ? "Team already exist."
          : "Error while creating team.",
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

export const fetchTeam = async (req: Request, res: Response) => {
  try {
    TeamService.fetchTeam(req.query.id, req.query.userId, (result: any) => {
      new HttpResponse(
        res,
        result.length >= 1
          ? "Team list fetch successfully."
          : result.length === 0
          ? "No records found."
          : "Error while fetching team.",
        result,
        result.length >= 0 ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    TeamService.deleteTeam(req.params.id, (result: any) => {
      new HttpResponse(
        res,
        result ? "Team deleted successfully." : "Error while deleting team.",
        result,
        result ? HttpStatuses.OK : HttpStatuses.BAD_REQUEST
      ).sendResponse();
    });
  } catch (error) {
    new HttpResponse(res).sendErrorResponse(error);
  }
};
