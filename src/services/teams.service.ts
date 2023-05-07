import { IDatabaseSchema } from "../interfaces/IDatabaseSchema";
import { TeamSchema } from "../models/team.model";

export class TeamService {
  constructor() {}

  static async createTeam(
    params: {
      teamName: string;
      teamLead: String;
      teamDepartment: string;
      assignedProject: string;
      // anotherLeadMember: string;
      teamMember: string;
      teamDescription: string;
    },
    callback: Function
  ) {
    try {
      const result = await TeamSchema.aggregate([
        {
          $match: {
            $and: [{ teamName: params.teamName }, { isDelete: false }],
          },
        },
      ]);

      if (result.length) {
        callback("exist");
        return;
      }
      await TeamSchema.create(params);
      callback("true");
    } catch {
      callback("false");
    }
  }

  static async updateTeam(
    ID,
    params: {
      teamName: string;
      teamLead: String;
      teamDepartment: string;
      assignedProject: string;
      // anotherLeadMember: string;
      teamMember: string;
      teamDescription: string;
    },
    callback: Function
  ) {
    try {
      const result = await TeamSchema.find({
        teamName: params.teamName,
        isDelete: false,
      });
      if (!result.length) {
        await TeamSchema.findByIdAndUpdate(ID, params);
        callback("true");
      } else if (result[0].id === ID) {
        await TeamSchema.findByIdAndUpdate(ID, params);
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

  static async fetchTeam(ID, UserId, callback: Function) {
    try {
      let array = [];

      if (UserId && !ID) {
        const result = await TeamSchema.find({
          teamLead: UserId,
          isDelete: false,
        })
          .populate("teamLead")
          // .populate("anotherLeadMember")
          .populate("teamMember")
          .populate("assignedProject");
        for (let i = 0; i < result.length; i++) {
          array.push(result[i]);
        }
        // const result1 = await TeamSchema.find({
        //   assignedProject: UserId,
        //   isDelete: false,
        // })
        //   .populate("teamLead")
        //   .populate("assignedProject")
        //   // .populate("anotherLeadMember")
        //   .populate("teamMember");
        // for (let i = 0; i < result1.length; i++) {
        //   array.push(result1[i]);
        // }
        const result2 = await TeamSchema.find({
          teamMember: UserId,
          isDelete: false,
        })
          .populate("teamLead")
          .populate("assignedProject")
          // .populate("anotherLeadMember")
          .populate("teamMember");
        for (let i = 0; i < result2.length; i++) {
          array.push(result2[i]);
        }
        callback(array);
        return;
      }

      if (UserId && ID) {
        const result = await TeamSchema.find({
          teamLead: UserId,
          _id: ID,
          isDelete: false,
        })
          .populate("teamLead")
          .populate("assignedProject")
          // .populate("anotherLeadMember")
          .populate("teamMember");
        for (let i = 0; i < result.length; i++) {
          array.push(result[i]);
        }
        // const result1 = await TeamSchema.find({
        //   assignedProject: UserId,
        //   _id: ID,
        //   isDelete: false,
        // })
        //   .populate("teamLead")
        //   .populate("assignedProject")
        //   // .populate("anotherLeadMember")
        //   .populate("teamMember");
        // for (let i = 0; i < result1.length; i++) {
        //   array.push(result1[i]);
        // }
        const result2 = await TeamSchema.find({
          teamMember: UserId,
          _id: ID,
          isDelete: false,
        })
          .populate("teamLead")
          .populate("assignedProject")
          // .populate("anotherLeadMember")
          .populate("teamMember");
        for (let i = 0; i < result2.length; i++) {
          array.push(result2[i]);
        }
        callback(array);
        return;
      }
      if (ID && !UserId) {
        const result = await TeamSchema.find({ _id: ID, isDelete: false })
          .populate("teamLead")
          .populate("assignedProject")
          // .populate("anotherLeadMember")
          .populate("teamMember");
        callback(result);
        return;
      }
      if (!UserId && !ID) {
        const result = await TeamSchema.find({ isDelete: false })
          .populate("teamLead")
          .populate("assignedProject")
          // .populate("anotherLeadMember")
          .populate("teamMember");
        callback(result);
        return;
      }
    } catch {
      callback(false);
    }
  }
  static async deleteTeam(ID, callback: Function) {
    try {
      await TeamSchema.findByIdAndUpdate(ID, { isDelete: true });
      callback(true);
    } catch {
      callback(false);
    }
  }
}
