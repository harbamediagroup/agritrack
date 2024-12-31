"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', entrant: 4000, sortant: 2400 },
  { name: 'Fév', entrant: 3000, sortant: 1398 },
  { name: 'Mar', entrant: 2000, sortant: 9800 },
  { name: 'Avr', entrant: 2780, sortant: 3908 },
  { name: 'Mai', entrant: 1890, sortant: 4800 },
  { name: 'Juin', entrant: 2390, sortant: 3800 },
]

export function BankTransfersOverview() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="entrant" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="sortant" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}

