import type { Ps4IdTs } from "./Ps4IdTs.ts";
import type { PsyNetIdTs } from "./PsyNetIdTs.ts";
import type { SwitchIdTs } from "./SwitchIdTs.ts";
export type RemoteIdTs = {
    "PlayStation": Ps4IdTs;
} | {
    "PsyNet": PsyNetIdTs;
} | {
    "SplitScreen": number;
} | {
    "Steam": string;
} | {
    "Switch": SwitchIdTs;
} | {
    "Xbox": string;
} | {
    "QQ": string;
} | {
    "Epic": string;
};
//# sourceMappingURL=RemoteIdTs.d.ts.map