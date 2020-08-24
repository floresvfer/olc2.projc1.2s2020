import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {DeclareVarNode} from "./DeclareVarNode";
import {Cntnr} from "../utils/Cntnr";

export class DeclareVarListNode extends Op {
    private readonly tipoNombre: string;
    private readonly value: Op;
    private readonly declarationOps: Array<Op>;
    private readonly isConst: boolean;

    constructor(tipoNombre: string, declarationOps: Array<Op>, value?: Op, isConst: boolean = false) {
        super();
        this.tipoNombre = tipoNombre;
        this.declarationOps = declarationOps;
        this.value = value || null;
        this.isConst = isConst;
    }

    GO(env: Envmnt): object {
        for (let op of this.declarationOps) {
            try {
                if (this.value !== null) {
                    (op as DeclareVarNode).AddValue(this.value.Exe(env) as Cntnr, this.isConst, this.tipoNombre);
                }
                op.Exe(env);
            } catch (e) {
                console.log(e.message);
            }
        }
        console.log(env);
        return null;
    }
}