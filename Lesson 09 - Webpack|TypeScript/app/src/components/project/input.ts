import { Component } from '../base-component';
import { project_state } from '../../state/project';
import { Autobind } from '../../decorators/autobind';
import * as Validation from '../../utils/validation';

/**
* Responsible for rendering the form for adding projects
*/
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    title_input_el: HTMLInputElement;
    description_input_el: HTMLInputElement;
    people_input_el: HTMLInputElement;
    
    constructor() {
        super('project-input', 'app', true, 'user-input');
        
        this.title_input_el = <HTMLInputElement>this.el.querySelector('#title')!;
        this.description_input_el = <HTMLInputElement>this.el.querySelector('#description')!;
        this.people_input_el = <HTMLInputElement>this.el.querySelector('#people')!;
        
        this.configure();
    }
    
    /**
    * Configures the form submission event handler
    */
    configure() {
        this.el.addEventListener('submit', this.submitHandler);
    }
    
    renderContent() {}
    
    /**
    * Called when the form is submitted and runs the validation logic.
    * This is where we fetch the user input and return the values
    */
    private getUserInput(): [string, string, number] | void {
        const title = this.title_input_el.value;
        const description = this.description_input_el.value;
        const people = this.people_input_el.value;
        
        const title_rules: Validation.ValidationRules = {
            value: title,
            required: true,
            min_length: 3
        };
        
        const description_rules: Validation.ValidationRules = {
            value: description,
            required: true,
            min_length: 5
        };
        
        const people_rules: Validation.ValidationRules = {
            value: parseFloat(people),
            required: true,
            min: 1,
            max: 5
        };
        
        if (!Validation.validate(title_rules) || !Validation.validate(description_rules) || !Validation.validate(people_rules)) {
            // return error alert when validation fails
            alert('Invalid input, please try again');
            return;
        } else {
            // returns the values after validation passes
            return [title, description, parseFloat(people)];
        }
    }
    
    /**
    * Runs when the validation passes and clears the form
    */
    private clearForm() {
        this.title_input_el.value = '';
        this.description_input_el.value = '';
        this.people_input_el.value = '';
    }
    
    /**
    * Handles the form submission of the user input and adds the validated values
    * to the state manager. Also clears the form is validation passes.
    */
    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const user_input = this.getUserInput();
        
        if (Array.isArray(user_input)) {
            const[ title, description, people ] = user_input;
            
            project_state.addProject(title, description, people);
            
            this.clearForm();
        }
    }
}