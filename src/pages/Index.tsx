import NotificationCollapsed from "@/components/NotificationCollapsed";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">NotificationCollapsed Component</h1>
          <p className="text-xl text-muted-foreground">Demo of the collapsed push notification</p>
        </div>
        
        <div className="flex flex-col items-center space-y-6">
          <NotificationCollapsed
            appName="Moneyview"
            category="Vehicle Insurance"
            timeAgo="2 minutes ago"
            title="🚨 Your car insurance is expiring TODAY!"
            body="Your MARUTI SUZUKI INDIA LTD has been with you through thick & thin. Don't leave..."
            appIconUrl="/lovable-uploads/bf417eb7-9e63-40ea-9322-fced316a179c.png"
            imageUrl="/lovable-uploads/58197f8f-edf2-465a-89f1-69ebb04e4d5f.png"
          />
          
          <NotificationCollapsed
            appName="Banking App"
            category="Payment Alert"
            timeAgo="5 minutes ago"
            title="Payment of ₹2,500 received from John Doe"
            body="Your account has been credited with ₹2,500. Transaction ID: TXN123456789. Check your balance now!"
          />
          
          <NotificationCollapsed
            appName="Weather App"
            category="Weather Alert"
            timeAgo="1 hour ago"
            title="Heavy rain expected in your area TODAY!"
            body="Thunderstorms and heavy rainfall expected between 3 PM - 7 PM. Stay indoors and drive safely."
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
