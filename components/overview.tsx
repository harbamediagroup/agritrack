"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    total: 1500,
  },
  {
    name: "Fév",
    total: 2300,
  },
  {
    name: "Mar",
    total: 3200,
  },
  {
    name: "Avr",
    total: 4500,
  },
  {
    name: "Mai",
    total: 3800,
  },
  {
    name: "Juin",
    total: 4300,
  },
  {
    name: "Juil",
    total: 5000,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} MAD`}
        />
        <Tooltip 
          formatter={(value) => [`${value} MAD`, "Total"]}
          labelFormatter={(label) => `Mois: ${label}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

