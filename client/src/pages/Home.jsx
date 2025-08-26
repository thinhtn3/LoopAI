import Layout from '../components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-6">
            If this is big and red → Tailwind works 🎉
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Welcome to your new React + Tailwind + shadcn/ui project!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Components</h3>
              <p className="text-muted-foreground">
                Organized component structure with shadcn/ui integration
              </p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Hooks</h3>
              <p className="text-muted-foreground">
                Custom hooks for theme management and other functionality
              </p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Services</h3>
              <p className="text-muted-foreground">
                API service layer for backend communication
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
