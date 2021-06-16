import { Component } from '../base-component';
import { Project } from '../../models/project';
import { Draggable } from '../../models/drag-drop';
import { Autobind } from '../../decorators/autobind';

/**
* Responsible for rendering each project item as an <li> element
*/
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    get persons() {
        if (this.project.people === 1) {
            return '1 person assigned';
        } else {
            return `${this.project.people} people assigned`;
        }
    }
    
    constructor(public host_element_id: string, private project: Project) {
        super('single-project', host_element_id, false, project.id);
        
        this.configure();
        this.renderContent();
    }
    
    @Autobind
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }
    
    @Autobind
    dragEndHandler(event: DragEvent) {
        console.log('DragEnd');
    }
    
    configure() {
        this.el.addEventListener('dragstart', this.dragStartHandler);
        this.el.addEventListener('dragend', this.dragEndHandler);
    }
    
    renderContent() {
        this.el.querySelector('h2')!.textContent = this.project.title;
        this.el.querySelector('h3')!.textContent = this.persons;
        this.el.querySelector('p')!.textContent = this.project.description;
    }
}