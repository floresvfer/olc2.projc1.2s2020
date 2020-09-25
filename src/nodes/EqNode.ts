import {Op} from "../utils/Op";
import {Igual} from "../utils/RelationalOperationsFunctions";
import {Envmnt} from "../utils/Envmnt";
import {Cntnr} from "../utils/Cntnr";
import {GraphvizNode} from "../utils/GraphvizNode";

export class EqNode extends Op {
    private readonly lf: Op;
    private readonly rt: Op;

    constructor(lf: Op, rt: Op) {
        super();
        this.lf = lf;
        this.rt = rt;
    }

    GO(env: Envmnt): object {
        return Igual((this.lf.Exe(env) as Cntnr), (this.rt.Exe(env) as Cntnr));
    }

    GetGraph(env: Envmnt): GraphvizNode {
        return new GraphvizNode('EQ', [this.lf.GetGraph(env), this.rt.GetGraph(env)]);
    }

    GetTSGraph(): string {
        return "";
    }
}
