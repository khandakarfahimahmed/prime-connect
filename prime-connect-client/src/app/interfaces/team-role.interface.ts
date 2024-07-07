import { IRole } from "./role.interface";
export interface ITeamRole {
    id?: number;
    role_id?: number;
    team_id?: number;
    isAuthor: boolean;
    access: string;
    sequence: number;
}

export interface ITeamRoleByTeamId {
    id?: number;
    name: string;
    description: string;
    TeamRole?: ITeamRole;
    roles: IRole[];
}