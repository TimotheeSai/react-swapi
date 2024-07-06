import { Badge } from "@/components/ui/badge";
import { type TerrainType } from "@/types"

export const Terrain = ({ name, ...props }: { name: TerrainType }) => (
    <Badge {...props}>{name}</Badge>
)
