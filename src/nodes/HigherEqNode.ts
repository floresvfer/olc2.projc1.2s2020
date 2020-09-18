import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {MayorEq} from "../utils/RelationalOperationsFunctions";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";

export class HigherEqNode extends Op {
    private readonly lf: Op;
    private readonly rt: Op;

    constructor(lf: Op, rt: Op) {
        super();
        this.lf = lf;
        this.rt = rt;
    }

    GO(env: Envmnt): object {
        return MayorEq(this.lf.Exe(env) as Cntnr, this.rt.Exe(env) as Cntnr);
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('MAY_EQ', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }
}