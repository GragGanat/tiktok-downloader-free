import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle, Download, Music, User, MessageCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface VideoData {
  videoUrl: string;
  title: string;
  cover: string;
  author: string;
  desc: string;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const downloadMutation = trpc.tiktok.download.useMutation({
    onSuccess: (data) => {
      setVideoData(data);
      setIsLoading(false);
      toast.success("Video loaded successfully!");
    },
    onError: (error) => {
      setIsLoading(false);
      const errorMessage = error.message || "Failed to fetch video. Please check the URL and try again.";
      toast.error(errorMessage);
    },
  });

  const handleFetchVideo = async () => {
    if (!url.trim()) {
      toast.error("Please enter a valid TikTok URL");
      return;
    }

    setIsLoading(true);
    setVideoData(null);
    downloadMutation.mutate({ url: url.trim() });
  };

  const handleDownload = async () => {
    if (!videoData?.videoUrl) return;

    try {
      const response = await fetch(videoData.videoUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `tiktok_${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      toast.success("Download started!");
    } catch (error) {
      toast.error("Download failed. Please try again.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleFetchVideo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-50">
        <div className="container py-4 sm:py-6">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">TikTok Downloader</h1>
              <p className="text-xs sm:text-sm text-slate-400">Download videos without watermark</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-6 sm:py-12 flex flex-col">
        {/* Input Section */}
        <div className="w-full max-w-2xl mx-auto mb-8 sm:mb-12">
          <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm p-6 sm:p-8 shadow-2xl">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-3">
                  Paste TikTok Video Link
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="https://www.tiktok.com/@username/video/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-purple-500 focus:ring-purple-500/20 pr-12"
                  />
                  {url && (
                    <button
                      onClick={() => setUrl("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <Button
                onClick={handleFetchVideo}
                disabled={isLoading || !url.trim()}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Spinner className="w-5 h-5" />
                    <span>Fetching Video...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Get Video</span>
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Video Preview Section */}
        {videoData && (
          <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
            <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm overflow-hidden shadow-2xl">
              {/* Video Player */}
              <div className="relative bg-black aspect-video flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={videoData.videoUrl}
                  controls
                  className="w-full h-full object-contain"
                  crossOrigin="anonymous"
                />
              </div>

              {/* Video Info */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Title */}
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white line-clamp-2 mb-2">
                    {videoData.title}
                  </h2>
                  {videoData.desc && (
                    <p className="text-sm text-slate-400 line-clamp-2">{videoData.desc}</p>
                  )}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 border border-slate-700/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-300 truncate">@{videoData.author}</p>
                    <p className="text-xs text-slate-500">TikTok Creator</p>
                  </div>
                </div>

                {/* Download Button */}
                <Button
                  onClick={handleDownload}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download MP4</span>
                </Button>

                {/* Info Footer */}
                <div className="text-xs text-slate-500 text-center">
                  ✓ No watermark • MP4 format • Original quality
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {!videoData && !isLoading && (
          <div className="w-full max-w-2xl mx-auto flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center mx-auto">
                <MessageCircle className="w-8 h-8 text-slate-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-300">Ready to download?</h3>
                <p className="text-sm text-slate-500 mt-2">
                  Paste a TikTok video link above to get started
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {downloadMutation.isError && !videoData && (
          <div className="w-full max-w-2xl mx-auto">
            <Card className="border-red-500/30 bg-red-500/10 backdrop-blur-sm p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-400">Error</h3>
                <p className="text-sm text-red-300/80 mt-1">
                  {downloadMutation.error?.message || "Failed to fetch video. Please try again."}
                </p>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container py-6 text-center text-sm text-slate-500">
          <p>Built with ❤️ • Download TikTok videos easily and securely</p>
        </div>
      </footer>
    </div>
  );
}
