import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import RatingStars from "@/components/RatingStars";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, ArrowLeft, Loader2, User, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

interface Comment {
  _id: string;
  userName: string;
  text: string;
  createdAt: string;
}

interface Tool {
  _id: string;
  name: string;
  description: string;
  category: string;
  toolType: string;
  averageRating: number;
  totalRatings: number;
  imageUrl: string;
  websiteUrl: string;
  keyFeatures: string[];
  tags: string[];
  createdBy: string;
  createdByName: string;
  comments: Comment[];
  ratings: Array<{ user: string; rating: number }>;
}

const ToolDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [submittingRating, setSubmittingRating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    fetchTool();
  }, [id]);

  const fetchTool = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/tools/${id}`
      );
      setTool(response.data.tool);

      // Check if user already rated
      if (user) {
        const existingRating = response.data.tool.ratings.find(
          (r: any) => r.user === user.id
        );
        if (existingRating) {
          setUserRating(existingRating.rating);
        }
      }
    } catch (error) {
      console.error("Error fetching tool:", error);
      toast.error("Failed to load tool details");
    } finally {
      setLoading(false);
    }
  };

  const handleRating = async (rating: number) => {
    if (!user) {
      toast.error("Please login to rate this tool");
      return;
    }

    try {
      setSubmittingRating(true);
      await api.post(`/tools/${id}/rating`, { rating });
      setUserRating(rating);
      toast.success("Rating submitted successfully!");
      fetchTool(); // Refresh to get updated average
    } catch (error: any) {
      console.error("Error submitting rating:", error);
      toast.error(error.response?.data?.message || "Failed to submit rating");
    } finally {
      setSubmittingRating(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (!user) {
      toast.error("Please login to comment");
      return;
    }

    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      setSubmittingComment(true);
      await api.post(`/tools/${id}/comment`, { text: comment });
      toast.success("Comment posted successfully!");
      setComment("");
      fetchTool(); // Refresh to get new comment
    } catch (error: any) {
      console.error("Error posting comment:", error);
      toast.error(error.response?.data?.message || "Failed to post comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const handleDeleteTool = async () => {
    if (!window.confirm("Are you sure you want to delete this tool? This action cannot be undone.")) {
      return;
    }

    try {
      setDeleting(true);
      await api.delete(`/tools/${id}`);
      toast.success("Tool deleted successfully!");
      setTimeout(() => navigate("/tools"), 1000);
    } catch (error: any) {
      console.error("Error deleting tool:", error);
      toast.error(error.response?.data?.message || "Failed to delete tool");
    } finally {
      setDeleting(false);
    }
  };

  const isOwner = user && tool && tool.createdBy === user.id;

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 px-4 text-center">
          <h1 className="text-2xl mb-4">Tool not found</h1>
          <Link to="/tools">
            <Button>Back to Tools</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/tools">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Button>
          </Link>

          <div className="glass-card overflow-hidden rounded-2xl animate-fade-in">
            <div className="relative h-64 md:h-96">
              <img
                src={tool.imageUrl}
                alt={tool.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>

            <div className="p-8 -mt-20 relative z-10">
              <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                <div className="flex-1">
                  <div className="flex gap-2 mb-3">
                    <Badge className="gradient-primary text-white">
                      {tool.category}
                    </Badge>
                    <Badge variant="outline">{tool.toolType}</Badge>
                  </div>
                  <h1 className="text-4xl font-bold mb-2">{tool.name}</h1>
                  <p className="text-sm text-muted-foreground mb-2">
                    Added by {tool.createdByName}
                  </p>
                  <div className="flex items-center gap-2">
                    <RatingStars rating={tool.averageRating} readonly size="lg" />
                    <span className="text-lg font-semibold text-muted-foreground">
                      {tool.averageRating.toFixed(1)} / 5.0
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({tool.totalRatings} {tool.totalRatings === 1 ? "rating" : "ratings"})
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className=" glow-primary">
                      Visit Tool
                      <ExternalLink className="w-5 h-5 ml-2" />
                    </Button>
                  </a>
                  {isOwner && (
                    <>
                      <Link to={`/tools/edit/${tool._id}`}>
                        <Button size="lg" variant="outline">
                          <Edit className="w-5 h-5 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        size="lg"
                        variant="destructive"
                        onClick={handleDeleteTool}
                        disabled={deleting}
                      >
                        {deleting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="w-5 h-5 mr-2" />
                            Delete
                          </>
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {tool.description}
              </p>

              {tool.keyFeatures && tool.keyFeatures.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                  <ul className="space-y-2">
                    {tool.keyFeatures.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tool.tags && tool.tags.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Card className="glass-card mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold">Rate This Tool</h2>
                </CardHeader>
                <CardContent>
                  {user ? (
                    <div className="flex items-center gap-4">
                      <RatingStars
                        rating={userRating}
                        onRate={handleRating}
                        size="lg"
                      />
                      {userRating > 0 && (
                        <span className="text-sm text-muted-foreground">
                          You rated: {userRating} stars
                        </span>
                      )}
                      {submittingRating && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      Please{" "}
                      <Link to="/login" className="text-primary hover:underline">
                        login
                      </Link>{" "}
                      to rate this tool
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <h2 className="text-2xl font-bold">
                    Comments ({tool.comments.length})
                  </h2>
                </CardHeader>
                <CardContent className="space-y-6">
                  {user ? (
                    <div>
                      <Textarea
                        placeholder="Share your thoughts about this tool..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mb-3"
                        rows={4}
                        maxLength={500}
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {comment.length}/500 characters
                        </span>
                        <Button
                          onClick={handleCommentSubmit}
                          disabled={submittingComment || !comment.trim()}
                          className="gradient-primary"
                        >
                          {submittingComment ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Posting...
                            </>
                          ) : (
                            "Post Comment"
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      Please{" "}
                      <Link to="/login" className="text-primary hover:underline">
                        login
                      </Link>{" "}
                      to comment
                    </p>
                  )}

                  {tool.comments.length > 0 ? (
                    <div className="space-y-4 pt-4 border-t">
                      {tool.comments.map((comment) => (
                        <div key={comment._id} className="glass-card p-4 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span className="font-semibold">{comment.userName}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          <p className="text-muted-foreground">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;