import { Helper } from "../classes/Helper";
import { Messages } from "../constants/Messages";
import { TaskService } from "./task.service";
import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";
import { UserSchema } from "../models/user.model";
import { ProjectModel, ProjectSchema } from "../models/project.model";
import { PhaseSchema } from "../models/project-phase.model";

export class ProjectService {
  static async createProject(
    params: {
      projectName: string;
      deadlineDate: string;
      // releaseCount: string;
      projectDocuments: string;
      projectDescription: string;
      department: string;
    },
    callback: Function
  ) {
    const result = await ProjectSchema.find({
      isDelete: false,
      projectName: params.projectName,
    });
    if (result.length) {
      callback("exist");
      return;
    } else {
      await ProjectSchema.create(params);
      callback("true");
    }
    try {
    } catch (error: any) {
      Helper.throwError("Error while creating project.", error);
      callback("false");
    }
  }

  static async updateProject(
    params: {
      projectName: string;
      deadlineDate: string;
      // releaseCount: string;
      projectDocuments: string;
      projectDescription: string;
      department: string;
    },
    ProjectId,
    callback: Function
  ) {
    try {
      const result = await ProjectSchema.find({
        isDelete: false,
        projectName: params.projectName,
      });
      if (!result.length) {
        await ProjectSchema.findByIdAndUpdate(ProjectId, params);
        callback("true");
        return;
      }
      if (result[0].id === ProjectId) {
        await ProjectSchema.findByIdAndUpdate(ProjectId, params);
        callback("true");
        return;
      } else {
        callback("exist");
        return;
      }
    } catch (error: any) {
      Helper.throwError("Error while updating project.", error);
      callback("false");
    }
  }

  // static async fetchProjects(projectId?: string, employeeId?: string) {
  //   try {
  //     let result = null;

  //     if (employeeId) {
  //       result = await TaskService.fetchTasks([employeeId]);

  //       const projectMap = {};

  //       result.map((each: any) => {
  //         if (!projectMap[each.projectDetails._id]) {
  //           projectMap[each.projectDetails._id] =
  //             Helper.convertMongoObjectToJSObject(each.projectDetails);
  //         }
  //       });

  //       return Array.from(Object.values(projectMap));
  //     } else {
  //       result = await ProjectSchema.find({
  //         id: projectId,
  //         isDelete: false,
  //       });
  //       return result.map((each: any) => each.toObject());
  //     }
  //   } catch (error: any) {
  //     Helper.throwError("Error while fetching project.", error);
  //   }
  // }

  // static async employeesInProject(queryParams, callback: Function) {
  //   try {
  //     const result = await ProjectSchema.find({ _id: queryParams }).populate(
  //       "employees"
  //     );
  //     callback(result);
  //   } catch {
  //     callback(false);
  //   }
  // }

  static async addPhase(
    params: {
      projectId: string;
      phaseName: string;
      services: string;
      description: string;
      deadlineDate: string;
      team: string;
      member: string;
      attachment: string;
    },
    callback: Function
  ) {
    try {
      const result = await PhaseSchema.find({
        projectId: params.projectId,
        phaseName: params.phaseName,
        isDelete: false,
      });
      if (result.length) {
        callback("exists");
        return;
      }
      await PhaseSchema.create(params);
      callback("true");
    } catch {
      callback("false");
    }
  }

  static async updatePhase(
    ID,
    params: {
      projectId: string;
      phaseName: string;
      services: string;
      description: string;
      deadlineDate: string;
      team: string;
      member: string;
      attachment: string;
    },
    callback: Function
  ) {
    try {
      const result = await PhaseSchema.find({
        isDelete: false,
        phaseName: params.phaseName,
        projectId: params.projectId,
      });
      if (!result.length) {
        await PhaseSchema.findByIdAndUpdate(ID, params);
        callback("true");
        return;
      }
      if (result[0].id === ID) {
        await PhaseSchema.findByIdAndUpdate(ID, params);
        callback("true");
        return;
      } else {
        callback("exist");
        return;
      }
    } catch {
      callback("false");
    }
  }
  static async getPhase(ID, callback: Function) {
    try {
      if (!ID) {
        const result = await PhaseSchema.find({})
          .populate("team")
          .populate("member");
        callback(result);
        return;
      } else {
        const result = await PhaseSchema.find({ _id: ID })
          .populate("team")
          .populate("member");
        callback(result);
        return;
      }
    } catch {
      callback(false);
    }
  }

  static async deletePhase(ID, callback: Function) {
    try {
      await PhaseSchema.findByIdAndUpdate(ID, { isDelete: true });
      callback(true);
    } catch {
      callback(false);
    }
  }

  static async deleteProject(ID, callback: Function) {
    try {
      await ProjectSchema.findByIdAndUpdate(ID, { isDelete: true });
      callback(true);
    } catch {
      callback(false);
    }
  }

  static async projectList(ID, callback: Function) {
    try {
      if (!ID) {
        const result = await ProjectSchema.find({});
        callback(result);
        return;
      } else {
        const result = await PhaseSchema.find({ projectId: ID })
          .populate("projectId")
          .populate("team")
          .populate("member");
        callback(result);
        return;
      }
    } catch {
      callback(false);
    }
  }
}
