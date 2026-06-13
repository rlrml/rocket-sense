/**
 * Look up car info by body id. Fallback only — prefer subtr-actor's resolved
 * `car_hitbox_family` / `car_body_name` from `PlayerInfo` at runtime.
 * @param {number|string} bodyId
 * @returns {{ name: string, hitboxType: string } | null}
 */
export function getCarHitboxInfo(bodyId: number | string): {
    name: string;
    hitboxType: string;
} | null;
/**
 * Rocket League car hitbox data.
 *
 * Lifted into this package from the (now-removed) `framework/` stack so the
 * renderer no longer depends on a second replay-parsing layer. subtr-actor is the
 * source of truth at runtime — each `PlayerInfo` already carries a resolved
 * `car_hitbox_family` — so `CAR_HITBOXES_DATA` / `getCarHitboxInfo` here are only a
 * fallback for replays where that field is missing.
 */
export const HITBOX_TYPES: string[];
export namespace HITBOX_DIMENSIONS {
    namespace Octane {
        let length: number;
        let width: number;
        let height: number;
        let offsetX: number;
        let offsetZ: number;
    }
    namespace Dominus {
        let length_1: number;
        export { length_1 as length };
        let width_1: number;
        export { width_1 as width };
        let height_1: number;
        export { height_1 as height };
        let offsetX_1: number;
        export { offsetX_1 as offsetX };
        let offsetZ_1: number;
        export { offsetZ_1 as offsetZ };
    }
    namespace Plank {
        let length_2: number;
        export { length_2 as length };
        let width_2: number;
        export { width_2 as width };
        let height_2: number;
        export { height_2 as height };
        let offsetX_2: number;
        export { offsetX_2 as offsetX };
        let offsetZ_2: number;
        export { offsetZ_2 as offsetZ };
    }
    namespace Breakout {
        let length_3: number;
        export { length_3 as length };
        let width_3: number;
        export { width_3 as width };
        let height_3: number;
        export { height_3 as height };
        let offsetX_3: number;
        export { offsetX_3 as offsetX };
        let offsetZ_3: number;
        export { offsetZ_3 as offsetZ };
    }
    namespace Hybrid {
        let length_4: number;
        export { length_4 as length };
        let width_4: number;
        export { width_4 as width };
        let height_4: number;
        export { height_4 as height };
        let offsetX_4: number;
        export { offsetX_4 as offsetX };
        let offsetZ_4: number;
        export { offsetZ_4 as offsetZ };
    }
    namespace Merc {
        let length_5: number;
        export { length_5 as length };
        let width_5: number;
        export { width_5 as width };
        let height_5: number;
        export { height_5 as height };
        let offsetX_5: number;
        export { offsetX_5 as offsetX };
        let offsetZ_5: number;
        export { offsetZ_5 as offsetZ };
    }
}
export const CAR_HITBOXES_DATA: {
    21: {
        name: string;
        hitbox: string;
    };
    22: {
        name: string;
        hitbox: string;
    };
    23: {
        name: string;
        hitbox: string;
    };
    24: {
        name: string;
        hitbox: string;
    };
    25: {
        name: string;
        hitbox: string;
    };
    26: {
        name: string;
        hitbox: string;
    };
    28: {
        name: string;
        hitbox: string;
    };
    29: {
        name: string;
        hitbox: string;
    };
    30: {
        name: string;
        hitbox: string;
    };
    31: {
        name: string;
        hitbox: string;
    };
    402: {
        name: string;
        hitbox: string;
    };
    403: {
        name: string;
        hitbox: string;
    };
    404: {
        name: string;
        hitbox: string;
    };
    523: {
        name: string;
        hitbox: string;
    };
    597: {
        name: string;
        hitbox: string;
    };
    600: {
        name: string;
        hitbox: string;
    };
    607: {
        name: string;
        hitbox: string;
    };
    1018: {
        name: string;
        hitbox: string;
    };
    1159: {
        name: string;
        hitbox: string;
    };
    1171: {
        name: string;
        hitbox: string;
    };
    1172: {
        name: string;
        hitbox: string;
    };
    1286: {
        name: string;
        hitbox: string;
    };
    1295: {
        name: string;
        hitbox: string;
    };
    1300: {
        name: string;
        hitbox: string;
    };
    1317: {
        name: string;
        hitbox: string;
    };
    1416: {
        name: string;
        hitbox: string;
    };
    1475: {
        name: string;
        hitbox: string;
    };
    1478: {
        name: string;
        hitbox: string;
    };
    1533: {
        name: string;
        hitbox: string;
    };
    1568: {
        name: string;
        hitbox: string;
    };
    1603: {
        name: string;
        hitbox: string;
    };
    1623: {
        name: string;
        hitbox: string;
    };
    1624: {
        name: string;
        hitbox: string;
    };
    1675: {
        name: string;
        hitbox: string;
    };
    1689: {
        name: string;
        hitbox: string;
    };
    1691: {
        name: string;
        hitbox: string;
    };
    1856: {
        name: string;
        hitbox: string;
    };
    1883: {
        name: string;
        hitbox: string;
    };
    1894: {
        name: string;
        hitbox: string;
    };
    1919: {
        name: string;
        hitbox: string;
    };
    1932: {
        name: string;
        hitbox: string;
    };
    2070: {
        name: string;
        hitbox: string;
    };
    2268: {
        name: string;
        hitbox: string;
    };
    2269: {
        name: string;
        hitbox: string;
    };
    2665: {
        name: string;
        hitbox: string;
    };
    2666: {
        name: string;
        hitbox: string;
    };
    2853: {
        name: string;
        hitbox: string;
    };
    2919: {
        name: string;
        hitbox: string;
    };
    2949: {
        name: string;
        hitbox: string;
    };
    2950: {
        name: string;
        hitbox: string;
    };
    2951: {
        name: string;
        hitbox: string;
    };
    3031: {
        name: string;
        hitbox: string;
    };
    3155: {
        name: string;
        hitbox: string;
    };
    3156: {
        name: string;
        hitbox: string;
    };
    3157: {
        name: string;
        hitbox: string;
    };
    3265: {
        name: string;
        hitbox: string;
    };
    3311: {
        name: string;
        hitbox: string;
    };
    3426: {
        name: string;
        hitbox: string;
    };
    3451: {
        name: string;
        hitbox: string;
    };
    3582: {
        name: string;
        hitbox: string;
    };
    3594: {
        name: string;
        hitbox: string;
    };
    3614: {
        name: string;
        hitbox: string;
    };
    3622: {
        name: string;
        hitbox: string;
    };
    3702: {
        name: string;
        hitbox: string;
    };
    3875: {
        name: string;
        hitbox: string;
    };
    3879: {
        name: string;
        hitbox: string;
    };
    3880: {
        name: string;
        hitbox: string;
    };
    4014: {
        name: string;
        hitbox: string;
    };
    4155: {
        name: string;
        hitbox: string;
    };
    4268: {
        name: string;
        hitbox: string;
    };
    4284: {
        name: string;
        hitbox: string;
    };
    4318: {
        name: string;
        hitbox: string;
    };
    4319: {
        name: string;
        hitbox: string;
    };
    4320: {
        name: string;
        hitbox: string;
    };
    4367: {
        name: string;
        hitbox: string;
    };
    4472: {
        name: string;
        hitbox: string;
    };
    4473: {
        name: string;
        hitbox: string;
    };
    4745: {
        name: string;
        hitbox: string;
    };
    4770: {
        name: string;
        hitbox: string;
    };
    4780: {
        name: string;
        hitbox: string;
    };
    4781: {
        name: string;
        hitbox: string;
    };
    4782: {
        name: string;
        hitbox: string;
    };
    4861: {
        name: string;
        hitbox: string;
    };
    4864: {
        name: string;
        hitbox: string;
    };
    4906: {
        name: string;
        hitbox: string;
    };
    5020: {
        name: string;
        hitbox: string;
    };
    5039: {
        name: string;
        hitbox: string;
    };
    5188: {
        name: string;
        hitbox: string;
    };
    5265: {
        name: string;
        hitbox: string;
    };
    5361: {
        name: string;
        hitbox: string;
    };
    5470: {
        name: string;
        hitbox: string;
    };
    5488: {
        name: string;
        hitbox: string;
    };
    5547: {
        name: string;
        hitbox: string;
    };
    5709: {
        name: string;
        hitbox: string;
    };
    5713: {
        name: string;
        hitbox: string;
    };
    5773: {
        name: string;
        hitbox: string;
    };
    5823: {
        name: string;
        hitbox: string;
    };
    5837: {
        name: string;
        hitbox: string;
    };
    5858: {
        name: string;
        hitbox: string;
    };
    5879: {
        name: string;
        hitbox: string;
    };
    5951: {
        name: string;
        hitbox: string;
    };
    5964: {
        name: string;
        hitbox: string;
    };
    5979: {
        name: string;
        hitbox: string;
    };
    6122: {
        name: string;
        hitbox: string;
    };
    6243: {
        name: string;
        hitbox: string;
    };
    6244: {
        name: string;
        hitbox: string;
    };
    6247: {
        name: string;
        hitbox: string;
    };
    6260: {
        name: string;
        hitbox: string;
    };
    6489: {
        name: string;
        hitbox: string;
    };
    6836: {
        name: string;
        hitbox: string;
    };
    6939: {
        name: string;
        hitbox: string;
    };
    7012: {
        name: string;
        hitbox: string;
    };
    7052: {
        name: string;
        hitbox: string;
    };
    7211: {
        name: string;
        hitbox: string;
    };
    7336: {
        name: string;
        hitbox: string;
    };
    7337: {
        name: string;
        hitbox: string;
    };
    7338: {
        name: string;
        hitbox: string;
    };
    7341: {
        name: string;
        hitbox: string;
    };
    7343: {
        name: string;
        hitbox: string;
    };
    7415: {
        name: string;
        hitbox: string;
    };
    7477: {
        name: string;
        hitbox: string;
    };
    7512: {
        name: string;
        hitbox: string;
    };
    7532: {
        name: string;
        hitbox: string;
    };
    7593: {
        name: string;
        hitbox: string;
    };
    7651: {
        name: string;
        hitbox: string;
    };
    7696: {
        name: string;
        hitbox: string;
    };
    7772: {
        name: string;
        hitbox: string;
    };
    7815: {
        name: string;
        hitbox: string;
    };
    7890: {
        name: string;
        hitbox: string;
    };
    7901: {
        name: string;
        hitbox: string;
    };
    7947: {
        name: string;
        hitbox: string;
    };
    7948: {
        name: string;
        hitbox: string;
    };
    7979: {
        name: string;
        hitbox: string;
    };
    8006: {
        name: string;
        hitbox: string;
    };
    8360: {
        name: string;
        hitbox: string;
    };
    8361: {
        name: string;
        hitbox: string;
    };
    8383: {
        name: string;
        hitbox: string;
    };
    8454: {
        name: string;
        hitbox: string;
    };
    8524: {
        name: string;
        hitbox: string;
    };
    8565: {
        name: string;
        hitbox: string;
    };
    8566: {
        name: string;
        hitbox: string;
    };
    8669: {
        name: string;
        hitbox: string;
    };
    8806: {
        name: string;
        hitbox: string;
    };
    8807: {
        name: string;
        hitbox: string;
    };
    9053: {
        name: string;
        hitbox: string;
    };
    9084: {
        name: string;
        hitbox: string;
    };
    9085: {
        name: string;
        hitbox: string;
    };
    9088: {
        name: string;
        hitbox: string;
    };
    9089: {
        name: string;
        hitbox: string;
    };
    9140: {
        name: string;
        hitbox: string;
    };
    9357: {
        name: string;
        hitbox: string;
    };
    9388: {
        name: string;
        hitbox: string;
    };
    9427: {
        name: string;
        hitbox: string;
    };
    9894: {
        name: string;
        hitbox: string;
    };
    10044: {
        name: string;
        hitbox: string;
    };
    10094: {
        name: string;
        hitbox: string;
    };
    10440: {
        name: string;
        hitbox: string;
    };
    10441: {
        name: string;
        hitbox: string;
    };
    10689: {
        name: string;
        hitbox: string;
    };
    10694: {
        name: string;
        hitbox: string;
    };
    10697: {
        name: string;
        hitbox: string;
    };
    10698: {
        name: string;
        hitbox: string;
    };
    10805: {
        name: string;
        hitbox: string;
    };
    10817: {
        name: string;
        hitbox: string;
    };
    10822: {
        name: string;
        hitbox: string;
    };
    10896: {
        name: string;
        hitbox: string;
    };
    10897: {
        name: string;
        hitbox: string;
    };
    10900: {
        name: string;
        hitbox: string;
    };
    10901: {
        name: string;
        hitbox: string;
    };
    11016: {
        name: string;
        hitbox: string;
    };
    11038: {
        name: string;
        hitbox: string;
    };
    11095: {
        name: string;
        hitbox: string;
    };
    11098: {
        name: string;
        hitbox: string;
    };
    11138: {
        name: string;
        hitbox: string;
    };
    11141: {
        name: string;
        hitbox: string;
    };
    11314: {
        name: string;
        hitbox: string;
    };
    11315: {
        name: string;
        hitbox: string;
    };
    11336: {
        name: string;
        hitbox: string;
    };
    11379: {
        name: string;
        hitbox: string;
    };
    11394: {
        name: string;
        hitbox: string;
    };
    11505: {
        name: string;
        hitbox: string;
    };
    11534: {
        name: string;
        hitbox: string;
    };
    11603: {
        name: string;
        hitbox: string;
    };
    11677: {
        name: string;
        hitbox: string;
    };
    11736: {
        name: string;
        hitbox: string;
    };
    11800: {
        name: string;
        hitbox: string;
    };
    11905: {
        name: string;
        hitbox: string;
    };
    11932: {
        name: string;
        hitbox: string;
    };
    11933: {
        name: string;
        hitbox: string;
    };
    11941: {
        name: string;
        hitbox: string;
    };
    11949: {
        name: string;
        hitbox: string;
    };
    11950: {
        name: string;
        hitbox: string;
    };
    12142: {
        name: string;
        hitbox: string;
    };
    12173: {
        name: string;
        hitbox: string;
    };
};
export const CAR_HITBOXES: {
    21: {
        name: string;
        hitbox: string;
    };
    22: {
        name: string;
        hitbox: string;
    };
    23: {
        name: string;
        hitbox: string;
    };
    24: {
        name: string;
        hitbox: string;
    };
    25: {
        name: string;
        hitbox: string;
    };
    26: {
        name: string;
        hitbox: string;
    };
    28: {
        name: string;
        hitbox: string;
    };
    29: {
        name: string;
        hitbox: string;
    };
    30: {
        name: string;
        hitbox: string;
    };
    31: {
        name: string;
        hitbox: string;
    };
    402: {
        name: string;
        hitbox: string;
    };
    403: {
        name: string;
        hitbox: string;
    };
    404: {
        name: string;
        hitbox: string;
    };
    523: {
        name: string;
        hitbox: string;
    };
    597: {
        name: string;
        hitbox: string;
    };
    600: {
        name: string;
        hitbox: string;
    };
    607: {
        name: string;
        hitbox: string;
    };
    1018: {
        name: string;
        hitbox: string;
    };
    1159: {
        name: string;
        hitbox: string;
    };
    1171: {
        name: string;
        hitbox: string;
    };
    1172: {
        name: string;
        hitbox: string;
    };
    1286: {
        name: string;
        hitbox: string;
    };
    1295: {
        name: string;
        hitbox: string;
    };
    1300: {
        name: string;
        hitbox: string;
    };
    1317: {
        name: string;
        hitbox: string;
    };
    1416: {
        name: string;
        hitbox: string;
    };
    1475: {
        name: string;
        hitbox: string;
    };
    1478: {
        name: string;
        hitbox: string;
    };
    1533: {
        name: string;
        hitbox: string;
    };
    1568: {
        name: string;
        hitbox: string;
    };
    1603: {
        name: string;
        hitbox: string;
    };
    1623: {
        name: string;
        hitbox: string;
    };
    1624: {
        name: string;
        hitbox: string;
    };
    1675: {
        name: string;
        hitbox: string;
    };
    1689: {
        name: string;
        hitbox: string;
    };
    1691: {
        name: string;
        hitbox: string;
    };
    1856: {
        name: string;
        hitbox: string;
    };
    1883: {
        name: string;
        hitbox: string;
    };
    1894: {
        name: string;
        hitbox: string;
    };
    1919: {
        name: string;
        hitbox: string;
    };
    1932: {
        name: string;
        hitbox: string;
    };
    2070: {
        name: string;
        hitbox: string;
    };
    2268: {
        name: string;
        hitbox: string;
    };
    2269: {
        name: string;
        hitbox: string;
    };
    2665: {
        name: string;
        hitbox: string;
    };
    2666: {
        name: string;
        hitbox: string;
    };
    2853: {
        name: string;
        hitbox: string;
    };
    2919: {
        name: string;
        hitbox: string;
    };
    2949: {
        name: string;
        hitbox: string;
    };
    2950: {
        name: string;
        hitbox: string;
    };
    2951: {
        name: string;
        hitbox: string;
    };
    3031: {
        name: string;
        hitbox: string;
    };
    3155: {
        name: string;
        hitbox: string;
    };
    3156: {
        name: string;
        hitbox: string;
    };
    3157: {
        name: string;
        hitbox: string;
    };
    3265: {
        name: string;
        hitbox: string;
    };
    3311: {
        name: string;
        hitbox: string;
    };
    3426: {
        name: string;
        hitbox: string;
    };
    3451: {
        name: string;
        hitbox: string;
    };
    3582: {
        name: string;
        hitbox: string;
    };
    3594: {
        name: string;
        hitbox: string;
    };
    3614: {
        name: string;
        hitbox: string;
    };
    3622: {
        name: string;
        hitbox: string;
    };
    3702: {
        name: string;
        hitbox: string;
    };
    3875: {
        name: string;
        hitbox: string;
    };
    3879: {
        name: string;
        hitbox: string;
    };
    3880: {
        name: string;
        hitbox: string;
    };
    4014: {
        name: string;
        hitbox: string;
    };
    4155: {
        name: string;
        hitbox: string;
    };
    4268: {
        name: string;
        hitbox: string;
    };
    4284: {
        name: string;
        hitbox: string;
    };
    4318: {
        name: string;
        hitbox: string;
    };
    4319: {
        name: string;
        hitbox: string;
    };
    4320: {
        name: string;
        hitbox: string;
    };
    4367: {
        name: string;
        hitbox: string;
    };
    4472: {
        name: string;
        hitbox: string;
    };
    4473: {
        name: string;
        hitbox: string;
    };
    4745: {
        name: string;
        hitbox: string;
    };
    4770: {
        name: string;
        hitbox: string;
    };
    4780: {
        name: string;
        hitbox: string;
    };
    4781: {
        name: string;
        hitbox: string;
    };
    4782: {
        name: string;
        hitbox: string;
    };
    4861: {
        name: string;
        hitbox: string;
    };
    4864: {
        name: string;
        hitbox: string;
    };
    4906: {
        name: string;
        hitbox: string;
    };
    5020: {
        name: string;
        hitbox: string;
    };
    5039: {
        name: string;
        hitbox: string;
    };
    5188: {
        name: string;
        hitbox: string;
    };
    5265: {
        name: string;
        hitbox: string;
    };
    5361: {
        name: string;
        hitbox: string;
    };
    5470: {
        name: string;
        hitbox: string;
    };
    5488: {
        name: string;
        hitbox: string;
    };
    5547: {
        name: string;
        hitbox: string;
    };
    5709: {
        name: string;
        hitbox: string;
    };
    5713: {
        name: string;
        hitbox: string;
    };
    5773: {
        name: string;
        hitbox: string;
    };
    5823: {
        name: string;
        hitbox: string;
    };
    5837: {
        name: string;
        hitbox: string;
    };
    5858: {
        name: string;
        hitbox: string;
    };
    5879: {
        name: string;
        hitbox: string;
    };
    5951: {
        name: string;
        hitbox: string;
    };
    5964: {
        name: string;
        hitbox: string;
    };
    5979: {
        name: string;
        hitbox: string;
    };
    6122: {
        name: string;
        hitbox: string;
    };
    6243: {
        name: string;
        hitbox: string;
    };
    6244: {
        name: string;
        hitbox: string;
    };
    6247: {
        name: string;
        hitbox: string;
    };
    6260: {
        name: string;
        hitbox: string;
    };
    6489: {
        name: string;
        hitbox: string;
    };
    6836: {
        name: string;
        hitbox: string;
    };
    6939: {
        name: string;
        hitbox: string;
    };
    7012: {
        name: string;
        hitbox: string;
    };
    7052: {
        name: string;
        hitbox: string;
    };
    7211: {
        name: string;
        hitbox: string;
    };
    7336: {
        name: string;
        hitbox: string;
    };
    7337: {
        name: string;
        hitbox: string;
    };
    7338: {
        name: string;
        hitbox: string;
    };
    7341: {
        name: string;
        hitbox: string;
    };
    7343: {
        name: string;
        hitbox: string;
    };
    7415: {
        name: string;
        hitbox: string;
    };
    7477: {
        name: string;
        hitbox: string;
    };
    7512: {
        name: string;
        hitbox: string;
    };
    7532: {
        name: string;
        hitbox: string;
    };
    7593: {
        name: string;
        hitbox: string;
    };
    7651: {
        name: string;
        hitbox: string;
    };
    7696: {
        name: string;
        hitbox: string;
    };
    7772: {
        name: string;
        hitbox: string;
    };
    7815: {
        name: string;
        hitbox: string;
    };
    7890: {
        name: string;
        hitbox: string;
    };
    7901: {
        name: string;
        hitbox: string;
    };
    7947: {
        name: string;
        hitbox: string;
    };
    7948: {
        name: string;
        hitbox: string;
    };
    7979: {
        name: string;
        hitbox: string;
    };
    8006: {
        name: string;
        hitbox: string;
    };
    8360: {
        name: string;
        hitbox: string;
    };
    8361: {
        name: string;
        hitbox: string;
    };
    8383: {
        name: string;
        hitbox: string;
    };
    8454: {
        name: string;
        hitbox: string;
    };
    8524: {
        name: string;
        hitbox: string;
    };
    8565: {
        name: string;
        hitbox: string;
    };
    8566: {
        name: string;
        hitbox: string;
    };
    8669: {
        name: string;
        hitbox: string;
    };
    8806: {
        name: string;
        hitbox: string;
    };
    8807: {
        name: string;
        hitbox: string;
    };
    9053: {
        name: string;
        hitbox: string;
    };
    9084: {
        name: string;
        hitbox: string;
    };
    9085: {
        name: string;
        hitbox: string;
    };
    9088: {
        name: string;
        hitbox: string;
    };
    9089: {
        name: string;
        hitbox: string;
    };
    9140: {
        name: string;
        hitbox: string;
    };
    9357: {
        name: string;
        hitbox: string;
    };
    9388: {
        name: string;
        hitbox: string;
    };
    9427: {
        name: string;
        hitbox: string;
    };
    9894: {
        name: string;
        hitbox: string;
    };
    10044: {
        name: string;
        hitbox: string;
    };
    10094: {
        name: string;
        hitbox: string;
    };
    10440: {
        name: string;
        hitbox: string;
    };
    10441: {
        name: string;
        hitbox: string;
    };
    10689: {
        name: string;
        hitbox: string;
    };
    10694: {
        name: string;
        hitbox: string;
    };
    10697: {
        name: string;
        hitbox: string;
    };
    10698: {
        name: string;
        hitbox: string;
    };
    10805: {
        name: string;
        hitbox: string;
    };
    10817: {
        name: string;
        hitbox: string;
    };
    10822: {
        name: string;
        hitbox: string;
    };
    10896: {
        name: string;
        hitbox: string;
    };
    10897: {
        name: string;
        hitbox: string;
    };
    10900: {
        name: string;
        hitbox: string;
    };
    10901: {
        name: string;
        hitbox: string;
    };
    11016: {
        name: string;
        hitbox: string;
    };
    11038: {
        name: string;
        hitbox: string;
    };
    11095: {
        name: string;
        hitbox: string;
    };
    11098: {
        name: string;
        hitbox: string;
    };
    11138: {
        name: string;
        hitbox: string;
    };
    11141: {
        name: string;
        hitbox: string;
    };
    11314: {
        name: string;
        hitbox: string;
    };
    11315: {
        name: string;
        hitbox: string;
    };
    11336: {
        name: string;
        hitbox: string;
    };
    11379: {
        name: string;
        hitbox: string;
    };
    11394: {
        name: string;
        hitbox: string;
    };
    11505: {
        name: string;
        hitbox: string;
    };
    11534: {
        name: string;
        hitbox: string;
    };
    11603: {
        name: string;
        hitbox: string;
    };
    11677: {
        name: string;
        hitbox: string;
    };
    11736: {
        name: string;
        hitbox: string;
    };
    11800: {
        name: string;
        hitbox: string;
    };
    11905: {
        name: string;
        hitbox: string;
    };
    11932: {
        name: string;
        hitbox: string;
    };
    11933: {
        name: string;
        hitbox: string;
    };
    11941: {
        name: string;
        hitbox: string;
    };
    11949: {
        name: string;
        hitbox: string;
    };
    11950: {
        name: string;
        hitbox: string;
    };
    12142: {
        name: string;
        hitbox: string;
    };
    12173: {
        name: string;
        hitbox: string;
    };
};
//# sourceMappingURL=hitboxes.d.ts.map