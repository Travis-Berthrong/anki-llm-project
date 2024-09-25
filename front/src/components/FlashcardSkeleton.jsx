import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FlashcardSkeleton() {
  return (
    <div className="w-full px-4 py-6 flex flex-col items-center">
      <Tabs className="w-full max-w-md">
        <TabsList className="flex justify-center mb-4 bg-slate-100">
          <TabsTrigger className="flex-1 text-center">
            <Skeleton className="h-6 w-20" />
          </TabsTrigger>
          <TabsTrigger className="flex-1 text-center">
            <Skeleton className="h-6 w-20" />
          </TabsTrigger>
        </TabsList>
        <TabsContent >
          <Card className="mx-auto shadow-md bg-slate-100 rounded-lg p-4 w-full">
            <CardHeader>
              <CardTitle className="text-center">
                <Skeleton className="h-6 w-32 mx-auto" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-10 w-10 rounded-lg" />
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}