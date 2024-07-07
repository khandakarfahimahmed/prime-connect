import { ITeamRole } from "./team-role.interface";

export interface IRole {
    id?: number;
    name: string;
    description: string;
    // TeamRole?: ITeamRole;
    access?: string;
    sequence?: number;
    isAuthor?: boolean;
    team_id?: number;
}