import { useState } from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@/__generated__/gql";
import { Table } from "@/components/Table";
import { Planet } from "@/components/Planet";
import { Climate } from "@/components/Climate";
import { Terrain } from "@/components/Terrain";
import { type TerrainType, ClimateType } from "@/types";

function App() {
    const [planetId, setPlanetId] = useState<string>("");
    const { loading, error, data } = useQuery(
        gql(/* GraphQL */ `
      query GetPeople {
        allPlanets {
          planets {
            climates
            created
            diameter
            edited
            filmConnection {
              films {
                title
                vehicleConnection {
                  vehicles {
                    name
                  }
                }
              }
            }
            gravity
            id
            name
            orbitalPeriod
            population
            residentConnection {
              residents {
                name
              }
            }
            rotationPeriod
            surfaceWater
            terrains
          }
          totalCount
        }
      }
    `),
    );

    if (error) {
        console.error(error);
    }
    if (loading) {
        return <></>;
    }

    return (
        <>
            <h1 className="mb-4 text-4xl font-extrabold">Explore StarWars planets</h1>
            <h3>Click on Planet table to get more data</h3>
            <Table
                data={data?.allPlanets?.planets}
                columns={[
                    {
                        accessorKey: "name",
                        label: "Name",
                        render: ({ value }) => (
                            <span className="font-semibold">{value}</span>
                        ),
                    },
                    {
                        accessorKey: "diameter",
                        label: "Diameter",
                    },
                    {
                        accessorKey: "gravity",
                        label: "Gravity",
                    },
                    {
                        accessorKey: "orbitalPeriod",
                        label: "Orbital period",
                    },
                    {
                        accessorKey: "population",
                        label: "Population",
                    },
                    {
                        accessorKey: "rotationPeriod",
                        label: "Rotation period",
                    },
                    {
                        accessorKey: "surfaceWater",
                        label: "Surfacewater",
                    },
                    {
                        accessorKey: "climates",
                        label: "Climates",
                        render: (props) => (
                            <div className="flex gap-2">
                                {props.value.map((climate: ClimateType) => (
                                    <Climate key={climate} name={climate} />
                                ))}
                            </div>
                        ),
                    },
                    {
                        accessorKey: "terrains",
                        label: "Terrains",
                        render: (props) => (
                            <div className="flex gap-2">
                                {props.value.map((terrain: TerrainType) => (
                                    <Terrain key={terrain} name={terrain} />
                                ))}
                            </div>
                        ),
                    },
                ]}
                onRowClick={({ row }) => setPlanetId(row?.id)}
            />
            {planetId && <Planet planetId={planetId} />}
        </>
    );
}

export default App;
