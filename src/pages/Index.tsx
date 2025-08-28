import React from "react";
import NotificationCollapsed from "@/components/NotificationCollapsed";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
 

const TITLE_LIMIT = 38; // visual limit only, component truncates
const BODY_LIMIT = 84;  // visual limit only, component truncates

const Index = () => {
  const [title, setTitle] = React.useState("☀️ Rewards are up! Redeem Mcoins NOW!");
  const [body, setBody] = React.useState(
    "You can now redeem your earned Mcoins.\nWe truly appreciate your patience!"
  );
  const [imageUrl, setImageUrl] = React.useState("/lovable-uploads/Right_side_image_url.png");
  const [appIconUrl, setAppIconUrl] = React.useState("/lovable-uploads/Top_right_moneyview_icon_url.png");
  const [selectedRightImage, setSelectedRightImage] = React.useState<string>("/lovable-uploads/Right_side_image_url.png");
  const [rightSideImageOptions, setRightSideImageOptions] = React.useState<string[]>(["/lovable-uploads/Right_side_image_url.png"]);

  React.useEffect(() => {
    fetch("/api/lovable-uploads")
      .then((r) => r.json())
      .then((list: string[]) => {
        if (Array.isArray(list) && list.length > 0) {
          setRightSideImageOptions(list);
        }
      })
      .catch(() => {
        // ignore errors and keep defaults
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Push Notification Editor</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            Edit the content on the left. Live preview appears on the right (40% width).
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Editor (60%) */}
          <div className="md:w-3/5 w-full bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-end justify-between">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title (max {TITLE_LIMIT} chars, visual)
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {title.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, "").length}/{TITLE_LIMIT}
                  </span>
                </div>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter notification title"
                />
              </div>

              

              <div className="space-y-2">
                <div className="flex items-end justify-between">
                  <Label htmlFor="body" className="text-sm font-medium">
                    Body (max {BODY_LIMIT} chars, visual)
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {body.length}/{BODY_LIMIT}
                  </span>
                </div>
                <Textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Enter notification body"
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-end justify-between">
                  <Label htmlFor="imageUrl" className="text-sm font-medium">
                    Right side image URL
                  </Label>
                </div>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/lovable-uploads/Right_side_image_url.png"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-end justify-between">
                  <Label htmlFor="appIconUrl" className="text-sm font-medium">
                    Top-right Moneyview icon URL
                  </Label>
                </div>
                <Input
                  id="appIconUrl"
                  value={appIconUrl}
                  onChange={(e) => setAppIconUrl(e.target.value)}
                  placeholder="/lovable-uploads/Top_right_moneyview_icon_url.png"
                />
              </div>
            </div>
          </div>

          {/* Right: Preview (40%) */}
          <div className="md:w-2/5 w-full">
            <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 shadow-sm">
              <h2 className="text-sm font-medium text-muted-foreground mb-3">Preview</h2>
              <div className="flex justify-center">
                <NotificationCollapsed
                  appName="Moneyview"
                  category="Vehicle Insurance"
                  timeAgo="2 minutes ago"
                  title={title}
                  body={body}
                  appIconUrl={appIconUrl}
                  imageUrl={imageUrl}
                  titleLimit={TITLE_LIMIT}
                />
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                The preview truncates body to {BODY_LIMIT} characters to match a collapsed push.
              </div>

              {/* Right-side image selector */}
              <div className="mt-4 space-y-2">
                <Label className="text-sm font-medium">Right side image (from lovable-uploads)</Label>
                <Select value={selectedRightImage} onValueChange={setSelectedRightImage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an image" />
                  </SelectTrigger>
                  <SelectContent>
                    {rightSideImageOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex justify-end">
                  <Button size="sm" onClick={() => setImageUrl(selectedRightImage)}>Change Icon</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
