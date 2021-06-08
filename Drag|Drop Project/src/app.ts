// Drag & Drop interfaces
interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

// Project statuses
enum ProjectStatus {
    ACTIVE = 'active',
    FINISHED = 'finished',
}

/**
 * Project type
 * Used as the type definition for all projects
*/
class Project {
    constructor(
        public id: string, 
        public title: string, 
        public description: string, 
        public people: number,
        public status: ProjectStatus
    ) {}
}

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
class ProjectState extends State<Project> {
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
        const new_project = new Project(
            Math.random().toString(),
            title,
            description,
            people,
            ProjectStatus.ACTIVE
        );

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
const project_state = ProjectState.getInstance();

// validation logic
interface ValidationRules {
    value: string | number;
    required?: boolean;
    min_length?: number;
    max_length?: number;
    min?: number;
    max?: number;
}

/**
 * Checks whether all rules of a defined field are satisfied
*/
const validate = (input: ValidationRules) => {
    let is_valid = true;

    if (input.required) {
        is_valid = is_valid && input.value.toString().trim().length !== 0;
    }

    if (input.min_length != null && typeof input.value === 'string') {
        is_valid = is_valid && input.value.length >= input.min_length;
    }

    if (input.max_length != null && typeof input.value === 'string') {
        is_valid = is_valid && input.value.length <= input.max_length;
    }

    if (input.min != null && typeof input.value === 'number') {
        is_valid = is_valid && input.value >= input.min;
    }

    if (input.max != null && typeof input.value === 'number') {
        is_valid = is_valid && input.value <= input.max;
    }

    return is_valid;
};

// autobind decorator
const Autobind = (_target: any, _name: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    const adjusted: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return original.bind(this);
        }
    }

    return adjusted;
};

/**
 * Component base class
*/
abstract class Component<HostType extends HTMLElement, ElementType extends HTMLElement> {
    template_el: HTMLTemplateElement;
    app_el: HostType;
    el: ElementType;

    constructor(
        template_id: string,
        host_element_id: string,
        start_position: boolean,
        element_id?: string
    ) {
        this.template_el = <HTMLTemplateElement>document.getElementById(template_id)!;
        this.app_el = <HostType>document.getElementById(host_element_id)!;

        /**
         * Imports the content of the template element with all levels of nesting(2nd argument: true)
        */
        const imported_node = document.importNode(this.template_el.content, true);
        this.el = <ElementType>imported_node.firstElementChild;
        this.el.id = element_id ?? '';

        this.attach(start_position);
    }

    private attach(at_start: boolean) {
        // 'afterbegin' renders element right after the opening tag of 'app' div
        // 'beforeend' renders element before the ending tag of 'app' div
        this.app_el.insertAdjacentElement(at_start ? 'afterbegin' : 'beforeend', this.el);
    }

    abstract configure(): void;

    abstract renderContent(): void;
}

/**
 * Responsible for rendering each project item as an <li> element
*/
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    get persons() {
        if (this.project.people === 1) {
            return '1 person assigned';
        } else {
            return `${this.project.people} people assigned`;
        }
    }

    constructor(
        public host_element_id: string,
        private project: Project
    ) {
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

/**
 * Responsible for rendering the project list categories.
 * The list categories are either 'active' or 'finished'
*/
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
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

/**
 * Responsible for rendering the form for adding projects
*/
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

        const title_rules: ValidationRules = {
            value: title,
            required: true,
            min_length: 3
        };

        const description_rules: ValidationRules = {
            value: description,
            required: true,
            min_length: 5
        };

        const people_rules: ValidationRules = {
            value: parseFloat(people),
            required: true,
            min: 1,
            max: 5
        };

        if (
            !validate(title_rules) ||
            !validate(description_rules) ||
            !validate(people_rules)
        ) {
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

const project_input = new ProjectInput();
const active_project_list = new ProjectList(ProjectStatus.ACTIVE);
const finished_project_list = new ProjectList(ProjectStatus.FINISHED);