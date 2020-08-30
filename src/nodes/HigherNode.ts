import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Mayor} from "../utils/RelationalOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";

export class HigherNode extends Op {
    private readonly lf: Op;
    private readonly rt: Op;

    constructor(lf: Op, rt: Op) {
        super();
        this.lf = lf;
        this.rt = rt;
    }

    GO(env: Envmnt): object {
        return Mayor(this.lf.Exe(env) as Cntnr, this.rt.Exe(env) as Cntnr);
    }
}