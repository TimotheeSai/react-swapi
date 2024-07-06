import { gql } from "@/__generated__/gql";
import { useQuery } from "@apollo/client";

import { LoaderCircle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Climate } from "./Climate";
import { Terrain } from "./Terrain";
import { BarChart } from "./BarChart";

export const Planet = ({ planetId }: { planetId: string }) => {
    const {
        loading,
        error,
        data: { planet } = { planet: null },
    } = useQuery(
        gql(/* GraphQL */ `
      query GetPlanet($planetId: ID) {
        planet(id: $planetId) {
          climates
          created
          diameter
          edited
          gravity
          id
          name
          orbitalPeriod
          population
          rotationPeriod
          surfaceWater
          terrains
          residentConnection {
            totalCount
            residents {
              height
              mass
              name
            }
          }
        }
      }
    `),
        {
            variables: { planetId },
        },
    );

    if (error) console.error(error);
    if (loading) {
        return <>
            <Card className='flex justify-center p-8'>
                <LoaderCircle className='animate-spin'/>
            </Card>
        </>
    }
    return (
        <>
            <Card>
                <CardHeader className="flex flex-row ">
                    <CardTitle className="">{planet?.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-8">
                    <div className="flex gap-4">
                        <Card className="grow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Diameter</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{planet?.diameter}</div>
                                <p className="text-xs text-muted-foreground">years</p>
                            </CardContent>
                        </Card>
                        <Card className="grow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Orbital period
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {planet?.orbitalPeriod}
                                </div>
                                <p className="text-xs text-muted-foreground">years</p>
                            </CardContent>
                        </Card>
                        <Card className="grow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Rotation period
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {planet?.rotationPeriod}
                                </div>
                                <p className="text-xs text-muted-foreground">years</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-3">
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Climates</span>
                                <div className="flex gap-4">
                                    {(planet?.climates ?? []).map((c) => (
                                        <Climate key={c} name={c} />
                                    ))}
                                </div>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Terrains</span>
                                <div className="flex gap-2">
                                    {(planet?.terrains ?? []).map((c) => (
                                        <Terrain key={c} name={c} />
                                    ))}
                                </div>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Gravity</span>
                                <span>{planet?.gravity}</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Population</span>
                                <span>{planet?.population}</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Surface Water</span>
                                <span>{planet?.surfaceWater}</span>
                            </li>
                        </ul>
                    </div>

                    {!!planet?.residentConnection?.totalCount && (
                        <div className='flex gap-4 h-96'>
                            <BarChart
                                name="Height"
                                description="Graph representing height of planet inhabitants"
                                chartData={(planet?.residentConnection?.residents ?? []).map(
                                    ({ height, name }) => ({ barLabel: name, value: height ?? 0 }),
                                )}
                            />
                            <BarChart
                                name="Mass"
                                description="Graph representing mass of planet inhabitants"
                                chartData={(planet?.residentConnection?.residents ?? []).map(
                                    ({ mass, name }) => ({ barLabel: name, value: mass ?? 0 }),
                                )}
                            />
                        </div>
                    )}
                </CardContent>
            </Card>
        </>
    );
};
