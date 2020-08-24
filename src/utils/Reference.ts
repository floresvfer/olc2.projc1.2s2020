import {Cntnr} from "./Cntnr";
import {DefaultValue, SemanticException} from "./Utils";

export class Reference extends Cntnr {
    private value: Cntnr;
    private isConst: boolean = false;
    private tipoNombre: string = 'any';

    constructor(tipoNombre: string = 'ANY', isConst: boolean = false) {
        super();
        this.typo = "REFERENCE";
        this.value = DefaultValue(tipoNombre);
        this.tipoNombre = tipoNombre;
        this.isConst = isConst;
    }

    public getReferenceValue = () : string => {
        return this.tipoNombre.toUpperCase();
    };

    public toString = (): string => {
        return this.value.toString();
    };

    public PutValueOnReference(value: Cntnr): void {
        let v: Cntnr;
        if (value instanceof Reference) {
            v = (value as Reference).value;
        } else {
            v = value;
        }
        if(this.tipoNombre !== v.typo
            && this.tipoNombre !== 'ANY'
            && v.typo !== 'NULL'
            && v.typo !== 'UNDEFINED'
        ){
            throw new SemanticException(`Tipo ${v.typo} no puede ser asignado a Variable de tipo ${this.tipoNombre}`)
        }
        this.value = v;
    }

    public getValue = (): Cntnr => {
        return this.value;
    };

    public setValue = (value: Cntnr): void => {
        this.value = value;
    };

    public Call = (args: Array<Cntnr>): object => {
        for (let arg of args) {
            console.log(arg);
        }
        return null;
    };
}