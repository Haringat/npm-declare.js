declare module declare {
    export interface IClass<Static extends Object, Instance> {
        new (...args: Array<any>): ClassPrototype<Static & this, Instance>;
        [accessor: string]: any;
        [accessor: number]: any;
        _super(): Class<any, any>;
        _getSuper(): Class<any, any>;
        init(): void;
        prototype: ClassPrototype<Static & this, Instance>;
        extend<ChildStatic, ChildInstance>(descriptor: ClassDescriptor<ChildStatic, ChildInstance>): Class<Static & ChildStatic, Instance & ChildInstance>;
        /*
         * Though the return type is the original class object (i.e.
         * ```js
         * someClass.mixin(someObject) === someClass
         * ```
         * will always be true) it is better to pretend that it returned a new object that reflects the changes as it is
         * impossible to add those changes to the original object in the typings.
         */
        //mixin<T extends Object>(mixin: T): Class<Static & this & T, Instance>;
        /*
         * Sadly we cannot actually add the entry to the module
         */
        as<T extends Object>(module: T, name: string): void;
        get: Get<any>;
        set: Set<any>;
        __getters__: Getters;
        __setters__: Setters;
        __meta: ClassMeta<ClassPrototype<Static & this, Instance>>;
        instance: ClassPrototype<Static & this, Instance>;
    }

    export type Class<Static extends Object, Instance extends Object> = Static & IClass<Static, Instance> & {
        mixin<T extends Object>(mixin: T): T & Static & Class<T & Static, Instance>;
    };

    export interface IClassPrototype<Static extends Object> {
        [accessor: string]: any;
        [accessor: number]: any;
        __getters__: Getters;
        __setters__: Setters;
        _super(): Class<any, any>;
        _getSuper(): Class<any, any>;
        __meta: ClassMeta<this>;
        _static: Static;
        get: Get<any>;
        set: Set<any>;
    }

    export type ClassPrototype<Static extends Object, Instance extends Object> = IClassPrototype<Static> & Instance;

    export interface ClassMeta<ClassPrototype> {
        supers: Array<Class<any, any>>;
        unique: string;
        bases: Array<string>;
        isConstructor: boolean;
        superMeta: SuperMeta;
        proto: ClassPrototype;
    }

    export interface SuperMeta {
        f: Function;
        pos: number;
        name: string;
    }

    export interface Set<T> {
        (name: string, value: T): void;
        (name: number, value: T): void;
        (name: symbol, value: T): void;
    }

    export interface Get<T> {
        (fieldName: string): T;
        (fieldName: number): T;
        (fieldName: symbol): T;
    }

    export interface ClassDescriptor<Static, Instance> {
        //noinspection ReservedWordAsName
        static?: ClassStaticDescriptor & Static;
        instance?: ClassInstanceDescriptor & Instance;
    }

    export interface ClassInstanceDescriptor {
        [accessor: string]: any;
        [accessor: number]: any;
        constructor?: Function;
        getters?: Getters;
        setters?: Setters;
    }

    export interface ClassStaticDescriptor {
        [accessor: string]: any;
        [accessor: number]: any;
        getters?: Getters;
        setters?: Setters;
    }

    export interface Getters {
        [accessor: string]: Getter<any>;
        [accessor: number]: Getter<any>;
    }

    export interface Getter<T> {
        (): T;
    }

    export interface Setters {
        [accessor: string]: Setter<any>;
        [accessor: number]: Setter<any>;
    }

    export interface Setter<T> {
        (newValue: T): void;
    }

    export interface Static {
        <Static, Instance>(descriptor: ClassDescriptor<Static, Instance>): Class<Static, Instance>;
        <Static, Instance, SuperStatic, SuperInstance>(superclass: Class<SuperStatic, SuperInstance>, descriptor: ClassDescriptor<Static, Instance>): Class<SuperStatic & Static, SuperInstance & Instance>;
        singleton: Singleton;
    }

    export interface Singleton {
        <Static, Instance>(descriptor: ClassDescriptor<Static, Instance>): Class<Static, Instance>;
        <Static, Instance, SuperStatic, SuperInstance>(superclass: Class<SuperStatic, SuperInstance>, descriptor: ClassDescriptor<Static, Instance>): Class<SuperStatic & Static, SuperInstance & Instance>;
    }
}
declare let declare: declare.Static;
export = declare;