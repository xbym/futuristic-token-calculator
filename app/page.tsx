"use client"

import { useState } from "react"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FuturisticTokenCalculator() {
  const [formData, setFormData] = useState({
    en: "",
    attrReputation: "",
    attrEfficiency: "",
    attrTactics: "",
    level: "",
    fireDifficulty: ""
  })
  const [result, setResult] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const calculateTokens = (e: React.FormEvent) => {
    e.preventDefault()
    const { en, attrReputation, attrEfficiency, attrTactics, level, fireDifficulty } = formData
    const creditCoefficient = 1
    const rankCoefficient = 0.75
    const Rating = 0.75
    const RSW = 0.75
    const X1 = 0.006666667
    const Z = 1

    const efficiencyBonus = parseFloat(attrEfficiency) / ((parseFloat(level) + 3) ** 1.45 + 70) * (Math.tanh((Rating - 1) * 1.7) * 0.8 + 0.8)
    const tacticsBonus = parseFloat(attrTactics) / ((parseFloat(level) + 3) ** 1.45 + 70) * (Math.tanh((RSW - 1) * 1.7) * 0.8 + 0.8)
    const baseOutput = parseFloat(en) * (20 + parseFloat(attrReputation)) ** 0.65 * 0.35 * X1 * Z
    const firePower = baseOutput * (1 + efficiencyBonus + tacticsBonus) * creditCoefficient * rankCoefficient
    const tokens = firePower / parseFloat(fireDifficulty)

    setResult(isNaN(tokens) ? null : tokens)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 text-white border border-orange-500 shadow-lg shadow-orange-500/20">
        <CardHeader className="border-b border-orange-500/30">
          <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            代币产出计算器
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-6">
          <form onSubmit={calculateTokens} className="space-y-6">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key} className="text-sm font-medium text-orange-300">
                  {key === "en" ? "En值" :
                   key === "attrReputation" ? "Attr_reputation值" :
                   key === "attrEfficiency" ? "Attr_efficiency值" :
                   key === "attrTactics" ? "Attr_tactics值" :
                   key === "level" ? "level值" :
                   "代币产出难度"}
                </Label>
                <Input
                  type="number"
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                  className="block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:ring focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-300"
                  required
                />
              </div>
            ))}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              计算代币产出
            </Button>
          </form>
          {result !== null && (
            <div className="mt-8 p-6 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border border-orange-500 shadow-inner">
              <h3 className="text-lg font-semibold text-orange-300 mb-2">计算结果：</h3>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                {result.toFixed(2)} 代币
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}