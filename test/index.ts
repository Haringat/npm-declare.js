import * as declare from "declare.js";

//noinspection ReservedWordAsName
let classA = declare({
    static: {
        staticOnA(){}
    },
    instance: {
        instanceOnA(){}
    }
});

let classB = classA.mixin({
    staticMixinOnB(){}
});

//noinspection ReservedWordAsName
let classC = classA.extend({
    static: {
        staticOnC(){}
    },
    instance: {
        instanceOnC(){}
    }
});

//noinspection ReservedWordAsName
let classC2 = declare(classA, {
    static: {
        staticOnC2(){}
    },
    instance: {
        instanceOnC2(){}
    }
});

//noinspection ReservedWordAsName
let classD = classB.extend({
    static: {
        staticOnD(){}
    },
    instance: {
        instanceOnD(){}
    }
});

//noinspection ReservedWordAsName
let singletonClass = declare.singleton({
    static: {
        staticOnSingleton(){}
    },
    instance: {
        instanceOnSingleton(){}
    }
});

classA.staticOnA();
classA.prototype.instanceOnA();
classA.as(module.exports, "A");
let instanceA = new classA();
instanceA.instanceOnA();
let staticA = instanceA._static;
staticA.staticOnA();
staticA.prototype.instanceOnA();
let loopInstanceA = new staticA();
loopInstanceA.instanceOnA();

classB.staticOnA();
classB.staticMixinOnB();
classB.prototype.instanceOnA();
classB.as(module.exports, "B");
let instanceB = new classB();
instanceB.instanceOnA();
let staticB = instanceB._static;
staticB.staticOnA();
staticB.staticMixinOnB();
staticB.prototype.instanceOnA();
let loopInstanceB = new staticB();
loopInstanceB.instanceOnA();

classC.staticOnA();
classC.staticOnC();
classC.prototype.instanceOnA();
classC.prototype.instanceOnC();
classC.as(module.exports, "C");
let instanceC = new classC();
instanceC.instanceOnA();
instanceC.instanceOnC();
let staticC = instanceC._static;
staticC.staticOnA();
staticC.staticOnC();
staticC.prototype.instanceOnA();
staticC.prototype.instanceOnC();
let loopInstanceC = new staticC();
loopInstanceC.instanceOnA();
loopInstanceC.instanceOnC();

classC2.staticOnA();
classC2.staticOnC2();
classC2.prototype.instanceOnA();
classC2.prototype.instanceOnC2();
classC2.as(module.exports, "C2");
let instanceC2 = new classC2();
instanceC2.instanceOnA();
instanceC2.instanceOnC2();
let staticC2 = instanceC2._static;
staticC2.staticOnA();
staticC2.staticOnC2();
staticC2.prototype.instanceOnA();
staticC2.prototype.instanceOnC2();
let loopInstanceC2 = new staticC2();
loopInstanceC2.instanceOnA();
loopInstanceC2.instanceOnC2();

classD.staticOnA();
classD.staticOnD();
classD.prototype.instanceOnA();
classD.prototype.instanceOnD();
classD.as(module.exports, "D");
let instanceD = new classD();
instanceD.instanceOnA();
instanceD.instanceOnD();
let staticD = instanceD._static;
staticD.prototype.instanceOnA();
staticD.prototype.instanceOnD();
let loopInstanceD = new staticD();
loopInstanceD.instanceOnA();
loopInstanceD.instanceOnD();

singletonClass.staticOnSingleton();
singletonClass.instance.instanceOnSingleton();
singletonClass.prototype.instanceOnSingleton();
singletonClass.as(module.exports, "Singleton");
let singletonInstance = singletonClass.instance;
singletonInstance.instanceOnSingleton();
let staticSingleton = singletonInstance._static;
staticSingleton.staticOnSingleton();
staticSingleton.instance.instanceOnSingleton();