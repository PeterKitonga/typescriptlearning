// autobind decorator
export const Autobind = (_target: any, _name: string, descriptor: PropertyDescriptor) => {
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