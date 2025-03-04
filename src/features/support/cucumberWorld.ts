import { setWorldConstructor, World } from '@cucumber/cucumber';

export class CustomWorld extends World {
    private options: any;

    constructor(options: any) {
        super(options);
        this.options = options;
    }

    get customParameters() { // Renombramos el getter
        return this.options?.parameters ?? {};
    }
}

setWorldConstructor(CustomWorld);
