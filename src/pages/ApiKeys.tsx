import { useState, useEffect } from 'react';
import { daytonaClient, type ApiKey } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function ApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newKey, setNewKey] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadKeys();
  }, []);

  async function loadKeys() {
    setLoading(true);
    setError(null);
    try {
      const apiKeys = await daytonaClient.listApiKeys();
      console.log('Loaded API keys:', apiKeys);
      setKeys(apiKeys.filter(key => !['default', 'app'].includes(key.name)));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load API keys';
      console.error('Error loading keys:', error);
      setError(message);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateKey(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNewKey(null);

    try {
      console.log('Creating new key with name:', newKeyName);
      const key = await daytonaClient.generateApiKey(newKeyName);
      console.log('New key created:', key);
      setNewKey(key);
      toast({
        title: 'Success',
        description: 'API key created successfully',
      });
      setNewKeyName('');
      await loadKeys();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create API key';
      console.error('Error creating key:', error);
      setError(message);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {newKey && (
            <Alert className="mb-4">
              <AlertDescription>
                <div className="font-mono break-all">
                  New API Key: {newKey}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Save this key now! You won't be able to see it again.
                </div>
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleCreateKey} className="flex gap-4 mb-6">
            <Input
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="API Key Name"
              pattern="[a-zA-Z0-9-_]+"
              required
              disabled={loading}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create New Key'}
            </Button>
          </form>

          <div className="space-y-4">
            {keys.length === 0 && !loading && (
              <div className="text-center text-muted-foreground py-4">
                No API keys found. Create one above.
              </div>
            )}

            {keys.map((key) => (
              <div
                key={key.keyHash}
                className="flex justify-between items-center p-4 border rounded bg-muted/50"
              >
                <div>
                  <div className="font-mono">{key.name}</div>
                  <div className="text-sm text-muted-foreground">Type: {key.type}</div>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete the key "${key.name}"?`)) {
                      daytonaClient.revokeApiKey(key.name)
                        .then(loadKeys)
                        .catch(error => {
                          toast({
                            title: 'Error',
                            description: 'Failed to delete API key',
                            variant: 'destructive',
                          });
                        });
                    }
                  }}
                  disabled={loading}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}