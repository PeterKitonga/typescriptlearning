// Project statuses
export enum ProjectStatus {
    ACTIVE = 'active',
    FINISHED = 'finished',
}

/**
 * Project type
 * Used as the type definition for all projects
*/
export class Project {
    constructor(
        public id: string, 
        public title: string, 
        public description: string, 
        public people: number,
        public status: ProjectStatus
    ) {}
}