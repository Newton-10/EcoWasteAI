import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, Filter, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Link } from "wouter";
import ResultsCard from "@/components/results-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function HistoryPage() {
  const { user } = useAuth();
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  
  const { data: analyses, isLoading, error } = useQuery({
    queryKey: ["/api/analysis"],
    enabled: !!user,
  });

  const handleViewAnalysis = (analysis) => {
    setSelectedAnalysis(analysis);
  };

  if (isLoading) {
    return (
      <div className="bg-neutral-900 text-gray-200 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-10 w-10 text-primary-500 animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-neutral-900 text-gray-200 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <Card className="bg-neutral-850 border-gray-800 max-w-md">
            <CardHeader>
              <CardTitle className="text-white">Error Loading History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-400">{error.message}</p>
              <Button className="mt-4 bg-primary-700 hover:bg-primary-600" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 text-gray-200 min-h-screen flex flex-col">
      <Navbar />
      
      <section className="py-20 bg-neutral-900 flex-grow">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Your <span className="text-primary-400">History</span></h2>
            <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
              Track your contributions to e-waste management and device analysis history.
            </p>
          </div>

          {analyses && analyses.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">Recent Analyses</h3>
                  <p className="text-sm text-gray-400 mt-1">Your device analyses</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </Button>
                </div>
              </div>

              <Card className="bg-neutral-850 border-gray-800">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-neutral-900">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Device</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Condition</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Est. Lifespan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {analyses.map((analysis) => (
                        <tr key={analysis.id} className="hover:bg-neutral-800/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {format(new Date(analysis.createdAt), 'MMM d, yyyy')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{analysis.deviceType}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{analysis.deviceCategory}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              analysis.condition === 'Good' ? 'bg-primary-900/30 text-primary-400' : 
                              analysis.condition === 'Fair' ? 'bg-yellow-900/30 text-yellow-400' : 
                              'bg-red-900/30 text-red-400'
                            }`}>
                              {analysis.condition}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{analysis.remainingLifespan}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-primary-400 hover:text-primary-300 mr-2"
                                  onClick={() => handleViewAnalysis(analysis)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-neutral-850 border-gray-800 max-w-3xl">
                                <DialogHeader>
                                  <DialogTitle className="text-white">Analysis Details</DialogTitle>
                                </DialogHeader>
                                {selectedAnalysis && (
                                  <ResultsCard analysis={selectedAnalysis} />
                                )}
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <Download className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 bg-neutral-900 border-t border-gray-800 flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Showing <span className="font-medium text-white">1-{analyses.length}</span> of <span className="font-medium text-white">{analyses.length}</span> results
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <Card className="bg-neutral-850 border-gray-800 p-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                  <Filter className="h-8 w-8 text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No Analyses Found</h3>
                <p className="text-gray-300 mb-6 max-w-md mx-auto">
                  You haven't analyzed any devices yet. Try uploading a device image to get started.
                </p>
                <Link href="/sort">
                  <Button className="bg-primary-700 hover:bg-primary-600">
                    Go to AI Sorting
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
