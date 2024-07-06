import {
    Sun,
    Waves,
    TreePalm,
    Snowflake,
    CloudFog,
    Wind,
    ThermometerSun,
    Factory,
    ThermometerSnowflake,
    CloudRain,
    Droplets,
    Flame,
    Cloud,
    Ban,
    Mountain,
} from "lucide-react";

import { type ClimateType } from "@/types";
// "arid"
// "temperate"
// "tropical"
// "frozen"
// "murky"
// "windy"
// "hot"
// "artificial temperate"
// "frigid"
// "humid"
// "moist"
// "polluted"
// "unknown"
// "superheated"
// "subartic"
// "artic"
// "rocky"

// const ICONS = {
//     arid: (props) => <Sun {...props} />,
//     temperate: (props) => <Waves {...props} />,
//     tropical: (props) => <Sun {...props} />,
//     frozen: (props) => <Sun {...props} />,
//     murky: (props) => <Sun {...props} />,
//     windy: (props) => <Sun {...props} />,
//     hot: (props) => <Sun {...props} />,
//     "artificial temperate": (props) => <Sun {...props} />,
//     frigid: (props) => <Sun {...props} />,
//     humid: (props) => <Sun {...props} />,
//     moist: (props) => <Sun {...props} />,
//     polluted: (props) => <Sun {...props} />,
//     unknown: (props) => <Sun {...props} />,
//     superheated: (props) => <Sun {...props} />,
//     subartic: (props) => <Sun {...props} />,
//     artic: (props) => <Sun {...props} />,
//     rocky: (props) => <Sun {...props} />,
// };

interface IconProps {
    color?: string;
    size?: number;
    strokeWidth?: number;
}

interface ClimateProps extends IconProps {
    name:
    | "arid"
    | "temperate"
    | "tropical"
    | "frozen"
    | "murky"
    | "windy"
    | "hot"
    | "artificial temperate"
    | "frigid"
    | "humid"
    | "moist"
    | "polluted"
    | "unknown"
    | "superheated"
    | "subartic"
    | "artic"
    | "rocky";
}

export const Climate = ({ name, ...props }: ClimateProps) =>
    ({
        arid: (props: IconProps) => <Sun {...props} />,
        temperate: (props: IconProps) => <Waves {...props} />,
        tropical: (props: IconProps) => <TreePalm {...props} />,
        frozen: (props: IconProps) => <Snowflake {...props} />,
        murky: (props: IconProps) => <CloudFog {...props} />,
        windy: (props: IconProps) => <Wind {...props} />,
        hot: (props: IconProps) => <ThermometerSun {...props} />,
        "artificial temperate": (props: IconProps) => <Factory {...props} />,
        frigid: (props: IconProps) => <ThermometerSnowflake {...props} />,
        humid: (props: IconProps) => <CloudRain {...props} />,
        moist: (props: IconProps) => <Droplets {...props} />,
        polluted: (props: IconProps) => <Cloud {...props} />,
        unknown: (props: IconProps) => <Ban {...props} />,
        superheated: (props: IconProps) => <Flame {...props} />,
        subartic: (props: IconProps) => <Snowflake {...props} />,
        artic: (props: IconProps) => <Snowflake {...props} />,
        rocky: (props: IconProps) => <Mountain {...props} />,
    })[name](props);
