import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartLine, ChartBarStacked, TrendingUp, TrendingDown } from "lucide-react";

export default function AIPredictPage() {
  const trends = [
    {
      id: 1,
      title: "Smartphone Upgrade Cycles",
      timeframe: "2023-2027",
      description: "AI predicts smartphone upgrade cycles will extend from the current average of 2.5 years to 3.7 years by 2027, reducing annual e-waste volume by approximately 8.3 million units globally.",
      confidence: 89,
      dataPoints: "18.7M",
    },
    {
      id: 2,
      title: "Battery Recycling Technology",
      timeframe: "2023-2028",
      description: "New battery recycling technologies are projected to increase lithium-ion recovery rates from 52% to 78% by 2028, significantly reducing the need for new raw material extraction for battery production.",
      confidence: 84,
      dataPoints: "7.2M",
    },
    {
      id: 3,
      title: "E-Waste Regulation",
      timeframe: "2023-2025",
      description: "AI predicts 37 additional countries will implement comprehensive e-waste legislation by 2025, bringing the global coverage to approximately 78% of the world population.",
      confidence: 92,
      dataPoints: "12.3M",
    },
  ];

  return (
    <div className="bg-neutral-900 text-gray-200 min-h-screen flex flex-col">
      <Navbar />
      
      <section className="py-20 bg-neutral-850 flex-grow">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Global <span className="text-primary-400">E-Waste</span> Trends</h2>
            <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
              AI-powered predictions on future e-waste volumes and management approaches.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-neutral-900 border border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-xl">E-Waste Volume</CardTitle>
                    <p className="text-sm text-gray-400 mt-1">Global projection for 2025</p>
                  </div>
                  <span className="px-3 py-1 bg-red-900/30 text-red-400 rounded-full text-xs font-medium">
                    +12.3% YoY
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-neutral-850 rounded-lg mb-4 relative overflow-hidden">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { year: '2021', value: 57.4 },
                        { year: '2022', value: 62.1 },
                        { year: '2023', value: 67.5 },
                        { year: '2024', value: 71.2 },
                        { year: '2025', value: 74.7 }
                      ]}
                      margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                    >
                      <XAxis dataKey="year" tick={{ fill: 'rgba(255, 255, 255, 0.7)' }} />
                      <YAxis tick={{ fill: 'rgba(255, 255, 255, 0.7)' }} />
                      <Tooltip />
                      <Bar dataKey="value" name="Million Tons" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">74.7M</p>
                  <p className="text-sm text-gray-400">metric tons</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900 border border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-xl">Recycling Rate</CardTitle>
                    <p className="text-sm text-gray-400 mt-1">Global projection for 2025</p>
                  </div>
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs font-medium">
                    +3.8% YoY
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-neutral-850 rounded-lg mb-4 flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#2E3748"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#4CAF50"
                        strokeWidth="3"
                        strokeDasharray="25, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white">
                      25%
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">1/4</p>
                  <p className="text-sm text-gray-400">of e-waste properly recycled</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900 border border-gray-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-xl">Raw Materials</CardTitle>
                    <p className="text-sm text-gray-400 mt-1">Potentially recoverable</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-xs font-medium">
                    $57B Value
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-neutral-850 rounded-lg mb-4 p-3">
                  <div className="grid grid-cols-4 grid-rows-2 gap-2 h-full">
                    <div className="bg-yellow-700/30 rounded-md flex items-center justify-center">
                      <span className="text-yellow-400 text-xs">Au</span>
                    </div>
                    <div className="bg-gray-700/30 rounded-md flex items-center justify-center">
                      <span className="text-gray-400 text-xs">Ag</span>
                    </div>
                    <div className="bg-orange-700/30 rounded-md flex items-center justify-center">
                      <span className="text-orange-400 text-xs">Cu</span>
                    </div>
                    <div className="bg-blue-700/30 rounded-md flex items-center justify-center">
                      <span className="text-blue-400 text-xs">Pt</span>
                    </div>
                    <div className="bg-green-700/30 rounded-md flex items-center justify-center">
                      <span className="text-green-400 text-xs">Ni</span>
                    </div>
                    <div className="bg-purple-700/30 rounded-md flex items-center justify-center">
                      <span className="text-purple-400 text-xs">Pd</span>
                    </div>
                    <div className="bg-red-700/30 rounded-md flex items-center justify-center">
                      <span className="text-red-400 text-xs">Co</span>
                    </div>
                    <div className="bg-teal-700/30 rounded-md flex items-center justify-center">
                      <span className="text-teal-400 text-xs">RE</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">69M</p>
                  <p className="text-sm text-gray-400">tons of valuable materials</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-neutral-900 border border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-xl">AI Trend Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {trends.map((trend) => (
                  <div key={trend.id} className="border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium">{trend.title}</h4>
                      <span className="px-3 py-1 bg-primary-900/30 text-primary-400 rounded-full text-xs font-medium">
                        {trend.timeframe}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">
                      {trend.description}
                    </p>
                    <div className="flex items-center text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <ChartLine className="h-4 w-4" />
                        <span>Confidence: {trend.confidence}%</span>
                      </div>
                      <span className="mx-3">•</span>
                      <div className="flex items-center gap-1">
                        <ChartBarStacked className="h-4 w-4" />
                        <span>Based on {trend.dataPoints} data points</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
