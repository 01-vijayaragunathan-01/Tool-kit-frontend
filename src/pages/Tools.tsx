import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ToolCard from "@/components/ToolCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "sonner";

interface Tool {
  _id: string;
  name: string;
  description: string;
  category: string;
  toolType: string;
  averageRating: number;
  imageUrl: string;
  websiteUrl: string;
  createdByName: string;
}

const Tools = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "ai" | "normal">("all");
  const { user } = useAuth();

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  });

  useEffect(() => {
    fetchTools();
  }, [activeTab]);

  const fetchTools = async () => {
    try {
      setLoading(true);
      let url = "/tools";
      
      if (activeTab === "ai") {
        url += "?toolType=AI Tool";
      } else if (activeTab === "normal") {
        url += "?toolType=Normal Tool";
      }

      const response = await api.get(url);
      setTools(response.data.tools);
    } catch (error) {
      console.error("Error fetching tools:", error);
      toast.error("Failed to load tools");
    } finally {
      setLoading(false);
    }
  };

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI Tools Directory
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover and explore the best AI and productivity tools
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
              <div className="flex-1 max-w-2xl w-full">
                <div className="flex gap-2 glass-card p-2 rounded-2xl glow-primary">
                  <Search className="w-5 h-5 text-muted-foreground ml-3 my-auto" />
                  <Input
                    placeholder="Search tools by name, category, or description..."
                    className="border-0 bg-transparent text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              {user && (
                <Link to="/tools/create">
                  <Button className=" glow-primary whitespace-nowrap">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Tool
                  </Button>
                </Link>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 justify-center">
              <Button
                variant={activeTab === "all" ? "default" : "outline"}
                onClick={() => setActiveTab("all")}
                className={activeTab === "all" ? "gradient-primary" : ""}
              >
                All Tools
              </Button>
              <Button
                variant={activeTab === "ai" ? "default" : "outline"}
                onClick={() => setActiveTab("ai")}
                className={activeTab === "ai" ? "gradient-primary" : ""}
              >
                AI Tools
              </Button>
              <Button
                variant={activeTab === "normal" ? "default" : "outline"}
                onClick={() => setActiveTab("normal")}
                className={activeTab === "normal" ? "gradient-primary" : ""}
              >
                Normal Tools
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
                {filteredTools.map((tool) => (
                  <ToolCard
                    key={tool._id}
                    id={tool._id}
                    name={tool.name}
                    description={tool.description}
                    category={tool.category}
                    rating={tool.averageRating}
                    imageUrl={tool.imageUrl}
                  />
                ))}
              </div>

              {filteredTools.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-xl text-muted-foreground">
                    No tools found matching your search.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tools;