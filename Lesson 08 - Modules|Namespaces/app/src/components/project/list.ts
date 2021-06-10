import { ProjectItem } from './item.js';
import { Component } from '../base-component.js';
import { DragTarget } from '../../models/drag-drop.js';
import { project_state } from '../../state/project.js';
import { Autobind } from '../../decorators/autobind.js';
import { Project, ProjectStatus } from '../../models/project.js';

/**
* Responsible for rendering the project list categories.
* The list categories are either 'active' or 'finished'
*/
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assigned_projects: Project[] = [];
    
    constructor(public type: ProjectStatus.ACTIVE | ProjectStatus.FINISHED) {
        super('project-list', 'app', false, `${type}-projects`);
        
        this.configure();
        this.renderContent();
    }
    
    @Autobind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            
            const list_el = this.el.querySelector('ul')!;
            list_el.classList.add('droppable');
        }
    }
    
    @Autobind
    dropHandler(event: DragEvent) {
        event.preventDefault();
        const project_id = event.dataTransfer!.getData('text/plain');
        project_state.moveProject(project_id, this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED);
    }
    
    @Autobind
    dragLeaveHandler(event: DragEvent) {
        const list_el = this.el.querySelector('ul')!;
        list_el.classList.remove('droppable');
    }
    
    configure() {
        this.el.addEventListener('dragover', this.dragOverHandler);
        this.el.addEventListener('dragleave', this.dragLeaveHandler);
        this.el.addEventListener('drop', this.dropHandler);
        
        /**
        * Only run when a project list category is added and rendered
        */
        project_state.addListener((projects: Project[]) => {
            const relevant_projects = projects.filter(item => {
                if (this.type === ProjectStatus.ACTIVE) {
                    return item.status === ProjectStatus.ACTIVE;
                } else {
                    return item.status === ProjectStatus.FINISHED;
                }
            });
            
            this.assigned_projects = relevant_projects;
            this.renderProjects();
        });
    }
    
    /**
    * Renders the respective project list categories
    */
    renderContent() {
        const list_id: string = `${this.type}-projects-list`;
        this.el.querySelector('ul')!.id = list_id;
        this.el.querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }
    
    /**
    * Renders that entered projects in the respective list
    */
    private renderProjects() {
        const list = <HTMLUListElement>document.getElementById(`${this.type}-projects-list`)!;
        
        list.innerHTML = '';
        
        for (const project of this.assigned_projects) {
            /*
            * const list_item = document.createElement('li');
            *
            * list_item.textContent = project.title;
            * list.appendChild(list_item);
            */
            new ProjectItem(`${this.type}-projects-list`, project);
        }
    }
}