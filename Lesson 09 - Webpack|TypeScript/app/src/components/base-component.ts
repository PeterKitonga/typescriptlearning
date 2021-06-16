/**
* Component base class
*/
export abstract class Component<HostType extends HTMLElement, ElementType extends HTMLElement> {
    template_el: HTMLTemplateElement;
    app_el: HostType;
    el: ElementType;
    
    constructor(template_id: string, host_element_id: string, start_position: boolean, element_id?: string) {
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