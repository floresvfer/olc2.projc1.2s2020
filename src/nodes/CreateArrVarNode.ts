import {Op} from "../utils/Op";
import {Envmnt} from "../utils/Envmnt";
import {Cntnr} from "../utils/Cntnr";
import {Reference} from "../utils/Reference";
import {SemanticException} from "../utils/Utils";
import {ARRAY, NUMBER, STRING, UNDEFINED} from "../utils/PrimitiveTypoContainer";

export class CreateArrVarNode extends Op{
    private readonly id: Op;
    private readonly index: Op;

    constructor(id: Op, index: Op) {
        super();
        this.id = id;
        this.index = index;
    }

    GO(env: Envmnt): object {
        let idRef = this.id.Exe(env) as Cntnr;
        // if (!(idRef instanceof Reference)) {
        //     throw new SemanticException(`Llamada a Arreglo ${idRef} no definido.`);
        // }

        let index = this.index.Exe(env) as Cntnr;
        if (index instanceof Reference) {
            index = (index as Reference).getValue();
        }

        if (index instanceof STRING) {
            try{
                index = new NUMBER(parseInt((index as STRING).getValue()));
            }catch (e){
                throw new SemanticException("El indice para accesar debe ser de tipo NUMBER");
            }
        }

        if (!(index instanceof NUMBER)) {
            throw new SemanticException("El indice para accesar debe ser de tipo NUMBER");
        }

        let ref = idRef instanceof Reference ? (idRef as Reference).getValue() : idRef;

        if (!(ref instanceof ARRAY)) {
            return new UNDEFINED();
        }

        return (ref as ARRAY).getValue((index as NUMBER).getValue());
    }
}