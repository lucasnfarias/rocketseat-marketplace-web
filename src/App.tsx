import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function App() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <Button
        className="flex items-center justify-between border-none rounded-full w-[100px]"
        variant="ghost"
        color="rose-600"
      >
        Teste

        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default App;
