import { Project, ProjectStatus } from '../models/project.js';

type Listener<Type> = (items: Type[]) => void;

class State<Type> {
    protected listeners: Listener<Type>[] = [];
    
    /**
    * Responsible for adding all listeners that will run when a project is added
    */
    addListener(listener_function: Listener<Type>) {
        this.listeners.push(listener_function);
    }
}

/**
* Singleton class
* Handles state management of added projects
*/
export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;
    
    private constructor () {
        super();
    }
    
    /**
    * Makes sure that only one instance of the class is created
    */
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectState();
        }
        
        return this.instance;
    }
    
    /**
    * Handles how projects are added and what listeners are ran
    */
    addProject(title: string, description: string, people: number) {
        const new_project = new Project(Math.random().toString(), title, description, people, ProjectStatus.ACTIVE);
        
        this.projects.push(new_project);
        
        /**
        * Loops through and runs all listeners when a project is added
        */
        this.updateListeners();
    }
    
    moveProject(project_id: string, new_status: ProjectStatus) {
        const project = this.projects.find(item => item.id === project_id);
        
        /**
        * Checks if the status has not changed to prevent re-rendering
        */
        if (project && project.status !== new_status) {
            project.status = new_status;
            this.updateListeners();
        }
    }
    
    /**
    * Updates the listeners for rendering the projects
    */
    private updateListeners() {
        for (const listener of this.listeners) {
            listener(this.projects.slice());
        }
    }
}

/**
* Instantiates the state management object for use in all logic
*/
export const project_state = ProjectState.getInstance();