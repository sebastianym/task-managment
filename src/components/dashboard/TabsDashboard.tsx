import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function TabsDashboard() {
  return (
    <div className="md:col-span-2">
      <Tabs
        defaultValue="all"
        className="w-full"
      >
        <TabsList className="w-full justify-start mb-4 bg-muted/50 p-1">
          <TabsTrigger value="all" className="flex-1">
            Todas
          </TabsTrigger>
          <TabsTrigger value="high" className="flex-1">
            Alta
          </TabsTrigger>
          <TabsTrigger value="medium" className="flex-1">
            Media
          </TabsTrigger>
          <TabsTrigger value="low" className="flex-1">
            Baja
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-0">
          
        </TabsContent>
        <TabsContent value="high" className="mt-0">
          
        </TabsContent>
        <TabsContent value="medium" className="mt-0">
          
        </TabsContent>
        <TabsContent value="low" className="mt-0">
          
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TabsDashboard;
