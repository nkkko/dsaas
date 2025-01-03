import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function GetStarted() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Get Started</h1>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">1. Add an API Key</h2>
            <Button>Create Default API Key</Button>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">2. Create a Dev Environment</h2>
            <div className="bg-muted rounded-lg p-4">
              <pre className="text-sm overflow-x-auto">
                <code>{`from daytona_sdk import Daytona, CreateWorkspaceParams

daytona = Daytona()
params = CreateWorkspaceParams(language="python")
workspace = daytona.create()
`}</code>
              </pre>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}