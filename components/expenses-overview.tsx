"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', amount: 4000 },
  { name: 'Fév', amount: 3000 },
  { name: 'Mar', amount: 2000 },
  { name: 'Avr', amount: 2780 },
  { name: 'Mai', amount: 1890 },
  { name: 'Juin', amount: 2390 },
]

export function ExpensesOverview() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

